import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

/* Destination inbox for contact form submissions.
   Override with CONTACT_EMAIL env var if needed. */
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "mozintelligence@gmail.com";

const contactSchema = z.object({
  type: z.enum(["contact", "quick", "booking"]).default("contact"),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  service: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  revenue: z.string().trim().max(100).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  timing: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

function buildEmailHtml(d: z.infer<typeof contactSchema>): string {
  const row = (label: string, value?: string | null) =>
    value && value.trim()
      ? `<tr><td style="padding:8px 12px;font-weight:600;color:#1f1f1f;background:#f5f3fe;border:1px solid #e5e0f5;width:180px;vertical-align:top;">${label}</td><td style="padding:8px 12px;color:#4d4d4d;border:1px solid #e5e0f5;vertical-align:top;">${escapeHtml(value)}</td></tr>`
      : "";
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#1f1f1f;">
  <div style="max-width:560px;margin:0 auto;border:1px solid #e5e0f5;border-radius:8px;overflow:hidden;">
    <div style="background:#6f3ede;color:#fff;padding:18px 24px;">
      <div style="font-size:18px;font-weight:700;">New Contact Form Submission</div>
      <div style="font-size:12px;opacity:0.85;margin-top:2px;">MozIntelligence · ${escapeHtml(d.type)} form</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", d.name)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Store URL", d.website)}
      ${row("Service", d.service)}
      ${row("Budget Range", d.budget)}
      ${row("Monthly Revenue", d.revenue)}
      ${row("Country", d.country)}
      ${row("City", d.city)}
      ${row("Timing", d.timing)}
      ${row("Notes", d.notes)}
      ${row("Message", d.message)}
    </table>
    <div style="background:#f5f3fe;padding:12px 24px;font-size:11px;color:#4d4d4d;">
      Reply directly to the submitter at <a href="mailto:${encodeURIComponent(d.email)}" style="color:#6f3ede;">${escapeHtml(d.email)}</a>
    </div>
  </div>
</body></html>`;
}

function buildEmailText(d: z.infer<typeof contactSchema>): string {
  const lines = [
    "New contact form submission — MozIntelligence",
    "",
    `Type: ${d.type}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : "",
    d.website ? `Store URL: ${d.website}` : "",
    d.service ? `Service: ${d.service}` : "",
    d.budget ? `Budget Range: ${d.budget}` : "",
    d.revenue ? `Monthly Revenue: ${d.revenue}` : "",
    d.country ? `Country: ${d.country}` : "",
    d.city ? `City: ${d.city}` : "",
    d.timing ? `Timing: ${d.timing}` : "",
    d.notes ? `Notes: ${d.notes}` : "",
    d.message ? `Message: ${d.message}` : "",
    "",
    `Reply to: ${d.email}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const d = parsed.data;

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error(
        "[Contact] Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars. Set them on Vercel to enable email delivery."
      );
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Please set GMAIL_USER and GMAIL_APP_PASSWORD, or reach us directly at " +
            CONTACT_EMAIL,
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const info = await transporter.sendMail({
      from: `"MozIntelligence Contact Form" <${gmailUser}>`,
      to: CONTACT_EMAIL,
      replyTo: d.email,
      subject: `[MozIntelligence] New ${d.type} submission from ${d.name}`,
      text: buildEmailText(d),
      html: buildEmailHtml(d),
    });

    console.log("[Contact] Email sent:", info.messageId, "to", CONTACT_EMAIL);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 }
    );
  }
}
