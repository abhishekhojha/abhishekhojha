import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
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
    duplex: "half",
  } as RequestInit);

  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};
