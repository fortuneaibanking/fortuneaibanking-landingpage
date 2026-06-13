"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Message = {
  role: "user" | "fortune";
  text: string;
  gold?: boolean;
};

// Wrap Nigerian naira amounts, account numbers, and data sizes in mono spans
function renderWithMono(text: string): React.ReactNode {
  const pattern = /(N[\d,]+|₦[\d,]+|\d{10}|\d+GB|\d+MB)/g;
  const parts = text.split(pattern);
  const matches = text.match(pattern) ?? [];
  return parts.reduce<React.ReactNode[]>((acc, part, i) => {
    acc.push(part);
    if (matches[i]) {
      acc.push(
        <span key={i} className="font-mono font-medium tracking-tight">
          {matches[i]}
        </span>
      );
    }
    return acc;
  }, []);
}

interface ChatMockupProps {
  messages: readonly Message[];
  compact?: boolean;
}

export default function ChatMockup({ messages, compact = false }: ChatMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const tick = () => {
      i++;
      setVisible(i);
      if (i < messages.length) {
        setTimeout(tick, 400);
      }
    };
    setTimeout(tick, 200);
  }, [isInView, messages.length]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Fortune WhatsApp chat demonstration"
      className={`relative rounded-2xl bg-[#E5DDD5] overflow-hidden ${
        compact ? "p-4 max-w-[280px]" : "p-5 max-w-[340px] w-full"
      }`}
      style={{
        boxShadow: "0 20px 48px -8px rgba(11,46,31,0.22), 0 4px 16px -2px rgba(11,46,31,0.10)",
      }}
    >
      {/* WhatsApp-style header */}
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-black/8">
        <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center flex-shrink-0">
          <span className="font-manrope font-bold text-white text-xs">F</span>
        </div>
        <div>
          <p className="font-inter font-semibold text-[0.8rem] text-ink leading-none">Fortune</p>
          <p className="font-inter text-[0.7rem] text-ink/50 mt-0.5">Money assistant</p>
        </div>
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald" aria-hidden="true" />
      </div>

      {/* Messages */}
      <div className={`flex flex-col gap-2 ${compact ? "min-h-[120px]" : "min-h-[160px]"}`}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={visible > i ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[85%] rounded-xl px-3 py-1.5 font-inter text-[0.78rem] leading-[1.45]
                ${msg.role === "user"
                  ? "bg-[#DCF8C6] text-ink rounded-br-sm"
                  : "bg-white text-ink rounded-bl-sm shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                }
                ${msg.gold ? "font-semibold" : ""}
              `}
            >
              {msg.gold ? (
                <>
                  {renderWithMono(msg.text.replace(" Ire o!", ""))}{" "}
                  <span className="text-gold font-bold">Ire o!</span>
                </>
              ) : (
                renderWithMono(msg.text)
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
