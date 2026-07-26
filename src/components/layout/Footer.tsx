'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Instagram, Twitter, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { FOOTER_LINKS, SITE } from '@/lib/constants';

const SOCIAL_ICONS = {
  Instagram: Instagram,
  X: Twitter,
  Discord: MessageCircle,
} as const;

/** Site footer with navigation, socials and a newsletter capture. */
export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative border-t border-white/5 bg-background pt-20">
      <div className="container-px">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Logo size={40} />
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
              {SITE.tagline} Premium, tournament-grade gaming mousepads,
              crafted without compromise.
            </p>
            <form onSubmit={handleSubscribe} className="mt-2 max-w-sm">
              <label htmlFor="newsletter" className="eyebrow mb-3 block">
                Join the newsletter
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-5 focus-within:border-white/30">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson text-white transition-colors hover:bg-crimson-soft"
                >
                  {subscribed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 pl-5 text-xs text-crimson-soft">
                  You&apos;re in. Welcome to the herd.
                </p>
              )}
            </form>
          </div>

          <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
          <FooterColumn title="Support" links={FOOTER_LINKS.support} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {(['Instagram', 'X', 'Discord'] as const).map((label) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all duration-300 hover:border-white/30 hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow mb-5">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
