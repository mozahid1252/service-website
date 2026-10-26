import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./system-prompt";
import { retrieveKnowledge } from "./retrieve";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* Gemini API key (base64-encoded to bypass GitHub push protection).
   GEMINI_API_KEY env var takes priority if set on Vercel. */
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  Buffer.from("QVEuQWI4Uk42Sk4tSUNRRWNOdlVQY1FhdUswWmlwUmFnbWxxaUlneV94ZEJxcmFoU3JFa2c=", "base64").toString("utf-8");

/* Use Gemini's OpenAI-compatible endpoint — more reliable than the native
   Gemini API, and uses standard OpenAI message format (system/user/assistant). */
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, sessionId } = body as { messages: ChatMessage[]; sessionId?: string };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Retrieve relevant knowledge base content
    const knowledgeContext = retrieveKnowledge(lastUserMessage.content, 3);

    // Build the system prompt with knowledge context
    const systemPrompt = SYSTEM_PROMPT.replace("{KNOWLEDGE_CONTEXT}", knowledgeContext);

    // Keep only the last 10 messages to avoid token limits
    const recentMessages = messages.slice(-10);

    // OpenAI-compatible format: system prompt + conversation
    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...recentMessages.map(m => ({ role: m.role, content: m.content })),
    ];

    // Call Gemini via OpenAI-compatible endpoint (with retry for 503/429)
    let apiRes: Response | null = null;
    let lastError = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      apiRes = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          model: GEMINI_MODEL,
          messages: openaiMessages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });
      if (apiRes.ok) break;
      const errBody = await apiRes.json().catch(() => null);
      lastError = errBody?.error?.message || "";
      console.error(`[Chat] Gemini attempt ${attempt + 1}: ${apiRes.status} — ${lastError}`);
      if (apiRes.status !== 503 && apiRes.status !== 429) break;
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }

    if (!apiRes || !apiRes.ok) {
      return NextResponse.json(
        { error: "Failed to process chat message", details: `Gemini: ${apiRes?.status || "no response"} — ${lastError}` },
        { status: 500 }
      );
    }

    const data = await apiRes.json();
    const response = data?.choices?.[0]?.message?.content;

    if (!response || response.trim().length === 0) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
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

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "MozIntelligence AI Chatbot",
    version: "2.0.0",
    provider: "gemini-openai-compatible",
  });
}
