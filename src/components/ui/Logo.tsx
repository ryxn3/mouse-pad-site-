import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/basePath';

interface LogoProps {
  /** Size of the mark in pixels. */
  size?: number;
  /** Show the wordmark next to the mark. */
  withText?: boolean;
  className?: string;
  href?: string | null;
  priority?: boolean;
}

/**
 * The Pegaris brand lockup. Uses the supplied logo asset directly.
 * On dark surfaces we invert it at render time (see `.logo-on-dark`) so the
 * original black artwork reads as white — the asset itself is never modified.
 */
export function Logo({
  size = 40,
  withText = true,
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image
        src={withBasePath('/assets/logo.png')}
        alt="Pegaris"
        width={size}
        height={size}
        priority={priority}
        className="logo-on-dark h-auto w-auto object-contain"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span className="font-display text-lg font-semibold tracking-[0.2em] text-ink">
          PEGARIS
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Pegaris — home" className="inline-flex">
      {content}
    </Link>
  );
}
