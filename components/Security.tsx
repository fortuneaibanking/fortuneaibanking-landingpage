"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { security } from "@/content/copy";
import { fadeUp } from "@/lib/motion";

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.12 14.12a3 3 0 01-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const icons = [LockIcon, ShieldIcon, EyeOffIcon];

export default function Security() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      id="security"
      ref={ref}
      className="section-pad bg-mist"
      aria-labelledby="security-heading"
    >
      <div className="container-main">
        <motion.h2
          id="security-heading"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-manrope font-extrabold text-forest text-center mb-14"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em" }}
        >
          {security.h2}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {security.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.article
                key={card.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="bg-white rounded-2xl p-7 border border-emerald/8"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald/8 flex items-center justify-center text-emerald mb-5">
                  <Icon />
                </div>
                <h3 className="font-manrope font-bold text-forest text-[1.0625rem] tracking-tight mb-2.5">
                  {card.title}
                </h3>
                <p className="font-inter text-[0.9rem] leading-[1.7] text-ink/65">
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-inter text-[0.78rem] text-ink/45 text-center max-w-prose mx-auto"
        >
          {security.footnote}
        </motion.p>
      </div>
    </section>
  );
}
