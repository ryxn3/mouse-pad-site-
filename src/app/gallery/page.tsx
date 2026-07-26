import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { GallerySection } from '@/components/sections/GallerySection';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Macro cloth texture, the rubber base, stitched edges and floating renders — the Pegaris gallery.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Up close, in detail."
        description="Macro studies of the weave and stitching, floating renders, and a look at the pad in its natural habitat."
      />
      <GallerySection bare />
      <CtaSection />
    </>
  );
}
