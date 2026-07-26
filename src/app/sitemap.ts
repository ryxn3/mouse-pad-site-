import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

// Required so the route is emitted as a static file with `output: export`.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/products',
    '/technology',
    '/gallery',
    '/faq',
    '/contact',
    '/checkout',
    '/privacy',
    '/returns',
    '/shipping',
    '/warranty',
  ];

  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
