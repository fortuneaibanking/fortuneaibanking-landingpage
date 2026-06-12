"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { features } from "@/content/copy";
import { fadeUp, easeOut } from "@/lib/motion";
import ChatMockup from "./ChatMockup";

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
        !isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Copy */}
      <div>
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-inter text-[0.68rem] font-semibold tracking-[0.18em] text-emerald uppercase mb-4"
        >
          {feature.label}
        </motion.p>

        <motion.h3
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-syne font-extrabold text-forest mb-4"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.025em" }}
        >
          {feature.h2}
        </motion.h3>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-inter text-[0.9875rem] leading-[1.75] text-ink/70 max-w-[480px]"
        >
          {feature.body}
        </motion.p>
      </div>

      {/* Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
        className={`flex ${isEven ? "lg:justify-end" : "lg:justify-start"} justify-center`}
      >
        <ChatMockup messages={feature.mockup} />
      </motion.div>
    </div>
  );
}

export default function FeatureRows() {
  return (
    <section
      id="features"
      className="section-pad"
      aria-labelledby="features-heading"
    >
      <div className="container-main">
        <h2 id="features-heading" className="sr-only">Features</h2>
        <div className="flex flex-col gap-24 lg:gap-32">
          {features.map((feature, i) => (
            <FeatureItem key={feature.label} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
