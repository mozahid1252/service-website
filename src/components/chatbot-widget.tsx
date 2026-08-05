'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const QUICK_PROMPTS = [
  "What services do you offer?",
  "Which package is right for my store?",
  "Do you work with Shopify?",
  "How much does it cost?",
];

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hi! I'm the MozIntelligence AI Concierge. I can help you understand our e-commerce analytics services, find the right package for your store, and answer questions about pricing, deliverables, and integrations. What brings you here today?",
  timestamp: Date.now(),
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
      // Call the chat proxy service through the Z.ai sandbox gateway.
      // The proxy runs inside the sandbox where z-ai-web-dev-sdk can access the LLM API.
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
        content: "I'm having trouble connecting right now. Please try again in a moment, or you can reach MozIntelligence directly at mojahidulislam101010@gmail.com.",
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

  // Handle Enter key
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [sendMessage, input]);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle fixed bottom-6 left-6 z-[200] flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
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

      {/* Chat Panel */}
      <div
        className={`chatbot-panel fixed bottom-6 left-6 z-[201] w-[calc(100vw-3rem)] sm:w-96 max-w-md transition-all duration-300 ${
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
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
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
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                </div>
              </div>
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
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, pricing, packages..."
                disabled={isLoading}
                className="flex-1 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-2.5 text-sm text-white placeholder:text-[#667788] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0"
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
