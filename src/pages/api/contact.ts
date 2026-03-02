import type { APIRoute } from "astro";
import apiClient from "../../lib/axios";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const beUrl = import.meta.env.BE_URL ?? "";
  if (!beUrl) {
    return new Response(JSON.stringify({ error: "BE_URL not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const bodyData = await request.text().catch(() => "");
  const res = await apiClient.post(`${beUrl}/contact`, bodyData, {
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true
  });

  return new Response(JSON.stringify(res.data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};
