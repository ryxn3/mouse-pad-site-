import type { Metadata } from 'next';
import { InfoPage } from '@/components/ui/InfoPage';

export const metadata: Metadata = {
  title: 'Shipping',
  description: 'Shipping options, timelines and costs for Pegasus orders.',
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Shipping"
      description="Fast, tracked shipping worldwide — free on orders over $75."
      updated="July 2026"
      sections={[
        {
          heading: 'Processing',
          body: [
            'Orders are picked, packed and dispatched within 24 hours, Monday to Friday. You will receive tracking as soon as your order ships.',
          ],
        },
        {
          heading: 'Options & timelines',
          body: [
            'Standard shipping ($6, free over $75) typically arrives in 3–5 business days.',
            'Express shipping ($14) typically arrives in 1–2 business days.',
          ],
        },
        {
          heading: 'International',
          body: [
            'We ship worldwide. International delivery times vary by destination, typically 5–12 business days. Any customs duties are the responsibility of the recipient.',
          ],
        },
        {
          heading: 'Tracking',
          body: [
            'Every order is fully tracked. If your tracking has not updated within 48 hours of dispatch, contact support@pegasus.gg and we will look into it right away.',
          ],
        },
      ]}
    />
  );
}
