"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { hero } from "@/content/copy";
import { getPrimaryCtaLabel, getPrimaryCtaHref } from "@/config/site";
import { fadeUp, easeOut } from "@/lib/motion";
import ChatMockup from "./ChatMockup";
import AdirePattern from "./AdirePattern";

export default function Hero() {
  const ctaLabel = getPrimaryCtaLabel();
  const ctaHref = getPrimaryCtaHref();

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
      aria-label="Hero"
    >
      {/* Adire background texture */}
      <AdirePattern
        className="absolute inset-0 w-full h-full text-emerald"
        opacity={0.04}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 45%, rgba(0,113,61,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="max-w-prose lg:max-w-none">
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-inter text-[0.7rem] font-semibold tracking-[0.16em] text-emerald uppercase mb-5"
            >
              {hero.eyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-manrope font-extrabold text-forest leading-[1.04] tracking-[-0.03em] mb-3"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 4.25rem)" }}
            >
              {hero.h1}
            </motion.h1>

            {/* Ire o! accent */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-manrope font-bold text-gold mb-6"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)", letterSpacing: "-0.02em" }}
              aria-label="Ire o! — a Yoruba blessing meaning good fortune"
            >
              {hero.accent}
            </motion.p>

            {/* Subhead */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-inter text-[1.0625rem] leading-[1.7] text-ink/75 max-w-[560px] mb-9"
            >
              {hero.subhead}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 items-center mb-10"
            >
              <Link href={ctaHref} className="btn-primary">
                {ctaLabel}
              </Link>
              <Link
                href="#how-it-works"
                className="font-inter text-[0.9375rem] font-semibold text-emerald hover:text-forest transition-colors duration-150 flex items-center gap-1.5"
              >
                {hero.secondaryCta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 items-center"
            >
              {hero.trustStrip.map((item, i) => (
                <span key={item} className="flex items-center gap-2 font-inter text-[0.78rem] text-ink/45">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-ink/20" aria-hidden="true" />}
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Chat mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative glow behind mockup */}
              <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,113,61,0.12) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <ChatMockup messages={hero.chat} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
