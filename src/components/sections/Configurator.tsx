'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, RotateCcw, Move3d } from 'lucide-react';
import { useConfigurator } from '@/state/configurator';
import { useCart } from '@/state/cart';
import {
  PRODUCT_LIST,
  PRODUCTS,
  SURFACE_LIST,
  SIZE_LIST,
  PAD_COLOR_LIST,
  SURFACES,
  SIZES,
  PAD_COLORS,
  priceFor,
  specsFor,
} from '@/lib/products';
import { formatPrice, lineItemId, cn } from '@/lib/utils';

const ProductViewer = dynamic(
  () => import('@/components/three/ProductViewer').then((m) => m.ProductViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 animate-pulse-slow rounded-full bg-crimson/30" />
      </div>
    ),
  },
);

/**
 * The full product configurator: an interactive 3D viewer alongside surface and
 * size selection, live specifications and an add-to-cart flow.
 */
export function Configurator() {
  const { product, surface, size, color, setProduct, setSurface, setSize, setColor } =
    useConfigurator();
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const prod = PRODUCTS[product];
  const surf = SURFACES[surface];
  const sz = SIZES[size];
  const col = PAD_COLORS[color];
  const price = priceFor(size, prod);
  const specs = specsFor(surface, size);

  const handleAdd = () => {
    addItem({
      id: lineItemId(prod.id, surface, size, color),
      productId: prod.id,
      name: prod.name,
      preorder: prod.preorder,
      surface,
      surfaceName: surf.name,
      size,
      sizeName: sz.name,
      dimensions: sz.dimensions,
      color,
      colorName: col.name,
      colorSwatch: col.swatch,
      price,
      accent: surf.accent,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="configure" className="container-px py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* 3D viewer */}
        <div className="relative">
          <div className="sticky top-28">
            <div className="relative aspect-square overflow-hidden rounded-4xl border border-white/[0.06] bg-gradient-to-b from-surface-raised to-background">
              <div
                className="pointer-events-none absolute inset-0 opacity-20 transition-colors duration-700"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${surf.accent}, transparent 60%)`,
                }}
              />
              <ProductViewer
                surface={surface}
                size={size}
                color={color}
                texturePrefix={prod.texturePrefix}
                patterned={prod.patterned}
                className="h-full w-full"
              />
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

        {/* Configuration panel */}
        <div className="flex flex-col">
          {/* Product selector */}
          <div className="mb-8 grid grid-cols-2 gap-3">
            {PRODUCT_LIST.map((p) => (
              <button
                key={p.id}
                onClick={() => setProduct(p.id)}
                className={cn(
                  'rounded-2xl border p-4 text-left transition-all duration-300',
                  product === p.id
                    ? 'border-white/30 bg-white/[0.04]'
                    : 'border-white/[0.06] hover:border-white/15',
                )}
              >
                <span className="block font-display text-sm font-semibold">{p.name}</span>
                <span className="mt-1 block text-xs text-ink-muted">{p.tagline}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="eyebrow">{prod.subtitle}</span>
            {prod.preorder && (
              <span className="rounded-full border border-crimson/40 bg-crimson/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-crimson-soft">
                Pre-order
              </span>
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.h1
              key={prod.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="heading-lg mt-3 text-gradient"
            >
              {prod.name}
            </motion.h1>
          </AnimatePresence>
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

          {/* Surface selection */}
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Surface</span>
              <span className="text-sm" style={{ color: surf.accent }}>
                {surf.tagline}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SURFACE_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSurface(s.id)}
                  className={cn(
                    'relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300',
                    surface === s.id
                      ? 'border-white/30 bg-white/[0.04]'
                      : 'border-white/[0.06] bg-transparent hover:border-white/15',
                  )}
                >
                  <span
                    className="mb-2 block h-2.5 w-2.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                  <span className="block font-display text-sm font-semibold">
                    {s.name}
                  </span>
                  {surface === s.id && (
                    <motion.span
                      layoutId="surface-active"
                      className="absolute inset-x-0 bottom-0 h-0.5"
                      style={{ background: s.accent }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {surf.description}
            </p>
          </div>

          {/* Size selection */}
          <div className="mt-8">
            <span className="mb-3 block text-sm font-medium text-ink">Size</span>
            <div className="grid grid-cols-2 gap-3">
              {SIZE_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all duration-300',
                    size === s.id
                      ? 'border-white/30 bg-white/[0.04]'
                      : 'border-white/[0.06] hover:border-white/15',
                  )}
                >
                  <span className="block font-display text-sm font-semibold">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-xs text-ink-muted">
                    {s.dimensions}
                  </span>
                  <span className="mt-2 block text-sm tabular-nums text-ink">
                    {formatPrice(priceFor(s.id, prod))}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Colour selection */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Colour</span>
              <span className="text-sm text-ink-muted">{col.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {PAD_COLOR_LIST.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  aria-label={c.name}
                  aria-pressed={color === c.id}
                  title={c.name}
                  className={cn(
                    'relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
                    color === c.id
                      ? 'border-white/70'
                      : 'border-white/15 hover:border-white/40',
                  )}
                >
                  <span
                    className="h-7 w-7 rounded-full ring-1 ring-inset ring-white/10"
                    style={{ background: c.swatch }}
                  />
                  {color === c.id && (
                    <Check className="absolute h-4 w-4 text-white mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="btn-primary mt-8 w-full text-base"
          >
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
                  {prod.preorder ? 'Pre-order' : 'Add to cart'} — {formatPrice(price)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {prod.preorder && (
            <p className="mt-3 text-center text-xs text-ink-faint">
              Pre-order now · ships when the {prod.name} launches. You won&apos;t be
              charged until it&apos;s on its way.
            </p>
          )}

          {/* Specifications */}
          <div className="mt-10">
            <span className="eyebrow mb-4 block">Specifications</span>
            <dl className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/[0.06]">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <dt className="text-sm text-ink-muted">{spec.label}</dt>
                  <AnimatePresence mode="wait">
                    <motion.dd
                      key={spec.value}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-sm font-medium text-ink"
                    >
                      {spec.value}
                    </motion.dd>
                  </AnimatePresence>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
