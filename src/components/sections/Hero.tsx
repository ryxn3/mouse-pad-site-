'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Particles } from '@/components/ui/Particles';
import { EASE_PREMIUM } from '@/animations/variants';

// The 3D hero is client-only and code-split to keep the initial payload lean.
const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="h-10 w-10 animate-pulse-slow rounded-full bg-crimson/30" />
      </div>
    ),
  },
);

/** Fullscreen cinematic landing hero. */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Ambient background layers */}
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0">
        <Particles />
      </div>
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-crimson/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />

      {/* 3D centerpiece */}
      <div className="absolute inset-0 z-10">
        <HeroScene className="h-full w-full" />
      </div>

      {/* Hero copy */}
      <div className="container-px relative z-20 flex flex-1 flex-col items-center justify-center pt-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.4 }}
          className="eyebrow mb-6"
        >
          Premium Gaming Mousepads
        </motion.span>

        <h1 className="heading-xl max-w-4xl text-gradient">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_PREMIUM, delay: 0.5 }}
            className="block"
          >
            Engineered for precision.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_PREMIUM, delay: 0.65 }}
            className="block"
          >
            Built for victory.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.8 }}
          className="mt-6 max-w-xl text-base text-ink-muted md:text-lg"
        >
          Tournament-grade cloth. Three surfaces. Two sizes. One standard —
          uncompromising.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.95 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/products" variant="primary">
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/technology" variant="ghost">
            Learn More
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-20 flex justify-center pb-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-ink-faint"
        >
          <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
