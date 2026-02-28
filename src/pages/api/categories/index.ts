import type { APIRoute } from "astro";
import { getCategoriesCollection, slugify, type Category } from "../../../lib/db";
import { CreateCategorySchema, formatZodError } from "../../../lib/schemas";

export const prerender = false;

function isAuthorized(request: Request, secret: string): boolean {
  return request.headers.get("x-api-key") === secret;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// GET /api/categories  — list all categories
// ---------------------------------------------------------------------------
export const GET: APIRoute = async ({ locals }) => {
  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  try {
    const categories = getCategoriesCollection(uri);
    const docs = await categories.find({}).sort({ name: 1 }).toArray();
    return json(docs);
  } catch (err) {
    console.error("[GET /api/categories]", err);
    return json({ error: "Failed to fetch categories." }, 500);
  }
};

// ---------------------------------------------------------------------------
// POST /api/categories  — create a new category (auth required)
// ---------------------------------------------------------------------------
export const POST: APIRoute = async ({ request, locals }) => {
  const secret = (locals.runtime?.env?.API_SECRET ?? import.meta.env.API_SECRET) as string;
  if (!isAuthorized(request, secret)) return json({ error: "Unauthorized." }, 401);

  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const parsed = CreateCategorySchema.safeParse(rawBody);
  if (!parsed.success) {
    return json({ errors: formatZodError(parsed.error) }, 422);
  }

  const data = parsed.data;
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.name);

  try {
    const categories = getCategoriesCollection(uri);
    const existing = await categories.findOne({ slug });
    if (existing) return json({ error: `Slug "${slug}" already exists.` }, 409);

    const doc: Category = {
      slug,
      name:        data.name,
      description: data.description,
      createdAt:   new Date(),
    };

    const result = await categories.insertOne(doc);
    return json({ success: true, id: result.insertedId, slug }, 201);
  } catch (err) {
    console.error("[POST /api/categories]", err);
    return json({ error: "Failed to create category." }, 500);
  }
};
