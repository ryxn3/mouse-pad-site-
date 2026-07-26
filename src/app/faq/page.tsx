import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about surfaces, sizes, sensor compatibility, cleaning, warranty, shipping and returns.',
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions."
        description="Everything you need to know before you buy. Still unsure? The contact page is one click away."
      />
      <FaqSection bare />
      <CtaSection />
    </>
  );
}
