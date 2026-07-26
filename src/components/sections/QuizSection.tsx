'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { QUIZ, SURFACES } from '@/lib/products';
import { useConfigurator } from '@/state/configurator';
import type { SurfaceId } from '@/types';
import { cn } from '@/lib/utils';

/** A short recommendation quiz that maps answers to a surface. */
export function QuizSection() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<SurfaceId, number>>({
    speed: 0,
    balance: 0,
    control: 0,
  });
  const setSurface = useConfigurator((s) => s.setSurface);

  const isComplete = step >= QUIZ.length;
  const result: SurfaceId = (Object.entries(scores).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0] ?? 'balance') as SurfaceId;
  const recommended = SURFACES[result];

  const choose = (weight: Record<SurfaceId, number>) => {
    setScores((prev) => ({
      speed: prev.speed + weight.speed,
      balance: prev.balance + weight.balance,
      control: prev.control + weight.control,
    }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setScores({ speed: 0, balance: 0, control: 0 });
  };

  const applyResult = () => setSurface(result);

  return (
    <section id="quiz" className="container-px py-28 md:py-36">
      <SectionHeading
        eyebrow="Find your surface"
        title="Not sure which to pick?"
        description="Answer three quick questions and we'll recommend the surface that fits your game."
      />

      <div className="mx-auto mt-14 max-w-2xl">
        <div className="relative overflow-hidden rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-8 md:p-12">
          {/* Progress */}
          {!isComplete && (
            <div className="mb-8 flex items-center gap-2">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors duration-500',
                    i <= step ? 'bg-crimson' : 'bg-white/10',
                  )}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mb-2 text-xs uppercase tracking-widest2 text-ink-faint">
                  Question {step + 1} of {QUIZ.length}
                </p>
                <h3 className="heading-md mb-8">{QUIZ[step].question}</h3>
                <div className="flex flex-col gap-3">
                  {QUIZ[step].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => choose(option.weight)}
                      className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-transparent px-6 py-5 text-left transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03]"
                    >
                      <span className="text-sm text-ink md:text-base">
                        {option.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-crimson-soft" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="eyebrow mb-4">Your match</p>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: `${recommended.accent}22`,
                    boxShadow: `0 0 40px ${recommended.accent}55`,
                  }}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ background: recommended.accent }}
                  />
                </motion.span>
                <h3 className="font-display text-4xl font-bold tracking-tight">
                  {recommended.name}
                </h3>
                <p
                  className="mt-2 text-sm font-medium"
                  style={{ color: recommended.accent }}
                >
                  {recommended.tagline}
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                  {recommended.description}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/products"
                    onClick={applyResult}
                    className="btn-primary"
                  >
                    Configure {recommended.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button onClick={reset} className="btn-ghost">
                    <RotateCcw className="h-4 w-4" /> Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
