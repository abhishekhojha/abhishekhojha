import type { APIRoute } from "astro";
import { getPostsCollection, slugify } from "../../../lib/db";
import { UpdatePostSchema, formatZodError } from "../../../lib/schemas";

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
// GET /api/posts/[slug]  — single post with full content
// ---------------------------------------------------------------------------
export const GET: APIRoute = async ({ params, locals }) => {
  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  try {
    const posts = getPostsCollection(uri);
    const post = await posts.findOne({ slug: params.slug });
    if (!post) return json({ error: "Post not found." }, 404);
    return json(post);
  } catch (err) {
    console.error("[GET /api/posts/[slug]]", err);
    return json({ error: "Failed to fetch post." }, 500);
  }
};

// ---------------------------------------------------------------------------
// PUT /api/posts/[slug]  — update a post (auth required)
// ---------------------------------------------------------------------------
export const PUT: APIRoute = async ({ request, params, locals }) => {
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

  const parsed = UpdatePostSchema.safeParse(rawBody);
  if (!parsed.success) {
    return json({ errors: formatZodError(parsed.error) }, 422);
  }

  const data = parsed.data;

  try {
    const posts = getPostsCollection(uri);
    const existing = await posts.findOne({ slug: params.slug });
    if (!existing) return json({ error: "Post not found." }, 404);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update: Record<string, any> = { updatedAt: new Date() };

    if (data.title           !== undefined) update.title           = data.title;
    if (data.description     !== undefined) update.description     = data.description;
    if (data.content         !== undefined) update.content         = data.content;
    if (data.coverImage      !== undefined) update.coverImage      = data.coverImage || undefined;
    if (data.category        !== undefined) update.category        = slugify(data.category);
    if (data.extraCategories !== undefined) update.extraCategories = data.extraCategories.map(slugify);
    if (data.tags            !== undefined) update.tags            = data.tags;
    if (data.draft           !== undefined) update.draft           = data.draft;
    if (data.readingTime     !== undefined) update.readingTime     = data.readingTime;
    if (data.pubDate         !== undefined) update.pubDate         = new Date(data.pubDate);
    if (data.slug            !== undefined) update.slug            = slugify(data.slug);

    // Auto-recalculate readingTime when content changes but readingTime is not explicitly set
    if (data.content && data.readingTime === undefined) {
      const { estimateReadingTime } = await import("../../../lib/db");
      update.readingTime = estimateReadingTime(data.content);
    }

    await posts.updateOne({ slug: params.slug }, { $set: update });
    return json({ success: true });
  } catch (err) {
    console.error("[PUT /api/posts/[slug]]", err);
    return json({ error: "Failed to update post." }, 500);
  }
};

// ---------------------------------------------------------------------------
// DELETE /api/posts/[slug]  — delete a post (auth required)
// ---------------------------------------------------------------------------
export const DELETE: APIRoute = async ({ request, params, locals }) => {
  const secret = (locals.runtime?.env?.API_SECRET ?? import.meta.env.API_SECRET) as string;
  if (!isAuthorized(request, secret)) return json({ error: "Unauthorized." }, 401);

  const uri = (locals.runtime?.env?.MONGODB_URI ?? import.meta.env.MONGODB_URI) as string;
  if (!uri) return json({ error: "MONGODB_URI not set." }, 500);

  try {
    const posts = getPostsCollection(uri);
    const result = await posts.deleteOne({ slug: params.slug });
    if (result.deletedCount === 0) return json({ error: "Post not found." }, 404);
    return json({ success: true, deleted: params.slug });
  } catch (err) {
    console.error("[DELETE /api/posts/[slug]]", err);
    return json({ error: "Failed to delete post." }, 500);
  }
};
