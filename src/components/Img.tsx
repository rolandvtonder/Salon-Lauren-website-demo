import {BASE} from '../lib/url';
import type {CSSProperties} from 'react';
import imageSizes from '../data/image-sizes.json';
import photos from '../data/photos.json';

type Photo = {slug: string; alt: string; caption: string; tags: string[]; position?: string};

const sizes = imageSizes as Record<string, {w: number; h: number; widths: number[]}>;
export const photoBySlug = Object.fromEntries((photos as Photo[]).map((p) => [p.slug, p])) as Record<string, Photo>;

/**
 * A responsive WebP photo from public/img. Width and height are always set
 * (from the generated manifest) so nothing shifts while images load; below-
 * the-fold photos lazy-load, the page's hero is fetched first.
 */
export function Img({
  name,
  alt,
  className = '',
  sizes: sizesAttr = '100vw',
  priority = false,
  decorative = false,
  style,
}: {
  name: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Purely visual duplicate (e.g. a blurred backdrop): hidden from screen readers. */
  decorative?: boolean;
  style?: CSSProperties;
}) {
  const meta = sizes[name];
  const photo = photoBySlug[name];
  if (!meta || !photo) throw new Error(`Unknown photo "${name}" — add it to src/data/photos.json and run npm run images`);
  const srcSet = meta.widths.map((w) => `${BASE}img/${name}-${w}.webp ${w}w`).join(', ');
  return (
    <img
      src={`${BASE}img/${name}-${meta.widths[meta.widths.length - 1]}.webp`}
      srcSet={srcSet}
      sizes={sizesAttr}
      width={meta.w}
      height={meta.h}
      alt={decorative ? '' : (alt ?? photo.alt)}
      aria-hidden={decorative || undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={{objectPosition: photo.position, ...style}}
    />
  );
}
