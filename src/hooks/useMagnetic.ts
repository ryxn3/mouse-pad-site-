'use client';

import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface Magnetic {
  ref: React.RefObject<HTMLButtonElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * Premium magnetic hover: the element eases toward the cursor while hovered,
 * then springs back to rest on leave.
 */
export function useMagnetic(strength = 0.35): Magnetic {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    },
    [strength, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}
