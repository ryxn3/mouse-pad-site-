import { cn } from '@/lib/utils';

/** Minimal line-art icons representing each accessory, drawn to a common grid. */
export function AccessoryIcon({ id, className }: { id: string; className?: string }) {
  const common = {
    className: cn('h-full w-full', className),
    viewBox: '0 0 120 120',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (id === 'arm-sleeve') {
    return (
      <svg {...common} aria-hidden>
        {/* Tapered, curved sleeve */}
        <path d="M44 18 C 36 46, 44 82, 64 100 L 86 94 C 68 74, 62 44, 66 22 Z" />
        {/* Bicep opening */}
        <ellipse cx="55" cy="20" rx="11" ry="4.5" />
        {/* Speed lines */}
        <path d="M52 40 L 70 32" opacity="0.55" />
        <path d="M54 50 L 74 41" opacity="0.55" />
        <path d="M56 60 L 76 51" opacity="0.55" />
      </svg>
    );
  }

  if (id === 'wrist-rest') {
    return (
      <svg {...common} aria-hidden>
        {/* Long padded bar */}
        <rect x="14" y="46" width="92" height="28" rx="14" />
        {/* Stitch line */}
        <rect x="21" y="52" width="78" height="16" rx="8" opacity="0.4" />
        {/* Mark dot near the right */}
        <circle cx="90" cy="60" r="3.2" opacity="0.8" />
      </svg>
    );
  }

  // Sling keychain
  return (
    <svg {...common} aria-hidden>
      {/* Snap-hook loop */}
      <path d="M60 16 a 12 12 0 1 0 8 21" />
      {/* Gate */}
      <path d="M68 22 L 60 34" opacity="0.7" />
      {/* Split ring */}
      <circle cx="60" cy="44" r="6" />
      {/* Woven strap */}
      <rect x="50" y="52" width="20" height="52" rx="6" />
      {/* Centre stripe */}
      <path d="M60 58 L 60 98" opacity="0.5" />
    </svg>
  );
}
