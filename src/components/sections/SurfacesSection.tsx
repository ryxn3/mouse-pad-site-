'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SURFACE_LIST } from '@/lib/products';
import { staggerContainer, staggerItem } from '@/animations/variants';

/** Presents the three surface variants: Speed, Balance, Control. */
export function SurfacesSection() {
  return (
    <section id="surfaces" className="container-px py-28 md:py-36">
      <SectionHeading
        eyebrow="Three Surfaces"
        title="Choose how you glide."
        description="Each surface is a distinct weave with its own character. Pick the one that matches your game — or take the quiz to find your match."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {SURFACE_LIST.map((surface) => (
          <motion.div
            key={surface.id}
            variants={staggerItem}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40 p-8 transition-all duration-500 hover:border-white/15"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: surface.accent }}
            />
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500"
              style={{ background: surface.accent, opacity: 0.06 }}
            />

            <span
              className="mb-6 inline-flex h-2.5 w-2.5 rounded-full"
              style={{ background: surface.accent, boxShadow: `0 0 20px ${surface.accent}` }}
            />

            <h3 className="font-display text-3xl font-bold tracking-tight">
              {surface.name}
            </h3>
            <p className="mt-1 text-sm font-medium" style={{ color: surface.accent }}>
              {surface.tagline}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
              {surface.description}
            </p>

            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="text-xs uppercase tracking-widest2 text-ink-faint">
                Best for
              </p>
              <p className="mt-1 text-sm text-ink">{surface.bestGames}</p>
            </div>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-crimson-soft"
            >
              Configure {surface.name}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
