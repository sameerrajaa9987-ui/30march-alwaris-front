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
  ShieldCheck,
  Eye,
  Handshake,
  FileCheck2,
  Replace,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";
import type { Dict } from "./i18n/translations";

/**
 * Structural / non-text landing data. All human-readable copy now lives in
 * `i18n/translations.ts`; this file holds only icons, images, links, and the
 * data that is the same in every language (proper nouns, contacts, ports).
 */

export const BRAND = {
  name: "Al Waris Shipping Lines LLC",
  legalName: "Al Waris Shipping Lines LLC",
  portalPath: "/login",
};

// Client-supplied photography (files live in /public).
export const IMAGES = {
  hero: "/hero-ship-sunset.jpg",
  // Highest-resolution photo (1600x1167) — the About slot renders large, so a
  // smaller source visibly softens on high-DPI screens.
  about: "/container-yard-aerial.jpg",
  cta: "/port-sunset.jpg",
  featured: "/port-cranes-dusk.jpg", // Why-Us featured tile backdrop
  valuesBg: "/trade-routes-map.jpg", // faint backdrop on the navy values section
  gallery: [
    "/container-ship-sea.jpg",
    "/warehouse-interior.jpg",
    "/logistics-multimodal.jpg",
    "/multimodal-truck-ship.jpg",
    "/cargo-ship-worldmap.jpg",
    "/global-network.jpg",
  ],
};

// nav keys map to t.nav[key]
export const NAV_ITEMS: { key: keyof Dict["nav"]; href: string }[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "values", href: "#values" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
];

// `value` is shown verbatim; `valueKey` (for "Global") is translated.
export const STATS: {
  value?: string;
  valueKey?: keyof Dict["stats"];
  labelKey: keyof Dict["stats"];
}[] = [
  { value: "9", labelKey: "coreServices" },
  { value: "100%", labelKey: "onTrust" },
  { value: "24/7", labelKey: "operationsSupport" },
  { valueKey: "globalValue", labelKey: "reachNetwork" },
];

// Kinetic ticker — capabilities & trade lanes (kept in Latin; port names are
// universally written in English across the industry).
export const MARQUEE_ITEMS = [
  "NVOCC",
  "Freight Forwarding",
  "Project Cargo",
  "Sea Freight",
  "Warehousing",
  "Inland Transport",
  "Own Containers",
  "Custom Clearance",
  "Cross Stuffing",
  "Cross Trading",
  "Over-Dimension Cargo",
];

// Icon order matches the `items` arrays in each translation dictionary.
export const SERVICE_ICONS: LucideIcon[] = [
  Container,
  Ship,
  Boxes,
  PackageOpen,
  Truck,
  Warehouse,
  FileCheck2, // Custom Clearance
  Replace, // Cross Stuffing
  ArrowLeftRight, // Cross Trading
];

/**
 * Per-service slug + hero image. Index-aligned with `services.items` in every
 * translation dictionary and with SERVICE_ICONS above. Each entry gets its own
 * page at /services/<slug>.
 */
export const SERVICE_META: { slug: string; image: string }[] = [
  { slug: "nvocc-own-containers", image: "/container-yard-aerial.jpg" },
  { slug: "shipping-agency", image: "/port-cranes-dusk.jpg" },
  { slug: "project-cargo", image: "/logistics-multimodal.jpg" },
  { slug: "freight-forwarding", image: "/hero-ship-sunset.jpg" },
  { slug: "transportation", image: "/multimodal-truck-ship.jpg" },
  { slug: "warehousing", image: "/warehouse-interior.jpg" },
  { slug: "custom-clearance", image: "/port-sunset.jpg" },
  { slug: "cross-stuffing", image: "/container-yard-aerial.jpg" },
  { slug: "cross-trading", image: "/cargo-ship-worldmap.jpg" },
];

export const FEATURE_ICONS: LucideIcon[] = [
  Container,
  Headset,
  BadgeCheck,
  Globe2,
  HandCoins,
  Boxes,
];

export const PROCESS_ICONS: LucideIcon[] = [
  ClipboardList,
  RouteIcon,
  ShipWheel,
  CheckCircle2,
];

export const PILLAR_ICONS: LucideIcon[] = [ShieldCheck, Eye, Handshake];

// Heritage quotes stay bilingual English + Urdu in every language.
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

export type Contact = {
  name: string;
  roleKey: keyof Dict["contact"]["roles"];
  mobile?: string;
  email?: string;
};

export const LEADERSHIP: Contact[] = [
  { name: "Mohammed Ashraf Mohammed Nasir Sayyad", roleKey: "md" },
  { name: "Afrin Rashid Shaikh", roleKey: "md" },
  {
    name: "Mohammed Farooque",
    roleKey: "pricingHead",
    mobile: "+971 505384931",
    email: "ops1@alwarisshipping.com",
  },
  {
    name: "Rohit Kumar Tailor",
    roleKey: "opHead",
    mobile: "+971 566838366",
    email: "ops2@alwarisshipping.com",
  },
  { name: "Shabina Sayyed", roleKey: "pricingManager" },
  {
    name: "Arbaz Nawab Shaikh",
    roleKey: "salesManager",
    mobile: "+971 566032602",
    email: "sales.dxb1@alwarisshipping.com",
  },
];

export type Office = {
  region: string;
  company: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  mapsQuery: string;
  primary?: boolean;
};

export const OFFICES: Office[] = [
  {
    region: "United Arab Emirates",
    company: "Al Waris Shipping Lines LLC",
    addressLines: ["BMI Building, Unit #508", "Bur Dubai, UAE"],
    email: "ops1@alwarisshipping.com",
    mapsQuery: "BMI Building, Bank Street, Bur Dubai, Dubai, UAE",
    primary: true,
  },
  {
    region: "India",
    company: "Trans Logicare Private Limited / Al Waris Shipping Lines LLC",
    addressLines: [
      "Skylark, Plot No. 63, Off B 101-110",
      "Sector 11, CBD Belapur",
      "Thane, Maharashtra, India — 400614",
    ],
    mapsQuery:
      "Skylark, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614, India",
  },
  {
    region: "Malaysia",
    company: "Asia Sea Shipping and Logistic Sdn. Bhd.",
    addressLines: [
      "Suite #16-01, Level 16, Centro Mall",
      "No. 8, Jalan Batu Tiga Lama, Klang",
      "Selangor Darul Ehsan, Malaysia — 41300",
    ],
    mapsQuery:
      "Centro Mall, Jalan Batu Tiga Lama, Klang, Selangor, Malaysia 41300",
  },
];

// The primary office backs the contact/quote mailto links and the footer.
export const OFFICE = {
  agentName: OFFICES[0].company,
  addressLines: OFFICES[0].addressLines,
  email: OFFICES[0].email ?? "ops1@alwarisshipping.com",
  phone: OFFICES[0].phone ?? "+971 505384931",
  mapsQuery: OFFICES[0].mapsQuery,
};
