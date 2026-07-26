import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { SurfacesSection } from '@/components/sections/SurfacesSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { EsportsSection } from '@/components/sections/EsportsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { QuizSection } from '@/components/sections/QuizSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaSection } from '@/components/sections/CtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <SurfacesSection />
      <FeaturesSection />
      <ComparisonSection />
      <EsportsSection />
      <GallerySection />
      <QuizSection />
      <ReviewsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
