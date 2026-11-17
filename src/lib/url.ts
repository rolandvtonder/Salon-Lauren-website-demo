/**
 * The folder the site is served from: "/" on its own domain, or
 * "/Salon-Lauren-website-demo/" on GitHub Pages (set by BASE_PATH at build).
 */
export const BASE = import.meta.env.BASE_URL;

/** Turns a site path like "/services/" into a link that works under BASE. */
export const link = (path: string) => BASE.replace(/\/$/, '') + path;

/** Strips BASE off a browser pathname, giving back a site path like "/services/". */
export const sitePath = (pathname: string) => {
  const b = BASE.replace(/\/$/, '');
  return b && pathname.startsWith(b) ? pathname.slice(b.length) || '/' : pathname;
};
