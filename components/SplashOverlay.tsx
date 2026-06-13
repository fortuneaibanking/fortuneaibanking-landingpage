"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut } from "@/lib/motion";

type Phase = "raining" | "rolling" | "revealed" | "dismissed";

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  settled: boolean;
  alpha: number;
}

export default function SplashOverlay() {
  const [phase, setPhase] = useState<Phase>("raining");
  const [mounted, setMounted] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Skip animation for reduced-motion users
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("revealed");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = new window.Image();
    img.src = "/brand/green-cowrie.png";

    img.onload = () => {
      const COUNT = 32;
      const particles: Particle[] = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: -(Math.random() * canvas.height * 0.9 + 20),
        vy: 3.5 + Math.random() * 4.5,
        vx: (Math.random() - 0.5) * 2,
        size: 22 + Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.18,
        settled: false,
        alpha: 0.8 + Math.random() * 0.2,
      }));

      let done = false;

      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let settledCount = 0;

        for (const p of particles) {
          if (!p.settled) {
            p.y += p.vy;
            p.x += p.vx;
            p.rotation += p.rotSpeed;
            const floor = canvas.height - p.size * 0.55;
            if (p.y >= floor) {
              p.y = floor;
              p.vy = 0;
              p.vx = 0;
              p.settled = true;
            }
          } else {
            settledCount++;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }

        if (settledCount === COUNT && !done) {
          done = true;
          setTimeout(() => setPhase("rolling"), 500);
          return;
        }

        if (!done) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Advance rolling → revealed after animation completes
  useEffect(() => {
    if (phase !== "rolling") return;
    const t = setTimeout(() => setPhase("revealed"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  function handleDismiss() {
    setPhase("dismissed");
    setTimeout(() => setMounted(false), 900);
  }

  if (!mounted) return null;

  return (
    <motion.div
      animate={phase === "dismissed" ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: 0.85, ease: easeOut }}
      className="fixed inset-0 z-[200] bg-white overflow-hidden flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label="Fortune intro"
    >
      {/* Cowrie rain canvas — mix-blend-mode: multiply removes white PNG background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          mixBlendMode: "multiply",
          opacity: phase === "raining" ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Skip button during rain */}
      {phase === "raining" && (
        <button
          onClick={handleDismiss}
          className="absolute bottom-6 right-6 font-inter text-xs text-ink/30 hover:text-ink/60 transition-colors duration-150 z-10"
        >
          skip
        </button>
      )}

      {/* Rolling cowrie + reveal */}
      <AnimatePresence>
        {(phase === "rolling" || phase === "revealed") && (
          <motion.div
            key="cowrie-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-8 px-6 text-center"
            style={{ perspective: "900px" }}
          >
            {/* The rolling cowrie — rolls from floor to center */}
            <motion.div
              initial={{ y: "42vh", scale: 0.08 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: easeOut }}
            >
              <motion.img
                src="/brand/green-cowrie.png"
                alt="Green and gold cowrie shell"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 400 }}
                transition={{ duration: 1.4, ease: easeOut }}
                className="w-32 md:w-44 lg:w-52 select-none"
                draggable={false}
                style={{
                  mixBlendMode: "multiply",
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 20px 40px rgba(11,46,31,0.18))",
                }}
              />
            </motion.div>

            {/* Text + CTA — only after rolling finishes */}
            <AnimatePresence>
              {phase === "revealed" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: easeOut, delay: 0.1 }}
                  className="flex flex-col items-center gap-7"
                >
                  <div>
                    <p
                      className="font-syne font-extrabold text-forest text-balance leading-tight mb-2"
                      style={{
                        fontSize: "clamp(1.35rem, 4vw, 2.25rem)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      Something amazing is cooking.
                    </p>
                    <p
                      className="font-syne font-bold text-gold"
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Ire o!
                    </p>
                  </div>

                  <button
                    onClick={handleDismiss}
                    className="btn-primary group flex items-center gap-2"
                    autoFocus
                  >
                    See what&apos;s cooking
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M3 8h10M8 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
