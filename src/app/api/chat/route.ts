import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./system-prompt";
import { retrieveKnowledge } from "./retrieve";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Initialize ZAI SDK lazily (dynamic import to avoid build-time issues)
let zaiInstance: any | null = null;

async function getZAI() {
  if (!zaiInstance) {
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

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

    // Build messages for the LLM
    // Keep only the last 10 messages to avoid token limits
    const recentMessages = messages.slice(-10);

    const llmMessages = [
      { role: "assistant" as const, content: systemPrompt },
      ...recentMessages.map(m => ({
        role: m.role === "user" ? "user" as const : "assistant" as const,
        content: m.content,
      })),
    ];

    // Call the LLM
    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages: llmMessages,
      thinking: { type: "disabled" },
    });

    const response = completion.choices[0]?.message?.content;

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
    version: "1.0.0",
  });
}
