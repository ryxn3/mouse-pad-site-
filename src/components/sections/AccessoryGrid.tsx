'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ACCESSORIES } from '@/lib/accessories';
import { withBasePath } from '@/lib/basePath';
import { formatPrice } from '@/lib/utils';
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
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40 transition-all duration-500 hover:border-white/15"
              >
                {/* Preview */}
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-b from-surface-overlay to-background">
                  <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-40" />
                  {a.preorder && (
                    <span className="absolute left-4 top-4 rounded-full border border-crimson/40 bg-crimson/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-crimson-soft">
                      Pre-order
                    </span>
                  )}
                  <Image
                    src={withBasePath('/assets/logo-mark.png')}
                    alt={a.name}
                    width={130}
                    height={130}
                    className="relative h-auto w-1/3 max-w-[130px] opacity-80 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {a.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">{a.tagline}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-crimson-soft" />
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-sm font-medium text-ink">
                      {p.ranged ? 'From ' : ''}
                      {formatPrice(p.value)}
                    </span>
                    <span className="text-xs text-ink-faint">
                      {a.sizes ? `${a.sizes.length} sizes` : 'Inspect in 3D'}
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
