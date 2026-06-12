"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { howItWorks } from "@/content/copy";
import { fadeUp } from "@/lib/motion";

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-pad bg-mist"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-main">
        <motion.h2
          id="how-it-works-heading"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-syne font-extrabold text-forest text-center mb-16"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em" }}
        >
          {howItWorks.h2}
        </motion.h2>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" role="list">
          {howItWorks.steps.map((step, i) => (
            <motion.li
              key={step.number}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative flex flex-col gap-4"
            >
              {/* Connector line between steps */}
              {i < howItWorks.steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-5 left-[calc(50%+24px)] right-[-50%] h-px bg-emerald/20"
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <div className="flex items-center gap-4">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald flex items-center justify-center font-syne font-bold text-white text-sm"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="font-syne font-bold text-forest text-lg tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="font-inter text-[0.95rem] leading-[1.7] text-ink/70 pl-14">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
