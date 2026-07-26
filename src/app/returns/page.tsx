import type { Metadata } from 'next';
import { InfoPage } from '@/components/ui/InfoPage';

export const metadata: Metadata = {
  title: 'Returns',
  description: 'Our 30-day, no-hassle returns policy.',
};

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Returns"
      description="Not the right surface for your game? Return it within 30 days for a full refund."
      updated="July 2026"
      sections={[
        {
          heading: '30-day returns',
          body: [
            'If you are not completely satisfied, you can return your Pegaris mousepad within 30 days of delivery for a full refund of the product price.',
            'Items should be returned in a resaleable condition. Light use is fine — we understand you need to try the surface to know if it fits your play.',
          ],
        },
        {
          heading: 'How to start a return',
          body: [
            'Email support@pegaris.gg with your order number and reason for return. We will send a prepaid label and instructions within one business day.',
          ],
        },
        {
          heading: 'Refunds',
          body: [
            'Once your return arrives and is inspected, we issue your refund to the original payment method within 3–5 business days.',
          ],
        },
        {
          heading: 'Exchanges',
          body: [
            'Want a different surface or size instead? Let us know and we will arrange an exchange — we cover shipping both ways on your first exchange.',
          ],
        },
      ]}
    />
  );
}
