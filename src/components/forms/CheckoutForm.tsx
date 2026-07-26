'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Lock, Check, CreditCard, Truck } from 'lucide-react';
import { useCart, selectSubtotal } from '@/state/cart';
import { useMounted } from '@/hooks/useMounted';
import { formatPrice, cn } from '@/lib/utils';
import { SHIPPING } from '@/lib/constants';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  address: z.string().min(4, 'Enter your address'),
  city: z.string().min(2, 'Required'),
  postal: z.string().min(3, 'Required'),
  country: z.string().min(2, 'Required'),
  shipping: z.enum(['standard', 'express']),
  card: z
    .string()
    .min(12, 'Enter a valid card number')
    .max(19, 'Enter a valid card number'),
  expiry: z.string().min(4, 'MM/YY'),
  cvc: z.string().min(3, 'CVC').max(4, 'CVC'),
});

type CheckoutValues = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-white/30';

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-xs font-medium text-ink-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-crimson-soft">{error}</span>}
    </label>
  );
}

/** Responsive checkout: shipping details, method, payment placeholder, summary. */
export function CheckoutForm() {
  const mounted = useMounted();
  const { items, clear } = useCart();
  const subtotal = useCart(selectSubtotal);
  const [placed, setPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { shipping: 'standard', country: '' },
  });

  const shippingMethod = watch('shipping');
  const freeShipping = subtotal >= SHIPPING.free_threshold;
  const shippingCost = freeShipping
    ? 0
    : shippingMethod === 'express'
      ? SHIPPING.express
      : SHIPPING.standard;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    clear();
    setPlaced(true);
  };

  if (mounted && placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-12 text-center"
      >
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-crimson/15">
          <Check className="h-8 w-8 text-crimson-soft" />
        </span>
        <h2 className="heading-md">Order confirmed.</h2>
        <p className="mt-3 text-ink-muted">
          Thank you for choosing Pegasus. A confirmation is on its way to your
          inbox — your gear ships within 24 hours.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-12 text-center">
        <h2 className="heading-md">Your cart is empty.</h2>
        <p className="mt-3 text-ink-muted">
          Add a Pegasus Pro to your cart to check out.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
    >
      {/* Left: details */}
      <div className="flex flex-col gap-10">
        {/* Contact */}
        <section>
          <h2 className="mb-5 font-display text-xl font-semibold">Contact</h2>
          <Field label="Email" error={errors.email?.message}>
            <input {...register('email')} className={inputClass} placeholder="you@email.com" />
          </Field>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="mb-5 font-display text-xl font-semibold">Shipping address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" error={errors.firstName?.message}>
              <input {...register('firstName')} className={inputClass} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input {...register('lastName')} className={inputClass} />
            </Field>
            <Field label="Address" error={errors.address?.message} className="sm:col-span-2">
              <input {...register('address')} className={inputClass} />
            </Field>
            <Field label="City" error={errors.city?.message}>
              <input {...register('city')} className={inputClass} />
            </Field>
            <Field label="Postal code" error={errors.postal?.message}>
              <input {...register('postal')} className={inputClass} />
            </Field>
            <Field label="Country" error={errors.country?.message} className="sm:col-span-2">
              <input {...register('country')} className={inputClass} placeholder="Country" />
            </Field>
          </div>
        </section>

        {/* Shipping method */}
        <section>
          <h2 className="mb-5 font-display text-xl font-semibold">Delivery method</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['standard', 'express'] as const).map((method) => (
              <label
                key={method}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors',
                  shippingMethod === method
                    ? 'border-white/30 bg-white/[0.04]'
                    : 'border-white/[0.08] hover:border-white/20',
                )}
              >
                <input
                  type="radio"
                  value={method}
                  {...register('shipping')}
                  className="sr-only"
                />
                <Truck className="h-5 w-5 text-ink-muted" />
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize text-ink">{method}</p>
                  <p className="text-xs text-ink-faint">
                    {method === 'express' ? '1–2 business days' : '3–5 business days'}
                  </p>
                </div>
                <span className="text-sm tabular-nums text-ink">
                  {freeShipping
                    ? 'Free'
                    : formatPrice(
                        method === 'express' ? SHIPPING.express : SHIPPING.standard,
                      )}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Payment */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold">Payment</h2>
            <span className="flex items-center gap-1 text-xs text-ink-faint">
              <Lock className="h-3.5 w-3.5" /> Secure placeholder
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Card number" error={errors.card?.message} className="sm:col-span-2">
              <div className="relative">
                <input
                  {...register('card')}
                  className={inputClass}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
                <CreditCard className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
              </div>
            </Field>
            <Field label="Expiry" error={errors.expiry?.message}>
              <input {...register('expiry')} className={inputClass} placeholder="MM/YY" />
            </Field>
            <Field label="CVC" error={errors.cvc?.message}>
              <input {...register('cvc')} className={inputClass} placeholder="123" inputMode="numeric" />
            </Field>
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            This is a demo checkout. No card is charged and no data is stored.
          </p>
        </section>
      </div>

      {/* Right: order summary */}
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-6 md:p-8">
          <h2 className="mb-6 font-display text-xl font-semibold">Order summary</h2>
          <ul className="flex flex-col gap-4">
            {mounted &&
              items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${item.accent}22, #0a0a0a)`,
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: item.accent }}
                    />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">
                      {item.surfaceName} · {item.dimensions} · ×{item.quantity}
                    </p>
                  </div>
                  <span className="text-sm tabular-nums text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row
              label="Shipping"
              value={shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
            />
            <Row label="Tax (est.)" value={formatPrice(tax)} />
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-display text-base font-semibold">Total</span>
              <span className="font-display text-lg font-semibold tabular-nums">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary mt-6 w-full">
            <Lock className="h-4 w-4" />
            {isSubmitting ? 'Processing…' : `Pay ${formatPrice(total)}`}
          </button>
        </div>
      </aside>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-ink-muted">
      <span>{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  );
}
