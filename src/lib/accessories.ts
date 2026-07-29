import type { Accessory } from '@/types';

export const KEYCHAIN: Accessory = {
  id: 'sling-keychain',
  name: 'Sling Keychain',
  subtitle: 'Woven strap keychain',
  tagline: 'Carry the mark.',
  description: 'Woven nylon · matte-black clasp',
  price: 19,
  preorder: true,
  highlights: [
    'Jacquard-woven PEGARIS wordmark',
    'Matte-black snap-hook clasp',
    'Leather-reinforced head',
    'Signature crimson centre stripe',
  ],
  specs: [
    { label: 'Strap', value: 'Woven nylon webbing' },
    { label: 'Width', value: '25 mm' },
    { label: 'Length', value: '130 mm' },
    { label: 'Clasp', value: 'Matte-black alloy snap hook' },
    { label: 'Ring', value: 'Split ring, blackened steel' },
    { label: 'Patch', value: 'Leather-reinforced head' },
    { label: 'Warranty', value: '1 year' },
  ],
};

export const ARM_SLEEVE: Accessory = {
  id: 'arm-sleeve',
  name: 'Arm Sleeve',
  subtitle: 'Compression gaming sleeve',
  tagline: 'Smooth, consistent glide.',
  description: 'Compression knit · tonal graphics',
  price: 24,
  preorder: true,
  highlights: [
    'Four-way-stretch compression knit',
    'Low-friction forearm panel',
    'Tonal PEGARIS wordmark & mark',
    'Anti-slip silicone cuff',
  ],
  specs: [
    { label: 'Material', value: 'Nylon / spandex compression knit' },
    { label: 'Fit', value: 'Compression, four-way stretch' },
    { label: 'Panel', value: 'Low-friction forearm zone' },
    { label: 'Cuffs', value: 'Anti-slip silicone hems' },
    { label: 'Graphics', value: 'Tonal wordmark, mark & speed lines' },
    { label: 'Sizes', value: 'S · M · L · XL' },
    { label: 'Warranty', value: '1 year' },
  ],
};

export const WRIST_REST: Accessory = {
  id: 'wrist-rest',
  name: 'Wrist Rest',
  subtitle: 'Memory-foam wrist rest',
  tagline: 'Sized to your board.',
  description: 'Memory foam · woven top',
  price: 29,
  preorder: true,
  sizes: [
    { id: 'full', label: '100%', sublabel: 'Full-size', widthMm: 440, price: 29 },
    { id: 'tkl', label: '80%', sublabel: 'TKL', widthMm: 360, price: 26 },
    { id: '75', label: '75%', sublabel: 'Compact', widthMm: 330, price: 24 },
    { id: '65', label: '65%', sublabel: 'Mini', widthMm: 300, price: 22 },
  ],
  highlights: [
    'Slow-rebound memory-foam core',
    'Micro-woven, water-resistant top',
    'Anti-slip rubber base',
    'Sized to match your keyboard',
  ],
  specs: [
    { label: 'Core', value: 'Slow-rebound memory foam' },
    { label: 'Top', value: 'Micro-woven cloth' },
    { label: 'Base', value: 'Natural rubber, anti-slip' },
    { label: 'Depth', value: '90 mm' },
    { label: 'Height', value: '22 mm' },
    { label: 'Edge', value: 'Anti-fray stitched border' },
    { label: 'Warranty', value: '1 year' },
  ],
};

export const ACCESSORIES: Accessory[] = [KEYCHAIN, ARM_SLEEVE, WRIST_REST];

