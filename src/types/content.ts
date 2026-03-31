import type { ZodObject, ZodRawShape } from 'zod';

/* ── Content data shapes ──────────────────────────── */

export interface HeroContent {
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface StoreInfoContent {
  shopName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface AboutContent {
  storyTitle: string;
  storyText: string;
}

export interface AboutValue {
  id: number;
  icon: string;
  title: string;
  text: string;
}

export interface Category {
  id: number;
  icon: string;
  label: string;
  color: string;
}

export interface Highlight {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface ThemeContent {
  colorPrimary: string;
  colorPrimaryDark: string;
  colorPrimaryLight: string;
  colorSecondary: string;
  colorAccent: string;
  colorText: string;
  colorTextLight: string;
  colorBg: string;
  colorBgAlt: string;
  colorBorder: string;
  heroGradientStart: string;
  heroGradientMid: string;
  heroGradientEnd: string;
  headerGradientStart: string;
  headerGradientEnd: string;
  footerBg: string;
}

export interface ContentMap {
  hero: HeroContent;
  storeInfo: StoreInfoContent;
  about: AboutContent;
  aboutValues: AboutValue[];
  categories: Category[];
  highlights: Highlight[];
  testimonials: Testimonial[];
  products: Product[];
  theme: ThemeContent;
}

export type ContentKey = keyof ContentMap;

/* ── Admin section config ─────────────────────────── */

export interface SectionField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'icon' | 'color';
}

export interface SectionConfig {
  key: ContentKey;
  path: string;
  label: string;
  editor: 'object' | 'list';
  fields: SectionField[];
  schema?: ZodObject<ZodRawShape>;
  itemSchema?: ZodObject<ZodRawShape>;
}
