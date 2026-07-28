/** Surface glide profile of a mousepad. */
export type SurfaceId = 'speed' | 'balance' | 'control';

/** Cloth colourway of a mousepad. */
export type ColorId = 'black' | 'red' | 'royal' | 'purple';

export interface ColorVariant {
  id: ColorId;
  name: string;
  /** Swatch colour shown in the UI. */
  swatch: string;
  /** Base colour used to tint the cloth in the 3D viewer (brighter to read
   *  through the dark weave texture). */
  tint: string;
}

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

export type ProductId = 'pro' | 'prism';

export interface Product {
  id: ProductId;
  name: string;
  subtitle: string;
  tagline: string;
  /** Price of the Medium size; other sizes add their own increment. */
  basePrice: number;
  /** Texture family used on the 3D pad: 'cloth' (woven) or 'pattern' (graphic). */
  texturePrefix: 'cloth' | 'pattern';
  /** Patterned pads map a single graphic; woven pads tile a weave. */
  patterned: boolean;
  /** Whether the product is currently pre-order only. */
  preorder: boolean;
  /** Extra cost over the base woven line. */
  priceDelta: number;
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
  /** Optional real photo (absolute path). Falls back to a procedural visual. */
  image?: string;
}

/** A configured, purchasable line item (mousepad or accessory). */
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  preorder: boolean;
  /** Human-readable variant line shown in cart & checkout. */
  description: string;
  /** Swatch colour used for the line-item thumbnail. */
  colorSwatch: string;
  price: number;
  quantity: number;
  accent: string;
  // Mousepad-only attributes (absent for accessories).
  surface?: SurfaceId;
  surfaceName?: string;
  size?: SizeId;
  sizeName?: string;
  dimensions?: string;
  color?: ColorId;
  colorName?: string;
}

export interface Accessory {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: number;
  preorder: boolean;
  specs: Specification[];
  highlights: string[];
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
