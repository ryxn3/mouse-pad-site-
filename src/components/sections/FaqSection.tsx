'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ } from '@/lib/products';
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  /** Hide the section heading when embedding under a page title. */
  bare?: boolean;
}

/** Animated FAQ accordion. */
export function FaqSection({ bare = false }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-px py-24 md:py-32">
      {!bare && (
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          description="Everything you need to know before you buy. Still unsure? Reach out any time."
        />
      )}

      <div className="mx-auto mt-14 max-w-3xl">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-white/[0.08]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    'font-display text-lg font-medium transition-colors duration-300 md:text-xl',
                    isOpen ? 'text-ink' : 'text-ink-muted',
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300',
                    isOpen && 'rotate-45 border-crimson/50 bg-crimson/10',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-14 text-sm leading-relaxed text-ink-muted md:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
