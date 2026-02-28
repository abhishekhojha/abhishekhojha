import type { APIRoute } from "astro";

export const prerender = false;

function getBeUrl(locals: App.Locals): string {
  return ((locals as any).runtime?.env?.BE_URL ?? import.meta.env.BE_URL ?? "") as string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/posts — forward query params to BE
export const GET: APIRoute = async ({ request, locals }) => {
  const beUrl = getBeUrl(locals);
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
export const POST: APIRoute = async ({ request, locals }) => {
  const beUrl = getBeUrl(locals);
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await fetch(`${beUrl}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: request.body,
    // @ts-ignore
    duplex: "half",
  });
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};
