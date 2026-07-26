import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { specsFor } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'The engineering behind Pegaris — micro-woven cloth, anti-fray stitching, a natural rubber base, and sensor-optimised surfaces.',
};

const LAYERS = [
  {
    icon: 'grid',
    title: 'Micro-Woven Cloth',
    body: 'A tightly controlled textile with a uniform weave density. Consistency across the entire surface means your sensor tracks identically at the centre and at the very edge.',
  },
  {
    icon: 'droplets',
    title: 'Spill-Repellent Coating',
    body: 'A water-resistant treatment bonded to the fibres. Drinks and sweat bead on the surface and wipe away in seconds — without dulling the glide.',
  },
  {
    icon: 'scissors',
    title: 'Anti-Fray Stitching',
    body: 'A dense, hand-finished border stitched to resist peeling and fraying. The edge stays flat and sharp for the life of the pad.',
  },
  {
    icon: 'layers',
    title: 'Natural Rubber Base',
    body: 'A textured, high-grip base that grips the desk and refuses to move — even through the most aggressive low-sensitivity swipes.',
  },
];

export default function TechnologyPage() {
  // Reference spec sheet (Balance / Medium) for the specifications block.
  const specs = specsFor('balance', 'm');

  return (
    <>
      <PageHeader
        eyebrow="Technology"
        title="Precision, layer by layer."
        description="Every Pegaris pad is built from four engineered layers, each tuned to a single job — so the whole performs like nothing else."
      />

      {/* Layers */}
      <section className="container-px py-20 md:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-surface-raised/40 p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-crimson/0 blur-3xl transition-all duration-500 group-hover:bg-crimson/15" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-crimson-soft">
                  <FeatureIcon name={layer.icon} className="h-7 w-7" />
                </div>
                <h3 className="heading-md mb-3">{layer.title}</h3>
                <p className="leading-relaxed text-ink-muted">{layer.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sensor compatibility */}
      <section className="container-px py-20 md:py-28">
        <div className="grid items-center gap-12 rounded-4xl border border-white/[0.06] bg-surface-raised/40 p-8 md:grid-cols-2 md:p-16">
          <div>
            <span className="eyebrow">Sensor Optimised</span>
            <h2 className="heading-lg mt-4 text-gradient">
              Flawless with any mouse.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Surface contrast and weave are calibrated for both optical and
              laser sensors across every major brand — from 400 DPI precision
              play to 3200+ DPI speed. No spin-outs. No acceleration surprises.
              Just honest, one-to-one tracking.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'scan', label: 'Optical' },
              { icon: 'crosshair', label: 'Laser' },
              { icon: 'target', label: 'Any DPI' },
              { icon: 'wind', label: 'Zero accel' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] py-8"
              >
                <FeatureIcon name={item.icon} className="h-7 w-7 text-crimson-soft" />
                <span className="text-sm text-ink">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="container-px py-20 md:py-28">
        <SectionHeading
          eyebrow="Specifications"
          title="The full spec sheet."
          description="Pegaris Pro, Balance surface, Medium size. Specs adjust with your configuration on the product page."
        />
        <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-3xl border border-white/[0.06]">
          <dl className="divide-y divide-white/5">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between bg-surface-raised/30 px-6 py-4"
              >
                <dt className="text-sm text-ink-muted">{spec.label}</dt>
                <dd className="text-sm font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FeaturesSection />
      <ComparisonSection />
      <CtaSection />
    </>
  );
}
