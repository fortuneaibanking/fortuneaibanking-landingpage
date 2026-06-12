"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav } from "@/content/copy";
import { getPrimaryCtaLabel, getPrimaryCtaHref } from "@/config/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaLabel = getPrimaryCtaLabel();
  const ctaHref = getPrimaryCtaHref();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-emerald/10 shadow-[0_1px_0_0_rgba(0,113,61,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-main flex items-center justify-between h-16 md:h-18" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-emerald" aria-label="Fortune home">
          <Image
            src="/brand/fortune-logo.png"
            alt="Fortune"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            priority
          />
          <span className="font-syne font-bold text-forest text-lg tracking-[-0.02em]">Fortune</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-inter text-[0.9rem] font-medium text-ink/70 hover:text-emerald transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href={ctaHref} className="btn-primary text-sm px-5 py-2.5">
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded focus-visible:outline-emerald"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-0.5 bg-forest transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-forest transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-forest transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t border-emerald/10 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-main py-4 flex flex-col gap-1" role="list">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-inter text-base font-medium text-ink hover:text-emerald transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full text-center text-sm"
            >
              {ctaLabel}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
