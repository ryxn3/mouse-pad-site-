export const SITE = {
  name: 'Pegasus',
  tagline: 'Engineered for precision. Built for victory.',
  description:
    'Pegasus crafts premium, tournament-grade gaming mousepads. Micro-woven cloth, anti-fray stitching, and a natural rubber base — engineered for precision, built for victory.',
  url: 'https://pegasus-mousepads.example.com',
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  shop: [
    { label: 'Products', href: '/products' },
    { label: 'Technology', href: '/technology' },
    { label: 'Gallery', href: '/gallery' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Warranty', href: '/warranty' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Returns', href: '/returns' },
    { label: 'Shipping', href: '/shipping' },
  ],
} as const;

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'X', href: 'https://x.com', icon: 'x' },
  { label: 'Discord', href: 'https://discord.com', icon: 'discord' },
] as const;

export const SHIPPING = {
  free_threshold: 75,
  standard: 6,
  express: 14,
} as const;
