import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://usefortune.ng";

export const metadata: Metadata = {
  title: "Fortune | Chat. Send. Done.",
  description:
    "Fortune is your money assistant on WhatsApp. Send money, buy airtime and data, and track your spending by chat, voice note, or photo. Built for Nigeria. Ire o!",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Fortune | Chat. Send. Done.",
    description:
      "Fortune is your money assistant on WhatsApp. Send money, buy airtime and data, and track your spending by chat, voice note, or photo. Built for Nigeria.",
    url: siteUrl,
    siteName: "Fortune",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Fortune — Chat. Send. Done. Ire o!",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune | Chat. Send. Done.",
    description:
      "Your money assistant on WhatsApp. Built for Nigeria. Ire o!",
    images: ["/og.png"],
  },
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fortune Technologies Limited",
  url: siteUrl,
  logo: `${siteUrl}/brand/fortune-logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@usefortune.ng",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Fortune?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fortune is an AI money assistant that lives inside WhatsApp. You chat with it like a person, and it helps you send money, buy airtime and data, pay bills, and understand your spending.",
      },
    },
    {
      "@type": "Question",
      name: "Is Fortune a bank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Fortune is technology. Accounts, transfers, and settlement are provided by CBN-licensed partner institutions. Fortune makes them effortless to use.",
      },
    },
    {
      "@type": "Question",
      name: "Is my money safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every transaction needs your PIN. You can set limits, freeze your account from any device in seconds, and your data is handled to NDPC standards.",
      },
    },
    {
      "@type": "Question",
      name: "When can I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fortune is opening in waves. Join the waitlist and you'll get your invite code as your cohort opens.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
