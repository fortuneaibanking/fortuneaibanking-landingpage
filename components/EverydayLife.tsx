"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { everydayLife } from "@/content/copy";
import { fadeUpFast as fadeUp } from "@/lib/motion";

const cardIcons = [
  // Market runs
  <svg key="market" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Friends and family
  <svg key="friends" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Hustle and business
  <svg key="hustle" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Light and subs
  <svg key="light" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
];

export default function EverydayLife() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      className="section-pad"
      aria-labelledby="everyday-heading"
    >
      <div className="container-main">
        <motion.h2
          id="everyday-heading"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-manrope font-extrabold text-forest mb-12"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em" }}
        >
          {everydayLife.h2}
        </motion.h2>

        {/* Horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 snap-x snap-mandatory md:snap-none scrollbar-none">
          {everydayLife.cards.map((card, i) => (
            <motion.article
              key={card.title}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex-shrink-0 w-[220px] md:w-auto snap-start rounded-2xl border border-emerald/10 bg-white p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald/8 flex items-center justify-center text-emerald flex-shrink-0">
                {cardIcons[i]}
              </div>
              <div>
                <h3 className="font-manrope font-bold text-forest text-[1rem] tracking-tight mb-1.5">
                  {card.title}
                </h3>
                <p className="font-inter text-[0.875rem] leading-[1.6] text-ink/60">
                  {card.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
