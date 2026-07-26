import type { Metadata } from 'next';
import { Configurator } from '@/components/sections/Configurator';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Configure your Pegasus Pro — choose Speed, Balance or Control, in two sizes, and inspect it in an interactive 3D viewer.',
};

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <Configurator />
      <ComparisonSection />
      <FeaturesSection />
      <ReviewsSection />
      <CtaSection />
    </div>
  );
}
