"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut } from "@/lib/motion";
import LogoVideo from "./LogoVideo";

type Phase = "raining" | "rolling" | "revealed" | "dismissed";

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  respawnAt: number;
}

const PARTICLE_COUNT = 68;
const PROC_SIZE = 512;

function buildProcessedCowrie(img: HTMLImageElement): {
  offscreen: HTMLCanvasElement;
} {
  const off = document.createElement("canvas");
  off.width = PROC_SIZE;
  off.height = PROC_SIZE;
  const ctx = off.getContext("2d")!;
  ctx.drawImage(img, 0, 0, PROC_SIZE, PROC_SIZE);

  const id = ctx.getImageData(0, 0, PROC_SIZE, PROC_SIZE);
  const d = id.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    if (r >= 238 && g >= 238 && b >= 238) {
      d[i + 3] = 0;
    } else if (r > 195 && g > 195 && b > 195) {
      const whiteness = (r + g + b) / 3;
      d[i + 3] = Math.round(((255 - whiteness) / 60) * 255);
    }
  }

  ctx.putImageData(id, 0, 0);
  return { offscreen: off };
}

function spawnParticle(W: number, H: number, stagger: boolean): Particle {
  return {
    x: Math.random() * W,
    y: stagger
      ? -(Math.random() * H * 1.3 + 20)
      : -(20 + Math.random() * 100),
    vy: 2.8 + Math.random() * 4.2,
    vx: (Math.random() - 0.5) * 1.8,
    size: 28 + Math.random() * 26,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.13,
    alpha: 0.72 + Math.random() * 0.28,
    respawnAt: 0,
  };
}

export default function SplashOverlay() {
  const [phase, setPhase] = useState<Phase>("raining");
  const [mounted, setMounted] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<Phase>("raining");
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("revealed");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.scale(DPR, DPR);

    const img = new window.Image();
    img.src = "/brand/green-cowrie.png";

    img.onload = () => {
      const { offscreen } = buildProcessedCowrie(img);

      const staggerCount = Math.floor(PARTICLE_COUNT * 0.65);
      const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
        spawnParticle(W, H, i < staggerCount)
      );

      const tick = () => {
        ctx.clearRect(0, 0, W, H);
        const now = Date.now();
        const ph = phaseRef.current;

        for (const p of particles) {
          if (p.respawnAt > 0) {
            if (now >= p.respawnAt) {
              const fresh = spawnParticle(W, H, false);
              Object.assign(p, fresh);
            } else {
              continue;
            }
          }

          p.y += p.vy;
          p.x += p.vx;
          p.rotation += p.rotSpeed;

          if (p.y > H + p.size) {
            p.respawnAt = now + 150 + Math.random() * 600;
            continue;
          }

          const alpha =
            ph === "revealed" ? p.alpha * 0.18 :
            ph === "rolling"  ? p.alpha * 0.45 :
            p.alpha;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.drawImage(offscreen, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      // Rain runs for 2.6s, then the logo video fades in
      t1.current = setTimeout(() => setPhase("rolling"), 2600);
      // Fallback: if video's onEnded never fires (e.g. very long video), reveal at 10s
      t2.current = setTimeout(() => {
        setPhase(prev => prev === "rolling" ? "revealed" : prev);
      }, 10000);
    };

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, []);

  function handleDismiss() {
    setPhase("dismissed");
    cancelAnimationFrame(rafRef.current);
    setTimeout(() => setMounted(false), 950);
  }

  if (!mounted) return null;

  return (
    <motion.div
      animate={phase === "dismissed" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.9, ease: easeOut }}
      className="fixed inset-0 z-[200] bg-white overflow-hidden flex items-center justify-center"
      style={{ pointerEvents: phase === "dismissed" ? "none" : "auto" }}
      aria-modal="true"
      role="dialog"
      aria-label="Fortune intro"
    >
      {/* Rain canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity:
            phase === "dismissed" ? 0 :
            phase === "revealed"  ? 0.18 :
            phase === "rolling"   ? 0.45 :
            1,
          transition: "opacity 1.1s ease",
        }}
      />

      {/* Skip button */}
      {phase !== "dismissed" && (
        <button
          onClick={handleDismiss}
          className="absolute bottom-6 right-6 font-inter text-[0.68rem] text-ink/25 hover:text-ink/55 transition-colors duration-200 z-10"
          aria-label="Skip intro"
        >
          skip
        </button>
      )}

      {/* Logo video + reveal text */}
      <AnimatePresence>
        {(phase === "rolling" || phase === "revealed") && (
          <motion.div
            key="logo-reveal"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
          >
            {/* Logo animation — bg removed per-frame via canvas pixel processing */}
            <div
              style={{
                filter: "drop-shadow(0 24px 48px rgba(11,46,31,0.18)) drop-shadow(0 6px 12px rgba(11,46,31,0.10))",
              }}
            >
              <LogoVideo
                src="/brand/fortune-logo.mp4"
                play={phase === "rolling" || phase === "revealed"}
                onEnded={() => setPhase("revealed")}
                className="w-56 md:w-72 lg:w-96 select-none"
              />
            </div>

            {/* Text + CTA — fades in after video ends */}
            <AnimatePresence>
              {phase === "revealed" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: easeOut, delay: 0.12 }}
                  className="flex flex-col items-center gap-7"
                >
                  <div>
                    <p
                      className="font-manrope font-extrabold text-forest text-balance leading-tight mb-2"
                      style={{
                        fontSize: "clamp(1.35rem, 4vw, 2.25rem)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      Something amazing is cooking.
                    </p>
                    <p
                      className="font-manrope font-bold text-gold"
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
