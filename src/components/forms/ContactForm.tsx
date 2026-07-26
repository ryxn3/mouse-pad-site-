'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(2, 'Please add a subject'),
  message: z.string().min(10, 'Please add at least 10 characters'),
});

type ContactValues = z.infer<typeof schema>;

/** Field wrapper with label + error message. */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-crimson-soft">{error}</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-white/30';

/** Working contact form with client-side validation. */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: ContactValues) => {
    // Simulated submission — swap for your API/email provider.
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register('name')}
            className={cn(inputClass, errors.name && 'border-crimson/50')}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register('email')}
            className={cn(inputClass, errors.email && 'border-crimson/50')}
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <input
          {...register('subject')}
          className={cn(inputClass, errors.subject && 'border-crimson/50')}
          placeholder="How can we help?"
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={5}
          className={cn(inputClass, 'resize-none', errors.message && 'border-crimson/50')}
          placeholder="Tell us more…"
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting || sent}
        className="btn-primary mt-2 w-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.span
              key="sent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="h-5 w-5" /> Message sent
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" /> {isSubmitting ? 'Sending…' : 'Send message'}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
}
