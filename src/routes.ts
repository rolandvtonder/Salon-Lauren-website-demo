/**
 * Every page on the site. The build prerenders each one to its own HTML file
 * (dist/<path>/index.html) with this title and description, so search engines
 * get real content and real metadata for every page.
 */

import {sitePath} from './lib/url';

export type RouteId = 'home' | 'services' | 'specials' | 'gallery' | 'team' | 'beauty' | 'contact' | 'notfound';

export type Route = {
  id: RouteId;
  path: string;
  /** Short name used in the menu and breadcrumbs. */
  label: string;
  /** <title>: under ~60 characters, keyword first, brand last. */
  title: string;
  /** Meta description: under ~155 characters, what + where + call to action. */
  description: string;
  /** Photo slug preloaded as the page's largest image. */
  hero: string;
  noindex?: boolean;
};

export const routes: Route[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'Salon Lauren | Hair & Beauty Salon in Kraaifontein',
    description: 'Haircuts, colour, highlights, smoothing treatments, blow-dries, nails and waxing at Salon Lauren, Shop 54 Brighton Road, Kraaifontein. Book on WhatsApp.',
    hero: 'hero-balayage-waves',
  },
  {
    id: 'services',
    path: '/services/',
    label: 'Services',
    title: 'Hair Services & Prices in Kraaifontein | Salon Lauren',
    description: 'Cuts, full colour from R450, full-head highlights R750, half-head R500, smoothing treatments and pensioner blow-dries at Salon Lauren, Kraaifontein.',
    hero: 'balayage-waves-3',
  },
  {
    id: 'specials',
    path: '/specials/',
    label: 'Specials',
    title: 'Hair Specials & Deals | Salon Lauren Kraaifontein',
    description: 'Full-head highlights R750, half-head R500, full colour R450–R750 with free trim & treatment, and R120 pensioner blow-dries Monday to Thursday.',
    hero: 'highlights-honey',
  },
  {
    id: 'gallery',
    path: '/gallery/',
    label: 'Gallery',
    title: 'Before & After Hair Gallery | Salon Lauren',
    description: 'Real before-and-after results from Salon Lauren in Kraaifontein: smoothing, colour, highlights, bobs, pixie cuts, curls and updos.',
    hero: 'balayage-waves-2',
  },
  {
    id: 'team',
    path: '/team/',
    label: 'Our team',
    title: 'Meet Our Hairstylists | Salon Lauren Kraaifontein',
    description: 'Meet the stylists and beauty therapist at Salon Lauren on Brighton Road, Kraaifontein: friendly, experienced hair care for every texture.',
    hero: 'team-salon',
  },
  {
    id: 'beauty',
    path: '/l-beauty/',
    label: 'L. Beauty',
    title: 'Nails, Waxing & Lashes | L. Beauty at Salon Lauren',
    description: 'Gel nails from R180, pedicures, waxing from R80, lash lift & tint R260 and massages from R150 with L. Beauty at Salon Lauren, Kraaifontein.',
    hero: 'nails-french',
  },
  {
    id: 'contact',
    path: '/contact/',
    label: 'Contact',
    title: 'Book & Contact | Salon Lauren, Brighton Rd Kraaifontein',
    description: 'Book at Salon Lauren: WhatsApp 074 845 7934 or call 076 029 7775. Find us at Shop 54 Brighton Road, Kraaifontein, Cape Town.',
    hero: 'short-grey',
  },
];

export const notFound: Route = {
  id: 'notfound',
  path: '/404',
  label: 'Page not found',
  title: 'Page not found | Salon Lauren',
  description: 'This page could not be found. Visit Salon Lauren, Shop 54 Brighton Road, Kraaifontein.',
  hero: 'glossy-layers',
  noindex: true,
};

export function findRoute(path: string): Route {
  const p = sitePath(path.split(/[?#]/)[0]).replace(/\/index\.html$/, '/');
  const withSlash = p.endsWith('/') ? p : `${p}/`;
  return routes.find((r) => r.path === withSlash) ?? notFound;
}
