'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp } from '@/animations/variants';

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  /** Delay in seconds before the animation begins. */
  delay?: number;
  once?: boolean;
  amount?: number;
}

/** Reveals children on scroll into view using shared motion variants. */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
