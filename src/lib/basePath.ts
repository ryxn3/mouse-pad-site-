/**
 * Base path the app is served from (e.g. "/mouse-pad-site-" on GitHub Pages).
 * Inlined at build time from NEXT_PUBLIC_BASE_PATH; empty in local dev.
 *
 * next/image, next/link and the router prepend the configured basePath
 * automatically — use this helper only for raw asset URLs that bypass them
 * (e.g. loading an image into a canvas, or metadata icon/OG paths).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix an absolute (leading-slash) asset path with the base path. */
export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
