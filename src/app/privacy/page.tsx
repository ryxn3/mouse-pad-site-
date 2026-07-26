import type { Metadata } from 'next';
import { InfoPage } from '@/components/ui/InfoPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pegasus collects, uses and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="We keep it simple: we collect only what we need, and we never sell your data."
      updated="July 2026"
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'When you place an order we collect the details needed to fulfil it — your name, shipping address, email and payment confirmation. We do not store full card numbers; payments are handled by our payment processor.',
            'When you browse the site we collect anonymous usage analytics to help us improve performance and experience.',
          ],
        },
        {
          heading: 'How we use it',
          body: [
            'We use your information to process orders, provide support, send order updates, and — only if you opt in — occasional product news. You can unsubscribe at any time.',
          ],
        },
        {
          heading: 'Data sharing',
          body: [
            'We share data only with the service providers required to run the store — payment, shipping and email delivery. We never sell your personal data to third parties.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You may request a copy of your data, ask us to correct it, or request deletion at any time by contacting support@pegasus.gg.',
          ],
        },
      ]}
    />
  );
}
