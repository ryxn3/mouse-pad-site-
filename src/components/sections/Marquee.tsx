'use client';

const WORDS = [
  'Micro-Woven Cloth',
  'Anti-Fray Stitching',
  'Natural Rubber Base',
  'Tournament Grade',
  'Water Resistant',
  'Precision Tracking',
];

/** A slow, understated marquee of product credentials. */
export function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-6">
      <div className="flex w-max animate-marquee gap-12">
        {items.map((word, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-ink-muted">
              {word}
            </span>
            <span className="h-1 w-1 rounded-full bg-crimson" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
