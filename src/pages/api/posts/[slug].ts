import type { APIRoute } from "astro";

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/posts/:slug
export const GET: APIRoute = async ({ params }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const res = await fetch(`${beUrl}/posts/${params.slug}`);
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};

// PUT /api/posts/:slug
export const PUT: APIRoute = async ({ request, params }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await fetch(`${beUrl}/posts/${params.slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: request.body,
    duplex: "half",
  } as RequestInit);
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};

// DELETE /api/posts/:slug
export const DELETE: APIRoute = async ({ request, params }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await fetch(`${beUrl}/posts/${params.slug}`, {
    method: "DELETE",
    headers: { "x-api-key": apiKey },
  });
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};
