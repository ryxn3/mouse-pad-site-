import type { Metadata } from 'next';
import { InfoPage } from '@/components/ui/InfoPage';

export const metadata: Metadata = {
  title: 'Warranty',
  description: 'The Pegaris 2-year warranty against manufacturing defects.',
};

export default function WarrantyPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Warranty"
      description="Every Pegaris pad is backed by a 2-year warranty — because we build them to last."
      updated="July 2026"
      sections={[
        {
          heading: 'What is covered',
          body: [
            'Your Pegaris mousepad is covered for 2 years from the date of purchase against manufacturing defects, including stitching failure, base separation and premature surface wear under normal use.',
          ],
        },
        {
          heading: 'What is not covered',
          body: [
            'The warranty does not cover damage from misuse, accidents, improper cleaning, or normal cosmetic wear that does not affect performance.',
          ],
        },
        {
          heading: 'Making a claim',
          body: [
            'Contact support@pegaris.gg with your order number and a photo of the issue. If your claim is approved, we will repair or replace the product free of charge.',
          ],
        },
      ]}
    />
  );
}
