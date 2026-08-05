'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, Calendar, Mail } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// CTA destinations (from the existing Contact section)
const BOOKING_URL = 'https://calendar.app.google/TGnzfC65zBF3hVeD9';
// Email: same Gmail compose URL used by the Contact section's "Email Me" button
const EMAIL_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=mojahidulislam101010@gmail.com&su=Discovery+Call+Inquiry&body=Hi+Mozahidul%2C+I+visited+your+portfolio+and+want+to+discuss+my+e-commerce+data+needs.';

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How much does the Health Check cost?",
  "Do you work with Shopify?",
  "Which package is right for me?",
];

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: `Hi! I'm the MozIntelligence AI Concierge. I can help you understand our e-commerce analytics services, find the right package for your store, and answer questions about pricing, deliverables, and integrations.

What brings you here today?

[CTA]
intro: If you'd like to explore what's possible with your store's data, I'm happy to help you find the right starting point.
book_label: Book a Free 20-Min Strategy Call
email_label: Email Me
[/CTA]`,
  timestamp: Date.now(),
};

// Strip raw Markdown syntax from text, leaving clean plain text
function stripMarkdown(text: string): string {
  return text
    // Remove bold/italic markers
    .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+$/gm, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    // Remove markdown links, keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    .trim();
}

// Parse CTA block from assistant response
interface CTABlock {
  intro: string;
  bookLabel: string;
  emailLabel: string;
}

function parseCTA(content: string): { text: string; cta: CTABlock | null } {
  const ctaMatch = content.match(/\[CTA\]([\s\S]*?)\[\/CTA\]/);
  if (!ctaMatch) {
    return { text: stripMarkdown(content), cta: null };
  }

  const ctaContent = ctaMatch[1];
  const text = stripMarkdown(content.replace(/\[CTA\][\s\S]*?\[\/CTA\]/, '').trim());

  const introMatch = ctaContent.match(/intro:\s*(.+)/);
  const bookMatch = ctaContent.match(/book_label:\s*(.+)/);
  const emailMatch = ctaContent.match(/email_label:\s*(.+)/);

  return {
    text,
    cta: {
      intro: introMatch ? introMatch[1].trim() : '',
      bookLabel: bookMatch ? bookMatch[1].trim() : 'Book a Free 20-Min Strategy Call',
      emailLabel: emailMatch ? emailMatch[1].trim() : 'Email Me',
    },
  };
}

// Render a single message
function MessageBubble({ msg, isLast }: { msg: ChatMessage; isLast: boolean }) {
  const { text, cta } = msg.role === 'assistant' ? parseCTA(msg.content) : { text: msg.content, cta: null };

  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          msg.role === 'user'
            ? 'text-[#020408] rounded-br-sm'
            : 'text-[#E5E7EB] rounded-bl-sm'
        }`}
        style={
          msg.role === 'user'
            ? {
                background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                boxShadow: '0 2px 10px rgba(0,198,255,0.2)',
              }
            : {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }
        }
      >
        <div className="whitespace-pre-wrap break-words">{text}</div>

        {/* CTA Buttons */}
        {cta && (
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)] space-y-2">
            {cta.intro && (
              <div className="text-xs text-[#8899AA] leading-relaxed mb-2">{cta.intro}</div>
            )}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-[#020408] transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                boxShadow: '0 2px 8px rgba(0,198,255,0.2)',
              }}
            >
              <Calendar size={13} />
              {cta.bookLabel}
            </a>
            <a
              href={EMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #EA4335, #C5221F)',
                boxShadow: '0 2px 8px rgba(234,67,53,0.3)',
              }}
            >
              <Mail size={13} />
              {cta.emailLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef<string>(
    typeof window !== 'undefined'
      ? `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      : 'session-default'
  );

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Send message to API
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the chat proxy service through the Z.ai sandbox gateway
      const CHAT_PROXY_URL = 'https://preview-chat-896fc7f7-9316-4e75-a15e-cb944bad21fe.space-z.ai/api/chat?XTransformPort=3003';

      const response = await fetch(CHAT_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          sessionId: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (!isOpen) setHasUnread(true);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `I'm having trouble connecting right now. Please try again in a moment, or reach out directly:

[CTA]
intro: You can also book a call or send an email directly.
book_label: Book a Free 20-Min Strategy Call
email_label: Email Me
[/CTA]`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, isOpen]);

  // Handle form submit
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  }, [sendMessage, input]);

  // Handle quick prompt click
  const handleQuickPrompt = useCallback((prompt: string) => {
    sendMessage(prompt);
  }, [sendMessage]);

  // Auto-grow textarea: starts at ~3 lines, grows with content, max ~6 lines then scrolls
  const autoGrow = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    // Reset height to recalculate
    el.style.height = 'auto';
    // Set to scrollHeight (content height), clamped between min and max
    const minHeight = 66;  // ~3 lines
    const maxHeight = 140; // ~6 lines, then internal scroll
    el.style.height = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight) + 'px';
    // Enable internal scroll if at max
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, []);

  // Handle input change + auto-grow
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Defer auto-grow to next tick so the DOM updates first
    requestAnimationFrame(autoGrow);
  }, [autoGrow]);

  // Handle Enter key: Enter=send, Shift+Enter=newline (default textarea behavior)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      // Reset textarea height after sending
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.style.height = '66px';
          inputRef.current.style.overflowY = 'hidden';
        }
      });
    }
    // Shift+Enter: do nothing special — textarea inserts newline by default
  }, [sendMessage, input]);

  return (
    <>
      {/* Chat Toggle Button — Bottom-Right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle fixed bottom-5 right-5 z-[200] flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100'
        }`}
        aria-label="Open chat"
        style={{
          background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
          boxShadow: '0 0 25px rgba(0,198,255,0.4), 0 4px 15px rgba(0,0,0,0.3)',
        }}
      >
        <MessageCircle size={24} className="text-[#020408]" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#020408]" />
        )}
        {/* Pulse animation */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: 'rgba(0,198,255,0.3)',
            animationDuration: '2s',
          }}
        />
      </button>

      {/* Chat Panel — Bottom-Right */}
      <div
        className={`chatbot-panel fixed bottom-5 right-5 z-[201] w-[calc(100vw-2rem)] sm:w-96 max-w-md transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{
          height: 'min(600px, calc(100vh - 3rem))',
        }}
      >
        <div
          className="flex flex-col h-full rounded-2xl overflow-hidden border border-[rgba(0,198,255,0.2)]"
          style={{
            background: 'linear-gradient(180deg, rgba(8,14,24,0.98) 0%, rgba(2,4,8,0.99) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,198,255,0.08)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,198,255,0.15)]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,198,255,0.08), rgba(0,114,255,0.05))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                  boxShadow: '0 0 15px rgba(0,198,255,0.3)',
                }}
              >
                <Sparkles size={16} className="text-[#020408]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">MozIntelligence AI</div>
                <div className="text-[#8899AA] text-[11px] leading-tight flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  E-Commerce Analytics Concierge
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8899AA] hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-messages">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#00C6FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#00C6FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#00C6FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick prompts (only show on first message) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-2">
                <div className="text-[#8899AA] text-[11px] font-medium px-1">Quick questions:</div>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="block w-full text-left px-3 py-2 rounded-lg text-xs text-[#E5E7EB] transition-all hover:bg-[rgba(0,198,255,0.08)] hover:text-[#00C6FF]"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-3 py-3 border-t border-[rgba(0,198,255,0.12)]"
            style={{ background: 'rgba(2,4,8,0.5)' }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, pricing, packages..."
                disabled={isLoading}
                rows={3}
                className="chatbot-textarea flex-1 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-[#667788] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all disabled:opacity-50 resize-none"
                style={{
                  height: '66px',
                  minHeight: '66px',
                  maxHeight: '140px',
                  overflowY: 'hidden',
                  lineHeight: '1.4',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0 mb-0.5"
                style={{
                  background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                  boxShadow: '0 2px 10px rgba(0,198,255,0.2)',
                }}
                aria-label="Send message"
              >
                <Send size={16} className="text-[#020408]" />
              </button>
            </div>
            <div className="text-center mt-1.5 text-[10px] text-[#556677]">
              Powered by MozIntelligence AI · Grounded in website data
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
