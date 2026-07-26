'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS } from '@/lib/constants';
import { useCart, selectCount } from '@/state/cart';
import { useMounted } from '@/hooks/useMounted';
import { cn } from '@/lib/utils';

/** Floating glass navbar: transparent at top, matte-black blur on scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            'flex w-full max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ease-premium md:px-7',
            scrolled
              ? 'border border-white/10 bg-black/70 shadow-soft backdrop-blur-2xl'
              : 'border border-transparent bg-transparent',
          )}
        >
          <Logo size={34} priority />

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                      active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-crimson transition-transform duration-300 ease-premium group-hover:scale-x-100',
                        active && 'scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative rounded-full border border-white/10 p-2.5 text-ink transition-colors duration-300 hover:border-white/30 hover:bg-white/5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {mounted && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-crimson px-1 text-[10px] font-semibold text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="rounded-full border border-white/10 p-2.5 text-ink transition-colors hover:border-white/30 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
              ) : (
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/5 py-4 font-display text-3xl font-semibold tracking-tight text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
