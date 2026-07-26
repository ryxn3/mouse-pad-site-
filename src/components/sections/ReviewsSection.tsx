'use client';

import { Star, BadgeCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { REVIEWS, SURFACES } from '@/lib/products';
import type { Review } from '@/types';

/** Auto-scrolling wall of verified five-star reviews. */
export function ReviewsSection() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section className="overflow-hidden py-28 md:py-36">
      <div className="container-px">
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted by players who don't compromise."
          description="Thousands of verified purchases. A five-star standard we hold ourselves to."
        />
      </div>

      <div className="relative mt-16">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {row.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const accent = SURFACES[review.surface].accent;
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-white/[0.06] bg-surface-raised/40 p-6">
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-crimson text-crimson" />
        ))}
      </div>
      <h4 className="font-display text-base font-semibold">{review.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {review.body}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ background: `${accent}33` }}
        >
          {review.name.charAt(0)}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">{review.name}</p>
          <p className="text-xs text-ink-faint">{review.handle}</p>
        </div>
        {review.verified && (
          <span className="flex items-center gap-1 text-xs text-ink-faint">
            <BadgeCheck className="h-4 w-4 text-crimson-soft" /> Verified
          </span>
        )}
      </div>
    </article>
  );
}
