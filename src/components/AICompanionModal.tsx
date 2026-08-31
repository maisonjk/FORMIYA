import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Info,
  Heart,
  MessageSquare,
} from "lucide-react";
import Markdown from "react-markdown";
import { UserProfile } from "../types";

interface Message {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

interface AICompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  "I'm having a hard time forgiving someone who deeply hurt me.",
  "I missed prayer all week and feel subtle guilt and spiritual shame.",
  "How do I know the difference between Holy Spirit conviction and shame?",
  "I'm feeling spiritually dry. Where do I start today?",
];

export const AICompanionModal: React.FC<AICompanionModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: `Hello ${userProfile.name}. I'm your Scripture-grounded discipleship companion. How can I walk beside you in God's Word today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai-companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userProfile,
          conversationHistory: history,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get companion response");
      }

      const data = await res.json();
      const modelMsg: Message = {
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        role: "model",
        content: `I hear you, ${userProfile.name}. Remember Romans 8:1 — *"There is now no condemnation for those who are in Christ Jesus."* Take a slow, quiet breath. How does bringing this into God's presence feel right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-2xl w-full h-[85vh] shadow-2xl flex flex-col my-8 overflow-hidden text-white">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#151515]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#c5a368]/30 flex items-center justify-center text-[#c5a368]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-white">
                  FORMIYA AI Companion
                </h2>
                <span className="text-[11px] font-mono bg-[#1c1c1c] text-[#c5a368] px-2 py-0.5 rounded border border-[#c5a368]/20">
                  Scripture Grounded
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/50">
                Biblical accompaniment • Non-prescriptive • Pastors & community first
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guardrail Disclaimer */}
        <div className="bg-[#0e0e0e] border-b border-white/10 px-5 py-2.5 flex items-center space-x-2.5 text-xs sm:text-sm text-white/60">
          <ShieldCheck className="w-4 h-4 text-[#c5a368] shrink-0" />
          <span>Encrypted conversation. AI does not replace your pastor, small group, or Christian community.</span>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs text-base leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#c5a368] text-black font-medium"
                    : "bg-[#181818] text-white/95 border border-white/10"
                }`}
              >
                {msg.role === "model" ? (
                  <div className="prose-formation text-white/95 text-base">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
              <span className="text-xs text-white/40 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-white/50 text-sm pl-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a368] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#c5a368] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#c5a368] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-mono text-xs">Forming Gospel response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starter Prompts */}
        {messages.length <= 2 && (
          <div className="px-5 py-2.5 bg-[#141414] border-t border-white/10 overflow-x-auto no-scrollbar flex items-center space-x-2">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 hover:border-[#c5a368]/40 text-xs sm:text-sm text-white/80 hover:text-white whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#151515]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question, share a spiritual doubt, or request a breath prayer..."
              className="flex-1 p-3.5 rounded-xl border border-white/10 bg-[#1c1c1c] text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#c5a368]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-3.5 rounded-xl bg-[#c5a368] hover:bg-[#d8b67b] disabled:opacity-40 text-black font-semibold transition-all shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
