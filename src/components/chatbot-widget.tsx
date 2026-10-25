"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Calendar, Mail, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does the Health Check cost?",
  "Do you work with Shopify?",
  "Which package is right for me?",
];

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the MozIntelligence AI Concierge. I can help you understand our e-commerce analytics services, find the right package for your store, and answer questions about pricing, deliverables, and integrations.\n\nWhat brings you here today?",
};

// CTA destinations — same links the previous widget used (Contact section).
const BOOKING_URL = "https://calendar.app.google/TGnzfC65zBF3hVeD9";
const EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mojahidulislam101010@gmail.com&su=Discovery+Call+Inquiry&body=Hi+Mozahidul%2C+I+visited+your+portfolio+and+want+to+discuss+my+e-commerce+data+needs.";

interface CTABlock {
  intro: string;
  bookLabel: string;
  emailLabel: string;
}

/**
 * The backend's system prompt appends a `[CTA]...[/CTA]` block to every
 * assistant response (intro + book_label + email_label). We parse it into
 * Book/Email buttons that render at the end of each assistant message —
 * matching the behaviour of the previous widget.
 */
function parseCTA(content: string): { text: string; cta: CTABlock | null } {
  const ctaMatch = content.match(/\[CTA\]([\s\S]*?)\[\/CTA\]/);
  if (!ctaMatch) {
    return { text: content.trim(), cta: null };
  }

  const ctaContent = ctaMatch[1];
  const text = content.replace(/\[CTA\][\s\S]*?\[\/CTA\]/, "").trim();

  const introMatch = ctaContent.match(/intro:\s*(.+)/);
  const bookMatch = ctaContent.match(/book_label:\s*(.+)/);
  const emailMatch = ctaContent.match(/email_label:\s*(.+)/);

  return {
    text,
    cta: {
      intro: introMatch ? introMatch[1].trim() : "",
      bookLabel: bookMatch ? bookMatch[1].trim() : "Book a Free 20-Min Strategy Call",
      emailLabel: emailMatch ? emailMatch[1].trim() : "Email Me",
    },
  };
}

/**
 * MozIntelligence AI Concierge — floating chat widget answering questions
 * grounded in the site's real package/pricing data (via /api/chat).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m !== GREETING || nextMessages.length === 1)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      // Reads `reply` (new shape) with fallback to `response` (existing backend shape)
      const body = (await res.json()) as { reply?: string; response?: string };
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            body.reply ||
            body.response ||
            "Sorry — I couldn't process that right now. Please book a free discovery call and we'll help you directly.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — something went wrong on my side. Please try again, or book a free 20-minute discovery call and we'll answer you directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setShowIntro(false);
        }}
        aria-label={open ? "Close the MozIntelligence AI chat" : "Chat with the MozIntelligence AI Concierge"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] inline-flex h-14 items-center gap-2 rounded-full bg-btn-purple px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(157,58,249,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-btn-purple-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-purple/60 focus-visible:ring-offset-2"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? "Close" : "Chat with us"}</span>
      </button>

      {/* Teaser bubble */}
      {!open && showIntro ? (
        <div className="fixed bottom-24 right-5 z-[60] max-w-[240px] rounded-[5px] border border-border bg-white p-4 shadow-[0_14px_36px_rgba(31,31,31,0.16)]">
          <button
            type="button"
            onClick={() => setShowIntro(false)}
            aria-label="Dismiss message"
            className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-body-text shadow-sm transition-colors hover:text-heading"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Find where your profit is leaking!
          </p>
        </div>
      ) : null}

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-24 right-5 z-[60] flex w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-[5px] border border-border bg-white shadow-[0_18px_48px_rgba(31,31,31,0.22)] transition-all duration-200",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
        role="dialog"
        aria-label="MozIntelligence AI Concierge"
        aria-hidden={!open}
      >
        {/* Header — dark purple so white text reads clearly (no token dependency) */}
        <div className="flex items-center gap-3 bg-[#2e1065] px-5 py-4 text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">MozIntelligence AI</p>
            <p className="text-xs text-white/80">E-Commerce Analytics Concierge</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="max-h-80 flex-1 overflow-y-auto px-4 py-4 scrollbar-slim">
          <div className="flex flex-col gap-3">
            {messages.map((m, i) => {
              const { text, cta } =
                m.role === "assistant" ? parseCTA(m.content) : { text: m.content, cta: null };
              return (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-[5px] px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "assistant"
                      ? "self-start bg-surface-soft text-heading"
                      : "self-end bg-btn-purple text-white"
                  )}
                >
                  {text}
                  {cta ? (
                    <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
                      {cta.intro ? (
                        <p className="mb-2 text-xs leading-relaxed text-body-text">{cta.intro}</p>
                      ) : null}
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1.5 rounded-[5px] bg-btn-purple px-3 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-btn-purple-hover"
                      >
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {cta.bookLabel}
                      </a>
                      <a
                        href={EMAIL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1.5 rounded-[5px] border border-brand/40 px-3 py-2 text-xs font-semibold text-brand transition-colors hover:bg-surface-soft"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        {cta.emailLabel}
                      </a>
                    </div>
                  ) : null}
                </div>
              );
            })}
            {loading ? (
              <div className="self-start rounded-[5px] bg-surface-soft px-3.5 py-2.5 text-sm text-body-text" aria-live="polite">
                Typing…
              </div>
            ) : null}
          </div>

          {/* Quick questions — shown until the user replies */}
          {messages.length === 1 && !loading ? (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-body-text/70">
                Quick questions:
              </p>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-[5px] border border-border bg-white px-3.5 py-2 text-left text-sm text-heading transition-colors hover:border-brand/40 hover:bg-surface-soft hover:text-brand"
                >
                  {q}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border px-3 py-3"
        >
          <label htmlFor="chat-input" className="sr-only">
            Type your question
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about packages, pricing…"
            className="min-w-0 flex-1 rounded-[5px] border border-input bg-white px-3.5 py-2.5 text-sm text-heading placeholder:text-body-text/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-btn-purple text-white transition-colors hover:bg-btn-purple-hover disabled:opacity-50"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
        <p className="border-t border-border px-4 py-2 text-center text-[10px] text-body-text/70">
          Powered by MozIntelligence AI · Grounded in website data
        </p>
      </div>
    </>
  );
}

// Backward-compatible export so the existing import in src/app/page.tsx
// (`import { ChatbotWidget } from '@/components/chatbot-widget'`) keeps working
// without any edits to page.tsx.
export { ChatWidget as ChatbotWidget };
