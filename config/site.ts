export type SiteMode = "waitlist" | "live";

const config = {
  mode: "waitlist" as SiteMode,
  whatsappNumber: "2349000000000",
  prefillText: "Hi Fortune",
  siteUrl: "https://usefortune.ng",
  email: "hello@usefortune.ng",
  twitterHandle: "@usefortune_ng",
  instagramHandle: "@usefortune_ng",
};

export function getWhatsAppUrl(): string {
  const encoded = encodeURIComponent(config.prefillText);
  return `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
}

export function getPrimaryCtaHref(): string {
  if (config.mode === "live") return getWhatsAppUrl();
  return "#waitlist";
}

export function getPrimaryCtaLabel(): string {
  if (config.mode === "live") return "Chat with Fortune";
  return "Join the Waitlist";
}

export default config;
