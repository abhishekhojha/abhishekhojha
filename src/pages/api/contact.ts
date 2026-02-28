import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const resendKey = ((locals as any).runtime?.env?.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY) as string;
  if (!resendKey) {
    return new Response(JSON.stringify({ error: "Email service not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  const resend = new Resend(resendKey);

  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <contact@abhishekhojha.com>",
    to: "qabhishekh@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px 24px;background:#f6f6f6;border-radius:12px;">
        <h2 style="margin:0 0 4px;font-size:22px;color:#111;">New contact message</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#666;">Via <a href="https://abhishekhojha.com" style="color:#111;">abhishekhojha.com</a></p>

        <div style="background:#fff;border-radius:10px;padding:20px 24px;border:1px solid #e0e0e0;margin-bottom:16px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#999;">From</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#111;">${name}</p>
          <p style="margin:4px 0 0;font-size:14px;color:#555;">${email}</p>
        </div>

        <div style="background:#fff;border-radius:10px;padding:20px 24px;border:1px solid #e0e0e0;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#999;">Message</p>
          <p style="margin:0;font-size:15px;color:#333;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </div>

        <p style="margin:24px 0 0;font-size:12px;color:#aaa;text-align:center;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  if (error) {
    console.error("[Contact API] Resend error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
