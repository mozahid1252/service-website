import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 15;

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) {
    console.error("[Booking] Missing SUPABASE_URL or SUPABASE_KEY");
    return null;
  }
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, phone, website_url, service_package, monthly_revenue, preferred_time, additional_notes, source_package } = body;

    const missing: string[] = [];
    if (!full_name?.trim()) missing.push("full_name");
    if (!email?.trim()) missing.push("email");
    if (!website_url?.trim()) missing.push("website_url");
    if (!service_package) missing.push("service_package");
    if (missing.length > 0) {
      return NextResponse.json({ success: false, error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }
    if (!/^https?:\/\/.+\..+/.test(website_url.trim())) {
      return NextResponse.json({ success: false, error: "Invalid website URL" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, error: "Booking service unavailable" }, { status: 500 });
    }

    const { data, error } = await supabase.from("package_bookings").insert({
      full_name: full_name.trim(), email: email.trim(), phone: phone?.trim() || null,
      website_url: website_url.trim(), service_package, monthly_revenue: monthly_revenue || null,
      preferred_time: preferred_time?.trim() || null, additional_notes: additional_notes?.trim() || null,
      source_package: source_package || null,
    }).select();

    if (error) {
      console.error("[Booking] Supabase insert failed:", error.code, error.message);
      return NextResponse.json({ success: false, error: "Failed to save booking", details: error.message }, { status: 500 });
    }

    console.log("[Booking] Success:", { id: data?.[0]?.id, email: email.trim() });
    return NextResponse.json({ success: true, message: "Booking created successfully.", id: data?.[0]?.id }, { status: 201 });
  } catch (error) {
    console.error("[Booking] API error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: "Failed to process booking", details: msg }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "MozIntelligence Booking API" });
}
