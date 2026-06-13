"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faq } from "@/content/copy";
import { fadeUp, easeOut } from "@/lib/motion";

function FaqItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${index}`;

  return (
    <div className="border-b border-emerald/12 last:border-b-0">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-emerald"
      >
        <span className="font-manrope font-semibold text-forest text-[0.9875rem] tracking-tight">
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-emerald/30 flex items-center justify-center text-emerald transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={`faq-q-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="font-inter text-[0.9rem] leading-[1.75] text-ink/65 pb-5 pr-10">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="section-pad bg-mist"
      aria-labelledby="faq-heading"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2
              id="faq-heading"
              className="font-manrope font-extrabold text-forest"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em" }}
            >
              {faq.h2}
            </h2>
            <p className="font-inter text-[0.9rem] text-ink/55 mt-3 leading-relaxed">
              Everything you need to know before you sign up.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faq.items.map((item, i) => (
              <FaqItem key={item.q} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
