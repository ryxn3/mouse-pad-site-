import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

// Required so the route is emitted as a static file with `output: export`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
