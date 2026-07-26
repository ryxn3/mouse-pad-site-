import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency. */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

/** Clamp a number between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** Create a stable id for cart line items. */
export function lineItemId(
  productId: string,
  surface: string,
  size: string,
  color: string,
): string {
  return `${productId}__${surface}__${size}__${color}`;
}
