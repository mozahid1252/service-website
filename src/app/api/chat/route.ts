import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./system-prompt";
import { retrieveKnowledge } from "./retrieve";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* Gemini API configuration.
   GEMINI_API_KEY env var takes priority (recommended on Vercel).
   Falls back to a built-in key (base64-encoded) so the chatbot
   works immediately without manual env var setup. */
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  Buffer.from("QVEuQWI4Uk42Sk4tSUNRRWNOdlVQY1FhdUswWmlwUmFnbWxxaUlneV94ZEJxcmFoU3JFa2c=", "base64").toString("utf-8");
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, sessionId } = body as { messages: ChatMessage[]; sessionId?: string };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Get the latest user message for knowledge retrieval
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    // Retrieve relevant knowledge base content
    const knowledgeContext = retrieveKnowledge(lastUserMessage.content, 3);

    // Build the system prompt with knowledge context
    const systemPrompt = SYSTEM_PROMPT.replace("{KNOWLEDGE_CONTEXT}", knowledgeContext);

    if (!GEMINI_API_KEY) {
      console.error("[Chat] Missing GEMINI_API_KEY env var. Set it on Vercel Settings > Environment Variables.");
      return NextResponse.json(
        { error: "Chat is not configured yet. Please try again later." },
        { status: 500 }
      );
    }

    // Keep only the last 10 messages to avoid token limits
    const recentMessages = messages.slice(-10);

    // Gemini uses "model" for the assistant role (not "assistant")
    const contents = recentMessages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Call Gemini API (with retry for 503 high-demand spikes)
    const requestBody = JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.95,
      },
    });

    let geminiRes: Response | null = null;
    let lastError = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
      if (geminiRes.ok) break;
      const errBody = await geminiRes.json().catch(() => null);
      lastError = errBody?.error?.message || "";
      console.error(`[Chat] Gemini attempt ${attempt + 1} failed: ${geminiRes.status} — ${lastError}`);
      // Retry only on 503 (high demand) or 429 (rate limit)
      if (geminiRes.status !== 503 && geminiRes.status !== 429) break;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }

    if (!geminiRes || !geminiRes.ok) {
      return NextResponse.json(
        { error: "Failed to process chat message", details: `Gemini API: ${geminiRes?.status || "no response"} — ${lastError}` },
        { status: 500 }
      );
    }

    const geminiData = await geminiRes.json();
    const response =
      geminiData?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response || response.trim().length === 0) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      response: response.trim(),
      sessionId: sessionId || "default",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process chat message", details: errorMessage },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "MozIntelligence AI Chatbot",
    version: "2.0.0",
    provider: "gemini",
  });
}
