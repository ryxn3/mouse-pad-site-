'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, RotateCcw, Move3d, ArrowLeft } from 'lucide-react';
import { useCart } from '@/state/cart';
import { formatPrice, cn } from '@/lib/utils';
import type { Accessory } from '@/types';

const BLURBS: Record<string, string> = {
  'sling-keychain':
    'A woven nylon sling with the PEGARIS wordmark and a crimson centre stripe, finished with a leather-reinforced head and a matte-black snap-hook clasp. Clip it to a bag, a belt loop, or your keys.',
  'arm-sleeve':
    'A four-way-stretch compression sleeve with a low-friction forearm panel for a smoother, more consistent arm-aim glide. Tonal PEGARIS graphics, speed-line detailing and anti-slip silicone cuffs.',
  'wrist-rest':
    'A slow-rebound memory-foam wrist rest with a micro-woven top and an anti-slip rubber base. Pick the length that matches your keyboard — from full-size to 65%.',
};

const viewerLoading = () => (
  <div className="flex h-full items-center justify-center">
    <div className="h-10 w-10 animate-pulse-slow rounded-full bg-crimson/30" />
  </div>
);

const KeychainViewer = dynamic(
  () => import('@/components/three/KeychainViewer').then((m) => m.KeychainViewer),
  { ssr: false, loading: viewerLoading },
);
const ArmSleeveViewer = dynamic(
  () => import('@/components/three/ArmSleeveViewer').then((m) => m.ArmSleeveViewer),
  { ssr: false, loading: viewerLoading },
);
const WristRestViewer = dynamic(
  () => import('@/components/three/WristRestViewer').then((m) => m.WristRestViewer),
  { ssr: false, loading: viewerLoading },
);

/** Maps an accessory to its 3D viewer. */
function AccessoryViewer({ id, widthMm }: { id: string; widthMm: number }) {
  if (id === 'arm-sleeve') return <ArmSleeveViewer className="h-full w-full" />;
  if (id === 'wrist-rest') return <WristRestViewer widthMm={widthMm} className="h-full w-full" />;
  return <KeychainViewer className="h-full w-full" />;
}

/** Detail view for a single accessory: 3D viewer, buy box, options, specs. */
export function AccessoryShop({ accessory }: { accessory: Accessory }) {
  const a = accessory;
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [sizeId, setSizeId] = useState(a.sizes?.[0]?.id ?? '');

  const selectedSize = a.sizes?.find((s) => s.id === sizeId) ?? a.sizes?.[0];
  const price = selectedSize?.price ?? a.price;
  const widthMm = selectedSize?.widthMm ?? 440;

  const handleAdd = () => {
    addItem({
      id: `accessory-${a.id}${selectedSize ? `-${selectedSize.id}` : ''}`,
      productId: a.id,
      name: a.name,
      preorder: a.preorder,
      description: selectedSize
        ? `${selectedSize.label} · ${selectedSize.sublabel}`
        : a.description,
      colorSwatch: '#0b0b0b',
      price,
      accent: '#B00020',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="container-px py-10 md:py-16">
      <Link
        href="/accessories"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> All accessories
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* 3D viewer */}
        <div className="relative">
          <div className="sticky top-28">
            <div className="relative aspect-square overflow-hidden rounded-4xl border border-white/[0.06] bg-gradient-to-b from-surface-raised to-background">
              <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-30" />
              <AccessoryViewer id={a.id} widthMm={widthMm} />
              <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-ink-muted backdrop-blur-md">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Drag to rotate
                </span>
                <span className="flex items-center gap-1.5">
                  <Move3d className="h-3.5 w-3.5" /> Scroll to zoom
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="eyebrow">{a.subtitle}</span>
            {a.preorder && (
              <span className="rounded-full border border-crimson/40 bg-crimson/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-crimson-soft">
                Pre-order
              </span>
            )}
          </div>
          <h1 className="heading-lg mt-3 text-gradient">{a.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-3xl font-semibold"
              >
                {formatPrice(price)}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-ink-faint">Free shipping over $75</span>
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-ink-muted">
            {BLURBS[a.id] ?? a.description}
          </p>

          {/* Size selection (keyboard form factor) */}
          {a.sizes && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Keyboard size</span>
                <span className="text-sm text-ink-muted">{selectedSize?.sublabel}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {a.sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={cn(
                      'rounded-2xl border p-3 text-center transition-all duration-300',
                      sizeId === s.id
                        ? 'border-white/30 bg-white/[0.04]'
                        : 'border-white/[0.06] hover:border-white/15',
                    )}
                  >
                    <span className="block font-display text-base font-semibold">{s.label}</span>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-ink-faint">
                      {s.sublabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {a.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-ink">
                <Check className="h-4 w-4 shrink-0 text-crimson-soft" /> {h}
              </li>
            ))}
          </ul>

          {/* Add to cart */}
          <button onClick={handleAdd} className="btn-primary mt-8 w-full text-base">
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" /> Added to cart
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />{' '}
                  {a.preorder ? 'Pre-order' : 'Add to cart'} — {formatPrice(price)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {a.preorder && (
            <p className="mt-3 text-center text-xs text-ink-faint">
              Pre-order now · ships when the {a.name} launches. You won&apos;t be
              charged until it&apos;s on its way.
            </p>
          )}

          {/* Specifications */}
          <div className="mt-10">
            <span className="eyebrow mb-4 block">Specifications</span>
            <dl className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/[0.06]">
              {a.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-5 py-3.5">
                  <dt className="text-sm text-ink-muted">{spec.label}</dt>
                  <dd className="text-sm font-medium text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
