import type {
  SurfaceVariant,
  SizeVariant,
  Product,
  Feature,
  Review,
  FaqItem,
  GalleryItem,
  Specification,
  QuizQuestion,
  SurfaceId,
  SizeId,
} from '@/types';

export const PRODUCT: Product = {
  id: 'pegaris-pro',
  name: 'Pegaris Pro',
  subtitle: 'Tournament-grade cloth mousepad',
  basePrice: 39,
};

export const SURFACES: Record<SurfaceId, SurfaceVariant> = {
  speed: {
    id: 'speed',
    name: 'Speed',
    tagline: 'Fast glide. Low friction.',
    description:
      'A slick micro-weave engineered for effortless, low-resistance movement. Built for high-sensitivity FPS play where fast flicks and rapid repositioning decide the round.',
    accent: '#B00020',
    ratings: { glide: 95, stoppingPower: 45, precision: 80, tracking: 92 },
    bestGames: 'CS2 · Apex Legends · Valorant',
  },
  balance: {
    id: 'balance',
    name: 'Balance',
    tagline: 'Glide and control, in harmony.',
    description:
      'The all-round choice. A refined weave that pairs smooth glide with confident stopping power — versatile enough for any title, at any sensitivity.',
    accent: '#f5f5f5',
    ratings: { glide: 75, stoppingPower: 72, precision: 88, tracking: 90 },
    bestGames: 'Overwatch 2 · Rocket League',
  },
  control: {
    id: 'control',
    name: 'Control',
    tagline: 'Higher stopping power. Maximum precision.',
    description:
      'A denser, tighter surface that grips on demand. Made for low-sensitivity, tactical play where micro-adjustments and pinpoint precision win the duel.',
    accent: '#2b6fff',
    ratings: { glide: 55, stoppingPower: 95, precision: 96, tracking: 88 },
    bestGames: 'CS2 · Rainbow Six · Tactical FPS',
  },
};

export const SURFACE_LIST: SurfaceVariant[] = [
  SURFACES.speed,
  SURFACES.balance,
  SURFACES.control,
];

export const SIZES: Record<SizeId, SizeVariant> = {
  m: {
    id: 'm',
    name: 'Medium',
    dimensions: '500 × 450 mm',
    widthMm: 500,
    heightMm: 450,
    thicknessMm: 4,
    weightG: 320,
    price: 39,
  },
  l: {
    id: 'l',
    name: 'Large',
    dimensions: '560 × 510 mm',
    widthMm: 560,
    heightMm: 510,
    thicknessMm: 4,
    weightG: 390,
    price: 49,
  },
};

export const SIZE_LIST: SizeVariant[] = [SIZES.m, SIZES.l];

/** Compute the price for a given size (surface does not affect price). */
export function priceFor(size: SizeId): number {
  return SIZES[size].price;
}

export function specsFor(surface: SurfaceId, size: SizeId): Specification[] {
  const s = SIZES[size];
  const surf = SURFACES[surface];
  return [
    { label: 'Material', value: 'Micro-woven cloth' },
    { label: 'Surface', value: `${surf.name} weave` },
    { label: 'Thickness', value: `${s.thicknessMm} mm` },
    { label: 'Dimensions', value: s.dimensions },
    { label: 'Weight', value: `${s.weightG} g` },
    { label: 'Base', value: 'Natural rubber, anti-slip' },
    { label: 'Edge', value: 'Anti-fray stitched border' },
    { label: 'Sensor', value: 'Optical & laser optimized' },
    { label: 'Water resistant', value: 'Yes — spill-repellent coating' },
    { label: 'Warranty', value: '2 years' },
  ];
}

export const FEATURES: Feature[] = [
  {
    title: 'Micro-Woven Cloth',
    description:
      'A precision textile with a consistent weave for uniform tracking across the entire surface.',
    icon: 'grid',
  },
  {
    title: 'Tournament Surface',
    description:
      'Tuned to competitive standards and trusted for high-stakes, high-speed play.',
    icon: 'trophy',
  },
  {
    title: 'Anti-Fray Stitching',
    description:
      'A hand-finished border that resists wear, peeling and fraying for years of use.',
    icon: 'scissors',
  },
  {
    title: 'Natural Rubber Base',
    description:
      'A dense, textured base that stays planted through the most aggressive movements.',
    icon: 'layers',
  },
  {
    title: 'Water Resistant',
    description:
      'A spill-repellent coating shrugs off drinks and sweat, and wipes clean in seconds.',
    icon: 'droplets',
  },
  {
    title: 'Optical Optimized',
    description:
      'Surface contrast calibrated for flawless optical sensor tracking at any DPI.',
    icon: 'scan',
  },
  {
    title: 'Laser Optimized',
    description:
      'Equally at home with laser sensors — no spin-outs, no acceleration surprises.',
    icon: 'crosshair',
  },
  {
    title: 'Precision Tracking',
    description:
      'A flat, stable plane that keeps your aim honest from edge to edge.',
    icon: 'target',
  },
  {
    title: 'Smooth Glide',
    description:
      'A refined finish that lets your mouse move exactly as far as you intend.',
    icon: 'wind',
  },
  {
    title: 'Premium Build Quality',
    description:
      'Materials, tolerances and finish chosen without compromise. Built to last.',
    icon: 'gem',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Marcus Devlin',
    handle: '@mrcs.aim',
    rating: 5,
    title: 'The most consistent pad I have used',
    body: 'Switched from a well-known brand and never looked back. The Speed surface is unreal for flicks — edge to edge tracking is flawless.',
    verified: true,
    surface: 'speed',
  },
  {
    id: 'r2',
    name: 'Yuki Tanaka',
    handle: '@yuki.plays',
    rating: 5,
    title: 'Balance is the perfect all-rounder',
    body: 'I play everything and this handles it all. Glide is smooth without feeling slippery, and the stitching still looks brand new after months.',
    verified: true,
    surface: 'balance',
  },
  {
    id: 'r3',
    name: 'Elena Rossi',
    handle: '@elena.fps',
    rating: 5,
    title: 'Control surface = pure precision',
    body: 'Low sens tac-FPS main here. The stopping power lets me micro-adjust with total confidence. My headshot percentage genuinely went up.',
    verified: true,
    surface: 'control',
  },
  {
    id: 'r4',
    name: 'Daniel Brooks',
    handle: '@dbrooks',
    rating: 5,
    title: 'Feels premium in every way',
    body: 'The moment you unbox it you can tell it is a different tier. Dense base, clean matte finish, and the logo detail is gorgeous.',
    verified: true,
    surface: 'balance',
  },
  {
    id: 'r5',
    name: 'Priya Nair',
    handle: '@priya.clips',
    rating: 5,
    title: 'Large size is a game changer',
    body: 'Went with the 560 × 510 and my whole setup feels cohesive now. Stays completely planted on my desk even during aggressive plays.',
    verified: true,
    surface: 'speed',
  },
  {
    id: 'r6',
    name: 'Tomás Herrera',
    handle: '@tomh.aim',
    rating: 5,
    title: 'Tournament ready',
    body: 'Used it at a LAN last month. Zero surprises, total consistency under pressure. Exactly what you want from your gear.',
    verified: true,
    surface: 'control',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'How do I choose between Speed, Balance and Control?',
    answer:
      'Speed suits high-sensitivity players who prioritise fast flicks and minimal friction. Control suits low-sensitivity, tactical players who want stopping power and precision. Balance sits in between and is the safest all-round pick. Not sure? Take the 30-second recommendation quiz.',
  },
  {
    question: 'Which size should I get?',
    answer:
      'The Medium (500 × 450 mm) fits most desks and mid-to-high sensitivity setups. The Large (560 × 510 mm) gives you extra room for low-sensitivity play and a fuller desk mat aesthetic.',
  },
  {
    question: 'Is the surface compatible with my mouse?',
    answer:
      'Yes. Every Pegaris surface is calibrated for both optical and laser sensors across all major mouse brands, from low to very high DPI.',
  },
  {
    question: 'How do I clean my mousepad?',
    answer:
      'The water-resistant coating means most spills wipe away with a damp cloth. For a deeper clean, hand wash with mild soap in lukewarm water and air dry flat.',
  },
  {
    question: 'What warranty is included?',
    answer:
      'Every Pegaris mousepad is covered by a 2-year warranty against manufacturing defects, including stitching and base separation.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Orders are dispatched within 24 hours. Standard shipping typically arrives in 3–5 business days, with express options available at checkout.',
  },
  {
    question: 'What is your returns policy?',
    answer:
      'If you are not satisfied, return your pad within 30 days for a full refund. See the Returns page for full details.',
  },
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', title: 'Micro-weave', caption: 'Macro cloth texture', kind: 'macro' },
  {
    id: 'g2',
    title: 'Rubber base',
    caption: 'Anti-slip natural rubber',
    kind: 'macro',
    image: '/assets/macro-rubber-base.png',
  },
  {
    id: 'g3',
    title: 'Stitched edge',
    caption: 'Anti-fray border detail',
    kind: 'macro',
    image: '/assets/macro-stitching.png',
  },
  { id: 'g4', title: 'The mark', caption: 'The Pegaris, rendered in white', kind: 'render' },
  { id: 'g5', title: 'Studio render', caption: 'Floating product study', kind: 'render' },
  { id: 'g6', title: 'The setup', caption: 'A professional FPS desk', kind: 'setup' },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What do you play most?',
    options: [
      { label: 'Fast-paced FPS (Apex, Valorant)', weight: { speed: 3, balance: 1, control: 0 } },
      { label: 'Tactical FPS (CS2, R6)', weight: { speed: 0, balance: 1, control: 3 } },
      { label: 'A bit of everything', weight: { speed: 1, balance: 3, control: 1 } },
    ],
  },
  {
    id: 'q2',
    question: 'What is your sensitivity?',
    options: [
      { label: 'High — small hand movements', weight: { speed: 3, balance: 1, control: 0 } },
      { label: 'Medium', weight: { speed: 1, balance: 3, control: 1 } },
      { label: 'Low — big sweeping arm aim', weight: { speed: 0, balance: 1, control: 3 } },
    ],
  },
  {
    id: 'q3',
    question: 'Fast flicks or pinpoint precision?',
    options: [
      { label: 'Fast flicks and speed', weight: { speed: 3, balance: 1, control: 0 } },
      { label: 'A balance of both', weight: { speed: 1, balance: 3, control: 1 } },
      { label: 'Precision and stopping power', weight: { speed: 0, balance: 1, control: 3 } },
    ],
  },
];

export const COMPARISON_ROWS: { label: string; key: keyof SurfaceVariant['ratings'] }[] = [
  { label: 'Glide', key: 'glide' },
  { label: 'Stopping Power', key: 'stoppingPower' },
  { label: 'Precision', key: 'precision' },
  { label: 'Tracking', key: 'tracking' },
];
