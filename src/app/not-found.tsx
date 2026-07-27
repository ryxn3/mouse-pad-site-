import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <Image
        src={withBasePath('/assets/logo-mark.png')}
        alt="Pegaris"
        width={80}
        height={80}
        className="relative mb-8 h-16 w-auto opacity-80"
      />
      <p className="eyebrow relative">Error 404</p>
      <h1 className="heading-lg relative mt-4 text-gradient">Off the map.</h1>
      <p className="relative mt-4 max-w-md text-ink-muted">
        The page you&apos;re looking for has galloped away. Let&apos;s get you
        back on track.
      </p>
      <Link href="/" className="btn-primary relative mt-8">
        Back to home
      </Link>
    </div>
  );
}
