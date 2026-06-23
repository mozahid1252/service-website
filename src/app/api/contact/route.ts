import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, url, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("Store URL", url || "Not provided");
    formData.append("Budget Range", budget || "Not selected");
    formData.append("message", message);
    formData.append("_subject", `New Inquiry from ${name} — Mozahidul Islam Portfolio`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    const response = await fetch("https://formsubmit.co/ajax/mojahidulislam101010@gmail.com", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
