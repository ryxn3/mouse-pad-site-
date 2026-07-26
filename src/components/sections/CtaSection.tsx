'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { withBasePath } from '@/lib/basePath';

/** Closing call-to-action band. */
export function CtaSection() {
  return (
    <section className="container-px py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-4xl border border-white/[0.08] bg-gradient-to-b from-surface-raised to-background px-8 py-20 text-center md:px-16 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-crimson/10 blur-[120px]" />

        <Image
          src={withBasePath('/assets/logo.png')}
          alt="Pegasus"
          width={72}
          height={72}
          className="logo-on-dark relative mx-auto mb-8 opacity-90"
        />
        <h2 className="heading-lg relative mx-auto max-w-2xl text-gradient">
          Your aim deserves the right foundation.
        </h2>
        <p className="relative mx-auto mt-5 max-w-lg text-ink-muted">
          Configure your Pegasus Pro today. Free shipping over $75, 30-day
          returns, and a 2-year warranty.
        </p>
        <div className="relative mt-10 flex justify-center">
          <MagneticButton href="/products" variant="primary">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
