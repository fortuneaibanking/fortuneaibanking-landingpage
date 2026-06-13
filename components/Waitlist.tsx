"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { waitlist } from "@/content/copy";
import { fadeUp, easeOut } from "@/lib/motion";

type FormState = "idle" | "loading" | "success" | "error";

export default function Waitlist() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ email?: string; phone?: string; server?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormState("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone: phone || undefined, source: "landing-page" }),
    });

    const data = await res.json();

    if (res.ok) {
      setFormState("success");
    } else if (res.status === 422 && data.errors) {
      setErrors(data.errors);
      setFormState("idle");
    } else {
      setErrors({ server: data.message || waitlist.errors.server });
      setFormState("error");
    }
  }

  return (
    <section
      id="waitlist"
      ref={ref}
      className="section-pad bg-emerald relative overflow-hidden emerald-bg"
      aria-labelledby="waitlist-heading"
    >
      {/* Subtle adire texture on emerald */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="adire-waitlist" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,4 56,30 30,56 4,30" fill="none" stroke="white" strokeWidth="1.2" />
              <polygon points="30,14 46,30 30,46 14,30" fill="none" stroke="white" strokeWidth="0.8" />
              <circle cx="30" cy="30" r="2.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adire-waitlist)" />
        </svg>
      </div>

      <div className="container-main relative">
        <div className="max-w-[540px] mx-auto text-center">
          <motion.h2
            id="waitlist-heading"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-manrope font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em" }}
          >
            {waitlist.h2}
          </motion.h2>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-inter text-[1rem] text-white/75 mb-10 leading-relaxed"
          >
            {waitlist.body}{" "}
            <span className="text-gold font-semibold">{waitlist.accent}</span>
          </motion.p>

          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="rounded-2xl bg-white/10 border border-white/20 p-8 text-center"
            >
              {/* Gold shimmer animation */}
              <div
                className="inline-block font-manrope font-extrabold text-[1.5rem] tracking-tight mb-2"
                style={{
                  background: "linear-gradient(90deg, #ffffff 20%, #C9A227 50%, #ffffff 80%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 2.5s linear infinite",
                }}
              >
                {waitlist.success.title}
              </div>
              <p className="font-inter text-white/80 text-[0.95rem]">
                {waitlist.success.body}{" "}
                <span className="text-gold font-semibold">{waitlist.success.accent}</span>
              </p>
            </motion.div>
          ) : (
            <motion.form
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
              aria-label="Waitlist signup form"
            >
              {/* Email */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="waitlist-email" className="font-inter text-[0.8rem] font-medium text-white/70">
                  {waitlist.fields.email.label}
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={waitlist.fields.email.placeholder}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className={`w-full rounded-xl bg-white/12 border px-4 py-3 font-inter text-[0.95rem] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                    errors.email ? "border-red-400" : "border-white/20 focus:border-gold"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="font-inter text-[0.78rem] text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="waitlist-phone" className="font-inter text-[0.8rem] font-medium text-white/70">
                  {waitlist.fields.phone.label}
                </label>
                <input
                  id="waitlist-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={waitlist.fields.phone.placeholder}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  aria-invalid={!!errors.phone}
                  className={`w-full rounded-xl bg-white/12 border px-4 py-3 font-inter text-[0.95rem] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                    errors.phone ? "border-red-400" : "border-white/20 focus:border-gold"
                  }`}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="font-inter text-[0.78rem] text-red-300">
                    {errors.phone}
                  </p>
                )}
              </div>

              {errors.server && (
                <p role="alert" className="font-inter text-[0.8rem] text-red-300 text-center">
                  {errors.server}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="mt-1 w-full rounded-full bg-white text-emerald font-inter font-semibold text-[0.9375rem] py-3.5 px-7 hover:bg-gold hover:text-forest transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-gold"
              >
                {formState === "loading" ? "Reserving your spot..." : waitlist.cta}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
