export const nav = {
  links: [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export const hero = {
  eyebrow: "YOUR MONEY, ONE CHAT AWAY",
  h1: "Chat. Send. Done.",
  accent: "Ire o!",
  subhead:
    "Fortune is your personal money assistant living inside WhatsApp. Send money, buy airtime, pay bills, and track your spending the same way you talk to your people. In English or Pidgin, by text, voice note, or a photo.",
  primaryCta: "Join the Waitlist",
  secondaryCta: "See how it works",
  trustStrip: [
    "Built in Nigeria",
    "Bank-grade security",
    "Powered by licensed partners",
  ],
  chat: [
    { role: "user" as const, text: "Send 5k to Tunde GTB 0123456789" },
    {
      role: "fortune" as const,
      text: "Sending N5,000 to TUNDE ADEYEMI (GTBank). Confirm?",
    },
    { role: "user" as const, text: "Yes" },
    { role: "fortune" as const, text: "Done! N5,000 sent. Ire o!", gold: true },
  ],
} as const;

export const howItWorks = {
  h2: "Three steps. That's all.",
  steps: [
    {
      number: "1",
      title: "Say hello.",
      body: "Message Fortune on WhatsApp and set up your account in under three minutes.",
    },
    {
      number: "2",
      title: "Talk normally.",
      body: "Type it, say it, or snap it. Fortune understands English and Pidgin, voice notes, and photos of account numbers.",
    },
    {
      number: "3",
      title: "Confirm and go.",
      body: "Fortune shows you exactly who gets what. You confirm with your PIN. Done.",
    },
  ],
} as const;

export const features = [
  {
    label: "TRANSFERS",
    h2: "Snap. Confirm. Sent.",
    body: "Take a photo of any account number, or just type \"send 5k to Tunde.\" Fortune reads it, confirms the name, and moves the money. No app-hopping, no copying digits.",
    mockup: [
      { role: "user" as const, text: "[Photo of account number]" },
      { role: "fortune" as const, text: "Got it! Sending to NGOZI OKAFOR, Zenith Bank. Amount?" },
      { role: "user" as const, text: "10k" },
      { role: "fortune" as const, text: "N10,000 to NGOZI OKAFOR (Zenith). Confirm?", gold: true },
    ],
  },
  {
    label: "AIRTIME AND DATA",
    h2: "Light. Data. Sorted.",
    body: "Airtime and data for every network, bought in one message. Tell Fortune what you need and it handles the rest.",
    mockup: [
      { role: "user" as const, text: "Buy me 2GB data MTN" },
      { role: "fortune" as const, text: "2GB MTN data for your number. N600. Confirm?" },
      { role: "user" as const, text: "Yes" },
      { role: "fortune" as const, text: "Done! Data loading now. Ire o!", gold: true },
    ],
  },
  {
    label: "INSIGHTS",
    h2: "Ask. Know. Grow.",
    body: "\"How much did I spend on food this month?\" Fortune remembers everything so you don't have to. Your money, finally making sense.",
    mockup: [
      { role: "user" as const, text: "How much did I spend on food this month?" },
      { role: "fortune" as const, text: "Food this month: N18,400 across 12 transactions. Biggest spend: Chicken Republic (N3,200)." },
      { role: "user" as const, text: "Wow" },
      { role: "fortune" as const, text: "Want to set a food budget for next month?", gold: true },
    ],
  },
] as const;

export const security = {
  h2: "Locked. Limited. Yours.",
  cards: [
    {
      title: "Your PIN, every time.",
      body: "Every transaction is protected by a PIN only you know. Set your own limits for when it's required.",
    },
    {
      title: "Freeze in seconds.",
      body: "Lost your phone? Freeze your Fortune account instantly from any device, and recover it safely with identity verification.",
    },
    {
      title: "Private by design.",
      body: "Your data is protected to NDPC standards and never sold. Conversations stay between you and Fortune.",
    },
  ],
  footnote:
    "Accounts and transfers are provided through CBN-licensed partner institutions. Fortune is the technology layer.",
} as const;

export const everydayLife = {
  h2: "Made for real Naija life.",
  cards: [
    { title: "Market runs", body: "Pay Mama Ngozi without counting cash." },
    { title: "Friends and family", body: "Split the bill before the plates are cleared." },
    { title: "Hustle and business", body: "Get paid by anyone with a phone." },
    { title: "Light and subs", body: "Top up power and data before they finish." },
  ],
} as const;

export const faq = {
  h2: "Questions? Answered.",
  items: [
    {
      q: "What is Fortune?",
      a: "Fortune is an AI money assistant that lives inside WhatsApp. You chat with it like a person, and it helps you send money, buy airtime and data, pay bills, and understand your spending.",
    },
    {
      q: "Is Fortune a bank?",
      a: "No. Fortune is technology. Accounts, transfers, and settlement are provided by CBN-licensed partner institutions. Fortune makes them effortless to use.",
    },
    {
      q: "Is my money safe?",
      a: "Every transaction needs your PIN. You can set limits, freeze your account from any device in seconds, and your data is handled to NDPC standards.",
    },
    {
      q: "What languages does Fortune speak?",
      a: "English and Nigerian Pidgin at launch, with voice notes fully supported. More languages are coming.",
    },
    {
      q: "What does it cost?",
      a: "Joining is free. Airtime, data, and bills are charged at normal rates. Transfer pricing will be published before public launch.",
    },
    {
      q: "When can I use it?",
      a: "Fortune is opening in waves. Join the waitlist and you'll get your invite code as your cohort opens.",
    },
  ],
} as const;

export const waitlist = {
  h2: "Your fortune is loading.",
  body: "Join the waitlist and be first in line when your cohort opens.",
  accent: "Ire o!",
  cta: "Reserve my spot",
  success: {
    title: "You're in!",
    body: "Watch your inbox.",
    accent: "Ire o!",
  },
  errors: {
    email: "That email no correct o. Check am again.",
    phone: "Enter a valid Nigerian number, e.g. 08012345678",
    server: "Something went wrong. Try again in a moment.",
  },
  fields: {
    email: { label: "Email address", placeholder: "you@example.com" },
    phone: { label: "WhatsApp number (optional)", placeholder: "08012345678" },
  },
} as const;

export const footer = {
  tagline: "Chat. Send. Done.",
  accent: "Ire o!",
  columns: {
    product: {
      heading: "Product",
      links: [
        { label: "How it Works", href: "#how-it-works" },
        { label: "Features", href: "#features" },
        { label: "Security", href: "#security" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    legal: {
      heading: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    contact: {
      heading: "Contact",
      email: "hello@usefortune.ng",
    },
  },
  legal:
    "© 2026 Fortune Technologies Limited. Fortune is a technology service. Financial services are provided by licensed partner institutions.",
} as const;
