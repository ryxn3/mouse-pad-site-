'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { FEATURES } from '@/lib/products';
import { staggerContainer, staggerItem } from '@/animations/variants';

/** Animated grid of product feature cards. */
export function FeaturesSection() {
  return (
    <section id="features" className="container-px py-28 md:py-36">
      <SectionHeading
        eyebrow="Craftsmanship"
        title="Every detail, considered."
        description="Ten reasons the Pegaris Pro feels different the moment you touch it — and stays that way for years."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40 p-6 transition-colors duration-500 hover:border-white/15"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-crimson/0 blur-2xl transition-all duration-500 group-hover:bg-crimson/20" />
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-ink transition-colors duration-500 group-hover:text-crimson-soft">
              <FeatureIcon name={feature.icon} className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
