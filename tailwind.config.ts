import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: "#00713D" },
        forest: { DEFAULT: "#0B2E1F" },
        gold: { DEFAULT: "#C9A227" },
        mist: { DEFAULT: "#EAF4EF" },
        ink: { DEFAULT: "#1A1A1A" },
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        content: "1200px",
        prose: "640px",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,113,61,0.06) 0%, transparent 70%)",
      },
      boxShadow: {
        phone: "0 32px 64px -12px rgba(11,46,31,0.25), 0 8px 24px -4px rgba(11,46,31,0.12)",
        "phone-sm": "0 16px 40px -8px rgba(11,46,31,0.20)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
