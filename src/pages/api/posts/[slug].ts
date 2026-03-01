import type { APIRoute } from "astro";
import apiClient from "../../../lib/axios";

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

  const res = await apiClient.get(`${beUrl}/posts/${params.slug}`, { validateStatus: () => true });
  return new Response(JSON.stringify(res.data), { status: res.status, headers: { "Content-Type": "application/json" } });
};

// PUT /api/posts/:slug
export const PUT: APIRoute = async ({ request, params }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const bodyData = await request.text().catch(() => "");
  const res = await apiClient.put(`${beUrl}/posts/${params.slug}`, bodyData, {
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    validateStatus: () => true
  });
  return new Response(JSON.stringify(res.data), { status: res.status, headers: { "Content-Type": "application/json" } });
};

// DELETE /api/posts/:slug
export const DELETE: APIRoute = async ({ request, params }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const res = await apiClient.delete(`${beUrl}/posts/${params.slug}`, {
    headers: { "x-api-key": apiKey },
    validateStatus: () => true
  });
  return new Response(JSON.stringify(res.data), { status: res.status, headers: { "Content-Type": "application/json" } });
};
