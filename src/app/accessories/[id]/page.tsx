import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AccessoryShop } from '@/components/sections/AccessoryShop';
import { CtaSection } from '@/components/sections/CtaSection';
import { ACCESSORIES } from '@/lib/accessories';

interface Params {
  params: Promise<{ id: string }>;
}

/** Pre-render a page for every accessory (required for static export). */
export function generateStaticParams() {
  return ACCESSORIES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const a = ACCESSORIES.find((x) => x.id === id);
  if (!a) return { title: 'Accessory' };
  return {
    title: a.name,
    description: `${a.name} — ${a.subtitle}. ${a.tagline}`,
  };
}

export default async function AccessoryDetailPage({ params }: Params) {
  const { id } = await params;
  const accessory = ACCESSORIES.find((a) => a.id === id);
  if (!accessory) notFound();

  return (
    <div className="pt-28 md:pt-32">
      <AccessoryShop accessory={accessory} />
      <CtaSection />
    </div>
  );
}
