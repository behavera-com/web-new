import {
  DoorOpen,
  UserX,
  TrendingDown,
  Target,
  TrendingUp,
  Star,
  Layers,
  BarChart3,
  Plug,
  ShieldCheck,
  User,
  Users,
  Briefcase,
  Crown,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  key: string;
  href: string;
  Icon: LucideIcon;
  badge?: string;
};

export const productItems: NavItem[] = [
  { key: "howItWorks", href: "/jak-to-funguje", Icon: Layers },
  { key: "features", href: "/#dashboard", Icon: BarChart3 },
  { key: "integrations", href: "/#integrations", Icon: Plug },
  { key: "security", href: "/bezpecnost", Icon: ShieldCheck },
  { key: "echoPulse", href: "/echo-pulse", Icon: Star, badge: "Zdarma" },
];

export const problemItems: NavItem[] = [
  { key: "turnover", href: "/problemy/fluktuace", Icon: DoorOpen },
  { key: "managers", href: "/problemy/manazeri", Icon: UserX },
  { key: "performance", href: "/problemy/vykon-tymu", Icon: TrendingDown },
  { key: "hiring", href: "/problemy/chybne-nabory", Icon: Target },
  { key: "growth", href: "/problemy/rust-firmy", Icon: TrendingUp },
  { key: "newCeo", href: "/problemy/novy-ceo", Icon: Star },
];

export const roleItems: NavItem[] = [
  { key: "ceo", href: "/pro/ceo", Icon: Crown },
  { key: "hr", href: "/pro/hr", Icon: Briefcase },
  { key: "manager", href: "/pro/manazer", Icon: Users },
  { key: "teamLead", href: "/pro/team-lead", Icon: User },
];

export const primaryLinks = [
  { key: "caseStudies", href: "/pripadovky" },
  { key: "pricing", href: "/cenik" },
] as const;

export const APP_URL = "https://app.behavera.com";
export const APP_TRY_URL = "https://app.behavera.com/echo-pulse/try";
export const PHONE = "+420 605 839 456";
export const PHONE_TEL = "tel:+420605839456";
