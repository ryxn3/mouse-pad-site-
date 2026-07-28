import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { AccessoryShop } from '@/components/sections/AccessoryShop';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Accessories',
  description:
    'Pegaris accessories — the woven Sling Keychain with matte-black snap-hook clasp and crimson centre stripe.',
};

export default function AccessoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessories"
        title="Carry the mark."
        description="Small things, finished to the same standard. Inspect each piece in 3D before you buy."
      />
      <AccessoryShop />
      <CtaSection />
    </>
  );
}
