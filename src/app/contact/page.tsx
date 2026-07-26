import type { Metadata } from 'next';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Pegasus team — questions about products, orders, warranty or anything else.',
};

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'support@pegasus.gg' },
  { icon: MessageCircle, label: 'Discord', value: 'discord.gg/pegasus' },
  { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Whether it's a question about surfaces, an order, or a warranty claim — we're here and we reply fast."
      />

      <section className="container-px py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            {CHANNELS.map((channel) => (
              <div
                key={channel.label}
                className="flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-surface-raised/40 p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-crimson-soft">
                  <channel.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-ink-faint">
                    {channel.label}
                  </p>
                  <p className="mt-0.5 text-sm text-ink">{channel.value}</p>
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
