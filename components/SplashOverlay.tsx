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
  alpha: number;
  respawnAt: number; // ms timestamp; 0 = currently active
}

const PARTICLE_COUNT = 68;
const PROC_SIZE = 512; // internal resolution for white-bg removal

// Strip white/near-white pixels from the image at pixel level.
// Returns a processed canvas and its dataURL for use as <img src>.
function buildProcessedCowrie(img: HTMLImageElement): {
  offscreen: HTMLCanvasElement;
  dataUrl: string;
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
    // Fully transparent: near-pure white (high value, low saturation)
    if (r >= 238 && g >= 238 && b >= 238) {
      d[i + 3] = 0;
    } else if (r > 195 && g > 195 && b > 195) {
      // Soft anti-aliased edge: partial alpha based on how white it is
      const whiteness = (r + g + b) / 3;
      d[i + 3] = Math.round(((255 - whiteness) / 60) * 255);
    }
  }

  ctx.putImageData(id, 0, 0);
  return { offscreen: off, dataUrl: off.toDataURL("image/png") };
}

function spawnParticle(W: number, H: number, stagger: boolean): Particle {
  return {
    x: Math.random() * W,
    // stagger=true: spread initial Y across the full column so rain looks full on load
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
  const [heroCowrieSrc, setHeroCowrieSrc] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<Phase>("raining");
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mirror state into a ref so the canvas loop can read it without stale closures
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    // Reduced-motion: skip straight to reveal
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("revealed");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retina-aware canvas sizing
    const DPR = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.scale(DPR, DPR);

    const img = new window.Image();
    img.src = "/brand/green-cowrie.png";

    img.onload = () => {
      const { offscreen, dataUrl } = buildProcessedCowrie(img);
      setHeroCowrieSrc(dataUrl);

      // 65% of particles staggered across the vertical column so rain looks
      // dense from frame 1, not sparse until the first batch arrives.
      const staggerCount = Math.floor(PARTICLE_COUNT * 0.65);
      const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
        spawnParticle(W, H, i < staggerCount)
      );

      const tick = () => {
        ctx.clearRect(0, 0, W, H);
        const now = Date.now();
        const ph = phaseRef.current;

        for (const p of particles) {
          // Waiting to respawn
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

          // Off the bottom — schedule respawn
          if (p.y > H + p.size) {
            p.respawnAt = now + 150 + Math.random() * 600;
            continue;
          }

          // Dim rain while hero rolls; fade to ghost after text reveals
          const alpha =
            ph === "revealed" ? p.alpha * 0.18 :
            ph === "rolling"  ? p.alpha * 0.55 :
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

      // Rain runs for 2.6s, then hero rolls while rain continues
      t1.current = setTimeout(() => setPhase("rolling"), 2600);
      // Roll animation is 1.6s; reveal text at ~4.2s
      t2.current = setTimeout(() => setPhase("revealed"), 4200);
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
      {/* DPR-sharp canvas — processed images have no white background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity:
            phase === "dismissed" ? 0 :
            phase === "revealed"  ? 0.18 :
            phase === "rolling"   ? 0.55 :
            1,
          transition: "opacity 1.1s ease",
        }}
      />

      {/* Skip — visible in all phases except dismissed */}
      {phase !== "dismissed" && (
        <button
          onClick={handleDismiss}
          className="absolute bottom-6 right-6 font-inter text-[0.68rem] text-ink/25 hover:text-ink/55 transition-colors duration-200 z-10"
          aria-label="Skip intro"
        >
          skip
        </button>
      )}

      {/* Hero cowrie + reveal — appears once rolling starts */}
      <AnimatePresence>
        {(phase === "rolling" || phase === "revealed") && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
            style={{ perspective: "900px" }}
          >
            {/* Outer wrapper drives the y + scale (rolling toward viewer) */}
            <motion.div
              initial={{ y: "46vh", scale: 0.06 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1.6, ease: easeOut }}
            >
              {/* Inner wrapper drives the rotateX (wheel spin = rolling) */}
              {heroCowrieSrc && (
                <motion.img
                  src={heroCowrieSrc}
                  alt="Green and gold cowrie shell — Fortune"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: 360 }}
                  transition={{ duration: 1.6, ease: easeOut }}
                  className="w-36 md:w-52 lg:w-60 select-none"
                  draggable={false}
                  style={{
                    transformStyle: "preserve-3d",
                    filter:
                      "drop-shadow(0 28px 56px rgba(11,46,31,0.28)) drop-shadow(0 8px 16px rgba(11,46,31,0.14))",
                  }}
                />
              )}
            </motion.div>

            {/* Text + CTA — waits for rolling to finish */}
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
