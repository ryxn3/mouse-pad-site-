import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { AccessoryShop } from '@/components/sections/AccessoryShop';
import { CtaSection } from '@/components/sections/CtaSection';
import { ACCESSORIES } from '@/lib/accessories';

export const metadata: Metadata = {
  title: 'Accessories',
  description:
    'Pegaris accessories — the woven Sling Keychain and the compression Arm Sleeve, each inspectable in 3D.',
};

export default function AccessoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessories"
        title="Carry the mark."
        description="Small things, finished to the same standard. Inspect each piece in 3D before you buy."
      />
      {ACCESSORIES.map((accessory, i) => (
        <div key={accessory.id}>
          {i > 0 && (
            <div className="container-px">
              <div className="hairline" />
            </div>
          )}
          <AccessoryShop accessory={accessory} flip={i % 2 === 1} />
        </div>
      ))}
      <CtaSection />
    </>
  );
}
