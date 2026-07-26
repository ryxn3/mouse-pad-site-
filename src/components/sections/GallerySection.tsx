'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GALLERY } from '@/lib/products';
import type { GalleryItem } from '@/types';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/basePath';

interface GallerySectionProps {
  bare?: boolean;
}

/**
 * Premium gallery. Macro texture studies, floating renders and the setup —
 * rendered as tactile gradient tiles with the brand logo where fitting.
 */
export function GallerySection({ bare = false }: GallerySectionProps) {
  return (
    <section className="container-px py-24 md:py-32">
      {!bare && (
        <SectionHeading
          eyebrow="Gallery"
          title="Up close."
          description="Macro cloth texture, the rubber base, stitched edges, and the mark — every surface tells the same story of care."
        />
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:auto-rows-[220px]"
      >
        {GALLERY.map((item, i) => (
          <motion.figure
            key={item.id}
            variants={staggerItem}
            className={cn(
              'group relative overflow-hidden rounded-3xl border border-white/[0.06]',
              i === 0 && 'lg:col-span-2 lg:row-span-2',
              i === 3 && 'lg:col-span-1 lg:row-span-2',
            )}
          >
            <GalleryVisual item={item} index={i} />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5">
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  {item.title}
                </p>
                <p className="text-xs text-ink-muted">{item.caption}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/** Renders a real photo when the tile has one, else a tactile procedural visual. */
function GalleryVisual({ item, index }: { item: GalleryItem; index: number }) {
  const { kind, image, title } = item;

  // Real photography takes priority when supplied.
  if (image) {
    return (
      <div className="relative h-full min-h-[200px] w-full overflow-hidden bg-[#0a0a0a]">
        <Image
          src={withBasePath(image)}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  if (kind === 'render' || index === 3) {
    return (
      <div className="relative flex h-full min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-surface-overlay to-background">
        <div className="absolute inset-0 bg-radial-glow opacity-40" />
        <Image
          src={withBasePath('/assets/logo.png')}
          alt="Pegaris mark"
          width={160}
          height={160}
          className="logo-on-dark relative w-1/2 max-w-[160px] opacity-90 transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    );
  }

  if (kind === 'setup') {
    return (
      <div className="relative h-full min-h-[200px] w-full overflow-hidden bg-gradient-to-b from-[#0d0d0d] to-[#050505]">
        <Image
          src={withBasePath('/assets/mousepad-hero.png')}
          alt="Pegaris mousepad"
          fill
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  // Macro cloth / rubber / stitch texture — procedural fabric weave.
  return (
    <div
      className="h-full min-h-[200px] w-full transition-transform duration-700 group-hover:scale-105"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 4px)',
      }}
    />
  );
}
