'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SURFACE_LIST, COMPARISON_ROWS } from '@/lib/products';

/** An animated, interactive comparison of the three surfaces. */
export function ComparisonSection() {
  return (
    <section className="container-px py-28 md:py-36">
      <SectionHeading
        eyebrow="Compare"
        title="Find your edge."
        description="A side-by-side look at how each surface performs across the metrics that matter."
      />

      <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40">
        {/* Header row */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-white/[0.02]">
          <div className="p-5 text-xs uppercase tracking-widest2 text-ink-faint">
            Feature
          </div>
          {SURFACE_LIST.map((s) => (
            <div key={s.id} className="flex items-center gap-2 p-5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: s.accent }}
              />
              <span className="font-display text-sm font-semibold md:text-base">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Rating rows */}
        {COMPARISON_ROWS.map((row, ri) => (
          <div
            key={row.key}
            className="grid grid-cols-4 items-center border-b border-white/5 last:border-b-0"
          >
            <div className="p-5 text-sm font-medium text-ink">{row.label}</div>
            {SURFACE_LIST.map((s) => {
              const value = s.ratings[row.key];
              return (
                <div key={s.id} className="p-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.1 * ri,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full"
                      style={{ background: s.accent }}
                    />
                  </div>
                  <span className="mt-1.5 block text-xs tabular-nums text-ink-faint">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        {/* Best games row */}
        <div className="grid grid-cols-4 items-start bg-white/[0.02]">
          <div className="p-5 text-sm font-medium text-ink">Best Games</div>
          {SURFACE_LIST.map((s) => (
            <div key={s.id} className="p-5 text-xs leading-relaxed text-ink-muted">
              {s.bestGames}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
