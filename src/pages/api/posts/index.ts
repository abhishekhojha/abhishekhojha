import type { APIRoute } from "astro";
import {
  getPostsCollection,
  slugify,
  estimateReadingTime,
  type BlogPost,
} from "../../../lib/db";
import {
  CreatePostSchema,
  GetPostsQuerySchema,
  formatZodError,
} from "../../../lib/schemas";

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
// GET /api/posts  — list all non-draft posts
// Query params: ?category=slug  ?tag=name  ?limit=20  ?draft=true (auth)
// ---------------------------------------------------------------------------
export const GET: APIRoute = async ({ request, locals }) => {
  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  const url = new URL(request.url);
  const queryResult = GetPostsQuerySchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!queryResult.success) {
    return json({ errors: formatZodError(queryResult.error) }, 422);
  }

  const { category, tag, limit, draft: showDrafts } = queryResult.data;
  const secret = (locals.runtime?.env?.API_SECRET ?? import.meta.env.API_SECRET) as string;

  try {
    const posts = getPostsCollection(uri);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (!showDrafts || !isAuthorized(request, secret)) filter.draft = false;
    if (category) filter.$or = [{ category }, { extraCategories: category }];
    if (tag) filter.tags = tag;

    const docs = await posts
      .find(filter, { projection: { content: 0 } })
      .sort({ pubDate: -1 })
      .limit(limit)
      .toArray();

    return json(docs);
  } catch (err) {
    console.error("[GET /api/posts]", err);
    return json({ error: "Failed to fetch posts." }, 500);
  }
};

// ---------------------------------------------------------------------------
// POST /api/posts  — create a new post (auth required)
// ---------------------------------------------------------------------------
export const POST: APIRoute = async ({ request, locals }) => {
  const secret = (locals.runtime?.env?.API_SECRET ?? import.meta.env.API_SECRET) as string;
  if (!isAuthorized(request, secret)) {
    return json({ error: "Unauthorized." }, 401);
  }

  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const parsed = CreatePostSchema.safeParse(rawBody);
  if (!parsed.success) {
    return json({ errors: formatZodError(parsed.error) }, 422);
  }

  const data = parsed.data;
  const now = new Date();
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);

  try {
    const posts = getPostsCollection(uri);

    // Check slug uniqueness
    const existing = await posts.findOne({ slug });
    if (existing) {
      return json({ error: `Slug "${slug}" already exists.` }, 409);
    }

    const doc: BlogPost = {
      slug,
      title:           data.title,
      description:     data.description,
      content:         data.content,
      coverImage:      data.coverImage ?? undefined,
      category:        slugify(data.category),
      extraCategories: data.extraCategories.map(slugify),
      tags:            data.tags,
      draft:           data.draft,
      readingTime:     data.readingTime ?? estimateReadingTime(data.content),
      pubDate:         data.pubDate ? new Date(data.pubDate) : now,
      createdAt:       now,
      updatedAt:       now,
    };

    const result = await posts.insertOne(doc);
    return json({ success: true, id: result.insertedId, slug }, 201);
  } catch (err) {
    console.error("[POST /api/posts]", err);
    return json({ error: "Failed to create post." }, 500);
  }
};
