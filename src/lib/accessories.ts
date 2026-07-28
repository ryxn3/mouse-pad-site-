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

export const ACCESSORIES: Accessory[] = [KEYCHAIN, ARM_SLEEVE];
