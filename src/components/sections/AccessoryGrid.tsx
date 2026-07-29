'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ACCESSORIES } from '@/lib/accessories';
import { formatPrice } from '@/lib/utils';
import { AccessoryIcon } from '@/components/ui/AccessoryIcon';
import { staggerContainer, staggerItem } from '@/animations/variants';
import type { Accessory } from '@/types';

/** Lowest price across an accessory's sizes (or its flat price). */
function fromPrice(a: Accessory): { value: number; ranged: boolean } {
  if (a.sizes && a.sizes.length) {
    return { value: Math.min(...a.sizes.map((s) => s.price)), ranged: true };
  }
  return { value: a.price, ranged: false };
}

/** Grid of accessory cards; each links through to its product page. */
export function AccessoryGrid() {
  return (
    <section className="container-px py-10 md:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ACCESSORIES.map((a) => {
          const p = fromPrice(a);
          return (
            <motion.div key={a.id} variants={staggerItem}>
              <Link
                href={`/accessories/${a.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-white/20 hover:shadow-card"
              >
                {/* Preview */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                  {/* Layered background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-surface-overlay to-background" />
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-56 -translate-x-1/2 rounded-full bg-crimson/10 blur-3xl transition-opacity duration-500 group-hover:bg-crimson/25" />

                  {a.preorder && (
                    <span className="absolute left-4 top-4 z-10 rounded-full border border-crimson/40 bg-crimson/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-crimson-soft">
                      Pre-order
                    </span>
                  )}
                  {a.sizes && (
                    <span className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                      {a.sizes.length} sizes
                    </span>
                  )}

                  <div className="relative h-28 w-28 text-ink/80 transition-all duration-500 group-hover:scale-110 group-hover:text-ink">
                    <AccessoryIcon id={a.id} />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col border-t border-white/[0.06] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {a.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">{a.tagline}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-faint transition-all duration-300 group-hover:border-crimson/50 group-hover:bg-crimson/10 group-hover:text-crimson-soft">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-auto flex items-baseline gap-2 pt-6">
                    {p.ranged && (
                      <span className="text-xs uppercase tracking-wider text-ink-faint">
                        From
                      </span>
                    )}
                    <span className="font-display text-xl font-semibold text-ink">
                      {formatPrice(p.value)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
