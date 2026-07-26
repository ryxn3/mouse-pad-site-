'use client';

import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '@/animations/variants';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Consistent hero header for interior pages. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pb-8 pt-40 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />
      <div className="container-px relative text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.1 }}
          className="heading-xl mt-4 text-gradient"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-ink-muted md:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  );
}
