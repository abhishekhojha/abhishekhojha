import type { APIRoute } from "astro";
import apiClient from "../../../lib/axios";

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/categories
export const GET: APIRoute = async () => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const res = await apiClient.get(`${beUrl}/categories`, { validateStatus: () => true });
  return new Response(JSON.stringify(res.data), { status: res.status, headers: { "Content-Type": "application/json" } });
};

// POST /api/categories
export const POST: APIRoute = async ({ request }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) return json({ error: "BE_URL not configured." }, 500);

  const apiKey = request.headers.get("x-api-key") ?? "";
  const bodyData = await request.text().catch(() => "");
  const res = await apiClient.post(`${beUrl}/categories`, bodyData, {
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    validateStatus: () => true
  });
  return new Response(JSON.stringify(res.data), { status: res.status, headers: { "Content-Type": "application/json" } });
};
