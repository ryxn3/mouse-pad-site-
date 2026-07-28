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

export const ACCESSORIES: Accessory[] = [KEYCHAIN];
