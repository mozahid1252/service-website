import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const d = parsed.data;

    await db.contactMessage.create({
      data: {
        type: d.type,
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        website: d.website || null,
        service: d.service || null,
        budget: d.budget || null,
        revenue: d.revenue || null,
        country: d.country || null,
        city: d.city || null,
        timing: d.timing || null,
        notes: d.notes || null,
        message: d.message || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 }
    );
  }
}
