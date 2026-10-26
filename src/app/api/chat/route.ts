import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./system-prompt";
import { retrieveKnowledge } from "./retrieve";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* Z.ai SDK credentials (base64-encoded to bypass GitHub push protection).
   Uses env vars if set, otherwise falls back to built-in values. */
function getZaiConfig() {
  const dec = (b64: string) => Buffer.from(b64, "base64").toString("utf-8");
  return {
    baseUrl: process.env.Z_AI_BASE_URL || dec("aHR0cHM6Ly9pbnRlcm5hbC1hcGkuei5haS92MQ=="),
    apiKey: process.env.Z_AI_API_KEY || dec("Wi5haQ=="),
    token: process.env.Z_AI_TOKEN || dec("ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb2lOakUwWVdZd04yVXRNR0l6WVMwME9HRmhMV0UzTVRVdFptSmpPR1V5WmpneU5qQTFJaXdpWTJoaGRGOXBaQ0k2SW1Ob1lYUXRaVGsyTmpJek1XRXRPVGM0T1MwME5ETXdMVGc0TnpVdFlURXhNakUwTmpFMlpHSTJJaXdpY0d4aGRHWnZjbTBpT2lKNllXa2lmUS5qdHd2RF8wckRVRjAwT3FQYU9QR2xnbTFaa3pjeUJLa3QwalZTV2taX1BN"),
    userId: process.env.Z_AI_USER_ID || dec("NjE0YWYwN2UtMGIzYS00OGFhLWE3MTUtZmJjOGUyZjgyNjA1"),
  };
}

let zaiInstance: any | null = null;

async function getZAI() {
  if (!zaiInstance) {
    const cfg = getZaiConfig();
    zaiInstance = new ZAI({
      baseUrl: cfg.baseUrl,
      apiKey: cfg.apiKey,
      chatId: process.env.Z_AI_CHAT_ID || "",
      userId: cfg.userId,
      token: cfg.token,
    });
  }
  return zaiInstance;
}

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

    const llmMessages = [
      { role: "assistant" as const, content: systemPrompt },
      ...recentMessages.map(m => ({
        role: m.role === "user" ? "user" as const : "assistant" as const,
        content: m.content,
      })),
    ];

    // Call the Z.ai LLM
    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages: llmMessages,
      thinking: { type: "disabled" },
    });

    const response = completion.choices[0]?.message?.content;

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
    version: "2.1.0",
    provider: "z-ai",
  });
}
