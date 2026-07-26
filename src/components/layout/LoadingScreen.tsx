'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { withBasePath } from '@/lib/basePath';

/**
 * Premium intro loader: the Pegaris mark fades and rises out of black,
 * a hairline progress sweep completes, then the screen dissolves into the site.
 * Shows once per session.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('pegaris-loaded')) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('pegaris-loaded', '1');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-60" />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Image
              src={withBasePath('/assets/logo.png')}
              alt="Pegaris"
              width={120}
              height={120}
              priority
              className="logo-on-dark h-auto w-[110px]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 font-display text-sm font-semibold uppercase tracking-widest2 text-ink"
          >
            Pegaris
          </motion.p>

          <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-crimson"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
