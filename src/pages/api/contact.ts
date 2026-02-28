import type { APIRoute } from "astro";

export const prerender = false;

function getBeUrl(locals: App.Locals): string {
  return ((locals as any).runtime?.env?.BE_URL ?? import.meta.env.BE_URL ?? "") as string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const beUrl = getBeUrl(locals);
  if (!beUrl) {
    return new Response(JSON.stringify({ error: "BE_URL not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(`${beUrl}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: request.body,
    // @ts-ignore — needed for Cloudflare Workers duplex streaming
    duplex: "half",
  });

  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};
