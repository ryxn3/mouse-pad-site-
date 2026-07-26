/** Surface glide profile of a mousepad. */
export type SurfaceId = 'speed' | 'balance' | 'control';

/** Available physical footprints. */
export type SizeId = 'm' | 'l';

export interface SurfaceVariant {
  id: SurfaceId;
  name: string;
  tagline: string;
  description: string;
  /** Hex accent used to theme UI for this surface. */
  accent: string;
  /** Relative performance ratings, 0–100, used in the comparison table. */
  ratings: {
    glide: number;
    stoppingPower: number;
    precision: number;
    tracking: number;
  };
  bestGames: string;
}

export interface SizeVariant {
  id: SizeId;
  name: string;
  /** Human readable dimensions. */
  dimensions: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  weightG: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  handle: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  surface: SurfaceId;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  /** 'macro' | 'render' | 'setup' — controls layout emphasis. */
  kind: 'macro' | 'render' | 'setup';
}

/** A configured, purchasable line item. */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  surface: SurfaceId;
  surfaceName: string;
  size: SizeId;
  sizeName: string;
  dimensions: string;
  price: number;
  quantity: number;
  accent: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    /** Weights added toward each surface when chosen. */
    weight: Record<SurfaceId, number>;
  }[];
}
