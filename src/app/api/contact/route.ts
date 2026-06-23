import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

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

    // Save to database
    await db.contactSubmission.create({
      data: {
        name,
        email,
        storeUrl: url || "",
        budget: budget || "",
        message,
      },
    });

    // Send email via Gmail SMTP
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass && gmailPass !== "your_app_password_here") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email,
          subject: `New Inquiry from ${name} — Mozahidul Islam Portfolio`,
          html: `
            <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#0a0f18;padding:32px;border-radius:16px;border:1px solid rgba(0,198,255,0.2);">
              <h2 style="color:#00C6FF;margin-bottom:24px;font-size:22px;">New Client Inquiry</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                  <td style="padding:12px 0;color:#8899AA;font-size:14px;width:120px;">Name</td>
                  <td style="padding:12px 0;color:#F0F4F8;font-size:14px;font-weight:600;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                  <td style="padding:12px 0;color:#8899AA;font-size:14px;">Email</td>
                  <td style="padding:12px 0;color:#F0F4F8;font-size:14px;"><a href="mailto:${email}" style="color:#00C6FF;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                  <td style="padding:12px 0;color:#8899AA;font-size:14px;">Store URL</td>
                  <td style="padding:12px 0;color:#F0F4F8;font-size:14px;">${url || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;color:#8899AA;font-size:14px;">Budget</td>
                  <td style="padding:12px 0;color:#F0F4F8;font-size:14px;">${budget || "Not selected"}</td>
                </tr>
              </table>
              <div style="margin-top:24px;padding:20px;background:rgba(0,198,255,0.04);border-radius:12px;border-left:4px solid #00C6FF;">
                <div style="color:#00C6FF;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Message</div>
                <p style="color:#F0F4F8;font-size:14px;line-height:1.6;margin:0;">${message}</p>
              </div>
              <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                <p style="color:#8899AA;font-size:12px;">Sent from Mozahidul Islam Portfolio Contact Form</p>
              </div>
            </div>
          `,
        });

        console.log("Email sent successfully to", gmailUser);
      } catch (emailErr) {
        console.error("Email send failed (DB save succeeded):", emailErr);
      }
    } else {
      console.log("Gmail SMTP not configured. Form saved to DB only. Set GMAIL_APP_PASSWORD in .env");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ submissions });
  } catch (err) {
    console.error("Fetch submissions error:", err);
    return NextResponse.json(
      { error: "Failed to fetch submissions." },
      { status: 500 }
    );
  }
}
