import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fortune",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <p className="font-inter text-[0.75rem] font-semibold tracking-[0.14em] text-emerald uppercase mb-4">
          Legal
        </p>
        <h1 className="font-syne font-extrabold text-forest text-3xl tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="font-inter text-[0.95rem] text-ink/60 leading-relaxed mb-8">
          Our privacy policy is being prepared and will be published before Fortune launches publicly. Fortune handles your data to NDPC standards.
        </p>
        <Link
          href="/"
          className="btn-primary text-sm px-5 py-2.5"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
