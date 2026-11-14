/**
 * Image optimization utilities for Lux.raw luxury fashion platform.
 * Handles blur placeholders, srcset generation, and WebP conversion helpers.
 */

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface OptimizedImageProps {
  src: string;
  srcSet: string;
  blurDataURL: string;
  sizes: string;
  width: number;
  height: number;
}

/** Standard breakpoints for luxury product imagery */
export const LUXURY_IMAGE_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536, 1920];

/** Default quality settings — higher for luxury presentation */
export const IMAGE_QUALITY = {
  thumbnail: 70,
  card: 80,
  detail: 90,
  hero: 95,
} as const;

export type ImageQualityPreset = keyof typeof IMAGE_QUALITY;

/**
 * Generate a srcset string for responsive images using Next.js image loader paths.
 *
 * @param src - Base image URL or path
 * @param breakpoints - Array of widths for srcset entries
 * @returns srcset string
 */
export function generateSrcSet(
  src: string,
  breakpoints: number[] = LUXURY_IMAGE_BREAKPOINTS
): string {
  return breakpoints
    .map((w) => `${buildNextImageUrl(src, w)} ${w}w`)
    .join(', ');
}

/**
 * Build a Next.js /_next/image optimized URL.
 */
export function buildNextImageUrl(src: string, width: number, quality = 85): string {
  const encoded = encodeURIComponent(src);
  return `/_next/image?url=${encoded}&w=${width}&q=${quality}`;
}

/**
 * Generate a sizes attribute string for common luxury layout patterns.
 *
 * @param layout - 'hero' | 'grid' | 'card' | 'thumbnail'
 */
export function generateSizesAttr(
  layout: 'hero' | 'grid' | 'card' | 'thumbnail'
): string {
  const sizesMap: Record<string, string> = {
    hero: '100vw',
    grid: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
    thumbnail: '(max-width: 640px) 50vw, 15vw',
  };
  return sizesMap[layout] ?? '100vw';
}

/**
 * Generate a low-quality base64 blur placeholder.
 * In production, use plaiceholder or similar server-side library.
 * This returns a minimal SVG-based blur for client-side fallback.
 *
 * @param width - Image width
 * @param height - Image height
 * @param color - Dominant hex color (optional, defaults to luxury gold tone)
 */
export function generateBlurPlaceholder(
  width: number,
  height: number,
  color = '#C9A86C'
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="${color}" filter="url(#blur)"/>
    </svg>
  `.trim();

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Check if WebP is supported in the current browser.
 * Use in client components only.
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return true; // SSR assumes support
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
}

/**
 * Returns the recommended image format based on browser support.
 */
export function getOptimalFormat(): 'webp' | 'jpeg' {
  return supportsWebP() ? 'webp' : 'jpeg';
}
