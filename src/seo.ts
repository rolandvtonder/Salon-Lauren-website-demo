import imageSizes from './data/image-sizes.json';
import {beauty, services, specials} from './content';
import {routes, type Route} from './routes';
import {BASE} from './lib/url';
import {mapsUrl, site} from './site';

/**
 * Builds the <head> tags for one page: title, description, canonical URL,
 * Open Graph / Twitter cards, a preload for the page's hero photo, and
 * schema.org JSON-LD (the business, breadcrumbs and the price list).
 * The prerender step writes this into each page's static HTML.
 */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (path: string) => site.url.replace(/\/$/, '') + path;
const json = (data: unknown) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const sizes = imageSizes as Record<string, {w: number; h: number; widths: number[]}>;

function business(withCatalog = false) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${site.url}/#salon`,
    name: site.name,
    description: 'Hair and beauty salon in Kraaifontein offering haircuts, colour, highlights, smoothing treatments, blow-dries, gel nails, pedicures and massage.',
    url: abs('/'),
    image: abs('/og-image.jpg'),
    logo: abs('/apple-touch-icon.png'),
    telephone: site.phones.salon.intl,
    priceRange: site.priceRange,
    currenciesAccepted: 'ZAR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    hasMap: mapsUrl,
    areaServed: [{'@type': 'City', name: 'Kraaifontein'}, {'@type': 'City', name: 'Cape Town'}],
    sameAs: [site.facebook],
    contactPoint: [
      {'@type': 'ContactPoint', telephone: site.phones.salon.intl, contactType: 'customer service', areaServed: 'ZA', availableLanguage: ['English', 'Afrikaans']},
      {'@type': 'ContactPoint', telephone: site.phones.nella.intl, contactType: 'reservations', areaServed: 'ZA'},
    ],
  };
  // Only publish opening hours once they are confirmed (see site.ts).
  if (site.hoursConfirmed) {
    data.openingHoursSpecification = site.hours
      .filter((h) => h.spec)
      .map((h) => ({'@type': 'OpeningHoursSpecification', dayOfWeek: h.spec!.days, opens: h.spec!.opens, closes: h.spec!.closes}));
  }
  if (withCatalog) {
    const offer = (name: string, price?: string, description?: string) => {
      const o: Record<string, unknown> = {'@type': 'Offer', itemOffered: {'@type': 'Service', name, ...(description ? {description} : {})}};
      const nums = price?.match(/\d+/g);
      if (nums?.length === 1) Object.assign(o, {price: nums[0], priceCurrency: 'ZAR'});
      if (nums?.length === 2) o.priceSpecification = {'@type': 'PriceSpecification', minPrice: nums[0], maxPrice: nums[1], priceCurrency: 'ZAR'};
      return o;
    };
    data.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Hair & beauty services',
      itemListElement: [
        ...services.map((g) => ({
          '@type': 'OfferCatalog',
          name: g.title.map((l) => l.t).join(' '),
          itemListElement: g.items.filter((i) => i.price !== 'In salon').map((i) => offer(i.name, i.price, i.note)),
        })),
        {
          '@type': 'OfferCatalog',
          name: 'L. Beauty: nails, pedicures & massage',
          itemListElement: beauty.groups.flatMap((g) => g.items.map((i) => offer(i.name, i.price, i.note))),
        },
      ],
    };
  }
  return data;
}

function breadcrumbs(route: Route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: abs('/')},
      {'@type': 'ListItem', position: 2, name: route.label, item: abs(route.path)},
    ],
  };
}

function specialsList() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Salon Lauren hair specials',
    itemListElement: specials.map((s, i) => ({'@type': 'ListItem', position: i + 1, name: `${s.title}: ${s.price}`, description: s.detail})),
  };
}

export function headFor(route: Route): string {
  const url = abs(route.path);
  const hero = sizes[route.hero];
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex || site.noindex ? '<meta name="robots" content="noindex, follow" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${abs('/og-image.jpg')}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Salon Lauren, hair &amp; beauty salon, 54–56 Brighton Road, Kraaifontein" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="geo.region" content="ZA-WC" />`,
    `<meta name="geo.placename" content="${esc(`${site.address.suburb}, ${site.address.city}`)}" />`,
  ];
  if (hero) {
    const srcset = hero.widths.map((w) => `${BASE}img/${route.hero}-${w}.webp ${w}w`).join(', ');
    tags.push(`<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="(max-width: 767px) 100vw, 36vw" fetchpriority="high" />`);
  }
  if (route.id === 'home' || route.id === 'contact') tags.push(json(business()));
  if (route.id === 'services' || route.id === 'beauty') tags.push(json(business(true)));
  if (route.id === 'specials') tags.push(json(specialsList()));
  if (route.id !== 'home' && !route.noindex) tags.push(json(breadcrumbs(route)));
  return tags.join('\n    ');
}

export function sitemap(lastmod: string): string {
  const urls = routes
    .map((r) => `  <url><loc>${abs(r.path)}</loc><lastmod>${lastmod}</lastmod><priority>${r.id === 'home' ? '1.0' : '0.8'}</priority></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robots(): string {
  if (site.noindex) return 'User-agent: *\nDisallow: /\n';
  return `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`;
}
