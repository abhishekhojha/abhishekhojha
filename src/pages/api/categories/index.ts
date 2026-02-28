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

// GET /api/categories
export const GET: APIRoute = async ({ locals }) => {
  const beUrl = getBeUrl(locals);
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const res = await fetch(`${beUrl}/categories`);
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};

// POST /api/categories
export const POST: APIRoute = async ({ request, locals }) => {
  const beUrl = getBeUrl(locals);
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await fetch(`${beUrl}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: request.body,
    // @ts-ignore
    duplex: "half",
  });
  return new Response(res.body, { status: res.status, headers: { "Content-Type": "application/json" } });
};
