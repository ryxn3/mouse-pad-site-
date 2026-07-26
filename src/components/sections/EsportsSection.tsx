'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const GEAR = [
  { label: 'BenQ ZOWIE XL2566X+', role: 'Monitor' },
  { label: 'Wooting 60HE', role: 'Keyboard' },
  { label: 'Lightweight black mouse', role: 'Pointer' },
  { label: 'Black mouse bungee', role: 'Cable' },
  { label: 'Premium monitor arm', role: 'Mount' },
  { label: 'Matte black desk', role: 'Surface' },
];

/**
 * A cinematic, understated showcase of a professional FPS desk — the mousepad
 * at the centre of a clean, neutral, RGB-free setup. Built as a parallax CSS
 * scene so it stays crisp and lightweight at any resolution.
 */
export function EsportsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.4, 0.15]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-crimson/10 blur-[160px]"
      />

      <div className="container-px">
        <SectionHeading
          eyebrow="The Setup"
          title="A professional's desk. Nothing more."
          description="No RGB. No clutter. No ultrawide. Just a considered, neutral space where the pad is the foundation — and the focus."
        />

        {/* Stylised CSS desk scene */}
        <motion.div style={{ y }} className="relative mx-auto mt-20 max-w-4xl">
          <div className="perspective">
            <div
              className="relative mx-auto"
              style={{ transform: 'rotateX(18deg)', transformStyle: 'preserve-3d' }}
            >
              {/* Monitor */}
              <div className="mx-auto mb-4 w-[70%]">
                <div className="relative rounded-lg border border-white/10 bg-gradient-to-b from-surface-overlay to-surface p-1.5 shadow-soft">
                  <div className="aspect-video overflow-hidden rounded-md bg-gradient-to-br from-[#0d0d0d] to-[#050505]">
                    <div className="flex h-full items-center justify-center">
                      <div className="h-2 w-2 animate-pulse-slow rounded-full bg-crimson/60" />
                    </div>
                  </div>
                  <div className="mx-auto mt-1 h-6 w-16 rounded-b-lg bg-surface" />
                </div>
              </div>

              {/* Desk mat / mousepad with peripherals */}
              <div className="relative mx-auto h-40 w-[85%] rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c0c0c] to-[#070707] p-4 shadow-card">
                <span className="absolute right-4 top-3 text-[10px] uppercase tracking-widest2 text-ink-faint">
                  Pegasus Pro
                </span>
                {/* Keyboard */}
                <div className="absolute bottom-4 left-6 grid grid-cols-8 gap-0.5 rounded-md border border-white/10 bg-surface-raised p-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-[2px] bg-white/10"
                    />
                  ))}
                </div>
                {/* Mouse */}
                <div className="absolute bottom-6 right-16 h-8 w-5 rounded-full border border-white/10 bg-gradient-to-b from-surface-overlay to-surface" />
                {/* Bungee */}
                <div className="absolute bottom-5 right-8 h-10 w-1.5 rounded-full bg-white/10" />
              </div>

              {/* Desk shadow */}
              <div className="mx-auto mt-2 h-6 w-[90%] rounded-full bg-black/60 blur-xl" />
            </div>
          </div>
        </motion.div>

        {/* Gear list */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-surface-raised/40 px-5 py-4">
                <span className="text-sm text-ink">{item.label}</span>
                <span className="text-xs uppercase tracking-widest2 text-ink-faint">
                  {item.role}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
