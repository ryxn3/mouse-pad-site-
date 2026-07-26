'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, selectSubtotal } from '@/state/cart';
import { useMounted } from '@/hooks/useMounted';
import { formatPrice } from '@/lib/utils';
import { drawerBackdrop, drawerPanel } from '@/animations/variants';
import { SHIPPING } from '@/lib/constants';

/** Slide-out shopping cart with quantity controls and persisted state. */
export function CartDrawer() {
  const mounted = useMounted();
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const subtotal = useCart(selectSubtotal);
  const freeShipping = subtotal >= SHIPPING.free_threshold;

  return (
    <AnimatePresence>
      {mounted && isOpen && (
        <>
          <motion.div
            variants={drawerBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            variants={drawerPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-surface"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-ink-faint" strokeWidth={1} />
                <p className="text-ink-muted">Your cart is empty.</p>
                <Link href="/products" onClick={closeCart} className="btn-primary mt-2">
                  Shop Pegaris
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                      >
                        <div
                          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${item.accent}22, #0a0a0a)`,
                          }}
                        >
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: item.accent }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-ink">{item.name}</p>
                              <p className="text-xs text-ink-muted">
                                {item.surfaceName} · {item.dimensions}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="text-ink-faint transition-colors hover:text-crimson-soft"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-white/10 px-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                className="p-1.5 text-ink-muted transition-colors hover:text-ink"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                className="p-1.5 text-ink-muted transition-colors hover:text-ink"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-medium tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="border-t border-white/10 px-6 py-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-ink-muted">Subtotal</span>
                    <span className="font-medium tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-ink-faint">
                    {freeShipping
                      ? 'You qualify for free shipping.'
                      : `Add ${formatPrice(
                          SHIPPING.free_threshold - subtotal,
                        )} more for free shipping.`}
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full"
                  >
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
