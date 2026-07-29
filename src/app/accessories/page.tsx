import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { AccessoryGrid } from '@/components/sections/AccessoryGrid';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Accessories',
  description:
    'Pegaris accessories — the Sling Keychain, compression Arm Sleeve and memory-foam Wrist Rest, each inspectable in 3D.',
};

export default function AccessoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessories"
        title="Carry the mark."
        description="Small things, finished to the same standard. Pick a piece to inspect it in 3D and configure your order."
      />
      <AccessoryGrid />
      <CtaSection />
    </>
  );
}
