'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

/** A button with a premium magnetic hover effect; renders as a link when href is set. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(reduced ? 0 : 0.3);
  const classes = cn(variant === 'primary' ? 'btn-primary' : 'btn-ghost', className);

  const inner = (
    <motion.span style={{ x, y }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.span style={{ x, y }} className="inline-block">
        <Link
          href={href}
          aria-label={ariaLabel}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className={classes}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={classes}
    >
      {inner}
    </button>
  );
}
