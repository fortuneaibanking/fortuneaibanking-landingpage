import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/copy";
import AdirePattern from "./AdirePattern";

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-forest forest-bg"
      aria-label="Site footer"
    >
      {/* Adire texture */}
      <AdirePattern
        className="absolute inset-0 w-full h-full text-white"
        opacity={0.04}
      />

      <div className="container-main relative py-16 md:py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8 mb-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="Fortune home">
              <Image
                src="/brand/fortune-logo.png"
                alt="Fortune"
                width={32}
                height={32}
                className="w-8 h-8 object-contain brightness-0 invert"
              />
              <span className="font-syne font-bold text-white text-base tracking-[-0.02em]">Fortune</span>
            </Link>
            <p className="font-inter text-[0.875rem] text-white/55 leading-relaxed max-w-[220px]">
              {footer.tagline}{" "}
              <span className="text-gold font-semibold">{footer.accent}</span>
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Fortune on X (Twitter)"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-150"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                aria-label="Fortune on Instagram"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-150"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-syne font-semibold text-white text-[0.8rem] tracking-wide uppercase mb-4">
              {footer.columns.product.heading}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footer.columns.product.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-[0.875rem] text-white/50 hover:text-white/80 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-syne font-semibold text-white text-[0.8rem] tracking-wide uppercase mb-4">
              {footer.columns.legal.heading}
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footer.columns.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-[0.875rem] text-white/50 hover:text-white/80 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-syne font-semibold text-white text-[0.8rem] tracking-wide uppercase mb-4">
              {footer.columns.contact.heading}
            </h3>
            <a
              href={`mailto:${footer.columns.contact.email}`}
              className="font-inter text-[0.875rem] text-white/50 hover:text-white/80 transition-colors duration-150 break-all"
            >
              {footer.columns.contact.email}
            </a>
          </div>
        </div>

        {/* Legal line */}
        <p className="font-inter text-[0.73rem] text-white/30 leading-relaxed">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
