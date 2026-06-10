import {
  Container,
  Ship,
  Boxes,
  Truck,
  Warehouse,
  PackageOpen,
  ClipboardList,
  Route as RouteIcon,
  ShipWheel,
  CheckCircle2,
  BadgeCheck,
  Headset,
  Globe2,
  HandCoins,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for all public landing-page content.
 * The client can edit copy, swap images, or update contacts here
 * without touching any component markup.
 *
 * Images use Unsplash CDN URLs as placeholders — replace `src` values
 * with the company's own photography (drop files in /public and use
 * "/your-image.jpg") whenever final assets are ready.
 */

export const BRAND = {
  name: "Al Waris Shipping Lines",
  legalName: "Al Waris Shipping Lines LLC",
  tagline: "Moving Trust Across Borders",
  shortDescription:
    "Global shipping & logistics built on integrity, transparency and reliability.",
  portalPath: "/login",
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2070&q=80",
  about:
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
  cta: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2070&q=80",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Values", href: "#values" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: "6+", label: "Core Services" },
  { value: "100%", label: "On Trust" },
  { value: "24/7", label: "Operations Support" },
  { value: "Global", label: "Reach & Network" },
];

// Kinetic ticker — capabilities & trade lanes that scroll across the page.
export const MARQUEE_ITEMS = [
  "NVOCC",
  "Freight Forwarding",
  "Project Cargo",
  "Sea Freight",
  "3PL Warehousing",
  "Inland Transport",
  "Dubai → Nhava Sheva",
  "Jebel Ali → Karachi",
  "Bur Dubai → Mundra",
  "Own Containers",
  "Customs & Documentation",
  "Over-Dimension Cargo",
];

export type Service = {
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: Container,
    title: "NVOCC — Own Containers",
    shortTitle: "NVOCC Own Containers",
    description:
      "Non-Vessel Operating Common Carrier services with our own container fleet, giving you greater control, competitive rates and dependable space.",
  },
  {
    icon: Ship,
    title: "NVOCC — Shipping Agency",
    shortTitle: "Shipping Agency",
    description:
      "Full shipping-agency representation — bookings, documentation and port coordination handled with precision and accountability.",
  },
  {
    icon: Boxes,
    title: "Over Dimension / Project Cargo",
    shortTitle: "Project Cargo",
    description:
      "Specialised handling of heavy-lift, out-of-gauge and project cargo, engineered and executed with the highest level of care.",
  },
  {
    icon: PackageOpen,
    title: "Freight Forwarding",
    shortTitle: "Freight Forwarding",
    description:
      "End-to-end sea and multimodal freight forwarding, connecting your business across borders with clear communication at every step.",
  },
  {
    icon: Truck,
    title: "Transportation",
    shortTitle: "Transportation",
    description:
      "Reliable inland transportation and last-mile delivery, ensuring every consignment moves on time and arrives in perfect condition.",
  },
  {
    icon: Warehouse,
    title: "3PL Warehousing",
    shortTitle: "3PL Warehousing",
    description:
      "Third-party logistics and warehousing solutions — storage, inventory and distribution managed with responsibility and transparency.",
  },
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Honest differentiators drawn directly from the company's own values —
// no fabricated certifications or testimonials.
export const FEATURES: Feature[] = [
  {
    icon: Container,
    title: "Own Container Fleet",
    description:
      "As an NVOCC with our own containers, we offer dependable space and competitive, transparent rates.",
  },
  {
    icon: Headset,
    title: "24/7 Operations Support",
    description:
      "A dedicated operations team you can call directly — every consignment tracked with care and accountability.",
  },
  {
    icon: BadgeCheck,
    title: "Integrity in Every Deal",
    description:
      "Honest dealings and clear documentation. We do exactly what we commit to, every single time.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "From Dubai to ports worldwide, we connect your business across borders through a trusted network.",
  },
  {
    icon: HandCoins,
    title: "Transparent Pricing",
    description:
      "Clear, fair quotes with no hidden surprises — a dedicated pricing desk ready to respond fast.",
  },
  {
    icon: Boxes,
    title: "Project Cargo Expertise",
    description:
      "Heavy-lift and over-dimension cargo engineered and executed with precision and full responsibility.",
  },
];

export type ProcessStep = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Share Your Requirement",
    description:
      "Tell us your cargo, route and timeline. Our pricing desk responds with a clear, competitive quote.",
  },
  {
    icon: RouteIcon,
    step: "02",
    title: "We Plan the Route",
    description:
      "We design the optimal sea and multimodal route, handle bookings and prepare all documentation.",
  },
  {
    icon: ShipWheel,
    step: "03",
    title: "Cargo in Motion",
    description:
      "Your shipment moves under our watch — coordinated at every port with precision and reliability.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Delivered with Trust",
    description:
      "Safe, on-time delivery and clear final reconciliation — confidence honoured from origin to destination.",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What shipping services do you provide?",
    a: "We offer NVOCC services with our own containers, shipping-agency representation, freight forwarding, over-dimension and project cargo handling, inland transportation, and 3PL warehousing — end to end under one roof.",
  },
  {
    q: "How do I get a quote?",
    a: "Use the Instant Quote request on this page or contact our pricing desk directly. Share your cargo type, origin, destination and preferred timeline, and we'll respond with a clear, competitive rate as quickly as possible.",
  },
  {
    q: "Can you handle over-dimension or heavy project cargo?",
    a: "Yes. Out-of-gauge, heavy-lift and project cargo is one of our specialities — each consignment is planned and executed with engineering precision and the highest level of care.",
  },
  {
    q: "Where are you based and which regions do you cover?",
    a: "Our head office is in Bur Dubai, UAE, and through our trusted agency network we connect businesses to ports across the globe.",
  },
  {
    q: "How do you ensure my cargo is handled reliably?",
    a: "Every shipment is managed by a dedicated operations team with clear communication, careful documentation and full accountability — because every consignment represents confidence placed in us.",
  },
];

export const VALUE_PILLARS = [
  {
    title: "Integrity",
    titleUr: "دیانت",
    description:
      "Honesty in every dealing. We do what we say and stand behind every commitment we make.",
  },
  {
    title: "Transparency",
    titleUr: "شفافیت",
    description:
      "Clear communication and open processes, so you always know exactly where your cargo stands.",
  },
  {
    title: "Trust",
    titleUr: "اعتماد",
    description:
      "Every shipment represents confidence placed in us — we honour it with dedication and accountability.",
  },
];

export type Quote = {
  en: string;
  ur: string;
  attributionEn: string;
  attributionUr: string;
};

export const QUOTES: Quote[] = [
  {
    en: "Purify your intentions, serve with humility, and let every action reflect sincerity — for this is the path that leads closer to the Creator.",
    ur: "اپنی نیت کو پاک رکھو، عاجزی کے ساتھ خدمت کرو، اور ہر عمل میں اخلاص پیدا کرو—یہی راستہ انسان کو خالق کے قریب لے جاتا ہے۔",
    attributionEn: "— Haji Waris Ali Shah",
    attributionUr: "— حضرت حاجی وارث علی شاہؒ",
  },
  {
    en: "Integrity in dealings, transparency in actions, and trust in relationships are the true foundations of lasting success.",
    ur: "معاملات میں دیانت، عمل میں شفافیت، اور تعلقات میں اعتماد ہی پائیدار کامیابی کی اصل بنیاد ہیں۔",
    attributionEn: "— Inspired by the teachings of Haji Waris Ali Shah",
    attributionUr: "— تعلیماتِ حاجی وارث علی شاہؒ سے ماخوذ",
  },
];

export const ABOUT_PARAGRAPHS = [
  "At Al Waris Shipping Lines LLC, we believe that true success in the shipping and logistics industry is not measured solely by the movement of cargo, but by the trust we build with every shipment we handle. Our values are deeply inspired by the timeless teachings of Haji Waris Ali Shah, a symbol of humility, sincerity and unwavering faith, whose life emphasised honesty, simplicity and service to humanity.",
  "Guided by these principles, we are committed to conducting our business with integrity, transparency and respect. In an industry where time, precision and reliability are critical, we ensure that every consignment is managed with the highest level of care, responsibility and professionalism.",
  "We strive to build lasting relationships based on trust, fairness and clear communication. Every shipment entrusted to us is not just cargo — it represents confidence placed in us, and we honour that trust with dedication and accountability.",
  "Inspired by these enduring values, we believe that sincere intentions, ethical conduct and service to others are the true foundations of success. With humility in our approach and excellence in execution, we continue to move forward — connecting businesses across borders, supporting global trade and contributing positively to society.",
];

export type Contact = {
  name: string;
  role: string;
  mobile?: string;
  email?: string;
};

export const LEADERSHIP: Contact[] = [
  {
    name: "Mohammed Ashraf Mohammed Nasir Sayyad",
    role: "Managing Director",
  },
  {
    name: "Afrin Rashid Shaikh",
    role: "Managing Director",
  },
  {
    name: "Mohammed Farooque",
    role: "Pricing Head",
    mobile: "+971 505384931",
    email: "ops1@alwarisshipping.com",
  },
  {
    name: "Rohit Kumar Tailor",
    role: "Operation Head",
    mobile: "+971 566838366",
    email: "ops2@alwarisshipping.com",
  },
  {
    name: "Shabina Sayyed",
    role: "Branch Manager",
  },
  {
    name: "Arbaz Nawab Shaikh",
    role: "Sales Manager",
    mobile: "+971 566032602",
    email: "sales.dxb1@alwarisshipping.com",
  },
];

export const OFFICE = {
  agentName: "Trans Vision Sea Shipping Lines Agent LLC",
  addressLines: [
    "B.M.I. Building, Bank Street, Office No. 508, 5th Floor",
    "Khaleed Bin Waleed Street, D79",
    "Al Mankhool — 3170233, Bur Dubai, UAE",
  ],
  email: "ops1@alwarisshipping.com",
  phone: "+971 505384931",
  mapsQuery:
    "B.M.I. Building, Khalid Bin Al Waleed Street, Bur Dubai, Dubai, UAE",
};
