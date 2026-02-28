import type { APIRoute } from "astro";

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/posts
export const GET: APIRoute = async ({ request }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const incomingUrl = new URL(request.url);
  const target = new URL(`${beUrl}/posts`);
  incomingUrl.searchParams.forEach((v, k) => target.searchParams.set(k, v));

  const apiKey = request.headers.get("x-api-key") ?? "";
  const headers: Record<string, string> = {};
  if (apiKey) headers["x-api-key"] = apiKey;

  const res = await fetch(target.toString(), { headers });
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};

// POST /api/posts
export const POST: APIRoute = async ({ request }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await fetch(`${beUrl}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: request.body,
    duplex: "half",
  } as RequestInit);
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};
