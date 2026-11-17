/**
 * Page transitions for a real multi-page site. Each page is its own prerendered
 * HTML file (best for SEO), so moving between pages is a normal navigation; we
 * just dress it: three slabs (espresso, lavender, cream) wipe in from the right,
 * the browser loads the next page, and the slabs wipe off to the left there.
 *
 * The cover is CSS-only (`.leaving` / `.arriving` on <html>, see index.css);
 * the inline script in index.html puts it up before first paint on arrival.
 */

const KEY = 'sl-nav';
const WIPE_MS = 720;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function go(href: string) {
  if (reduced()) {
    window.location.assign(href);
    return;
  }
  document.documentElement.classList.add('leaving');
  window.setTimeout(() => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked: arrive without the cover */
    }
    window.location.assign(href);
  }, WIPE_MS);
}

export function initNav(): () => void {
  const html = document.documentElement;

  // Arrived through a wipe: lift the cover now that the page has rendered.
  if (html.classList.contains('arriving')) {
    requestAnimationFrame(() => requestAnimationFrame(() => html.classList.add('arrived')));
    window.setTimeout(() => html.classList.remove('arriving', 'arrived'), 1400);
  }

  // Back/forward restores the page from cache with the cover still up.
  const onShow = (e: PageTransitionEvent) => {
    if (e.persisted) html.classList.remove('leaving', 'arriving', 'arrived');
  };

  const internal = (e: Event): {a: HTMLAnchorElement; url: URL} | null => {
    const a = (e.target as Element | null)?.closest?.('a');
    if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return null;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return {a, url};
  };

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const hit = internal(e);
    if (!hit) return;
    // Same page (with or without a #hash): let the browser / Lenis handle it.
    if (hit.url.pathname === window.location.pathname) return;
    e.preventDefault();
    go(hit.url.href);
  };

  // Warm the cache for the next page as soon as a link is hovered or focused.
  const fetched = new Set<string>();
  const onIntent = (e: Event) => {
    const hit = internal(e);
    if (!hit || hit.url.pathname === window.location.pathname || fetched.has(hit.url.pathname)) return;
    fetched.add(hit.url.pathname);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = hit.url.pathname;
    document.head.appendChild(link);
  };

  window.addEventListener('pageshow', onShow);
  document.addEventListener('click', onClick);
  document.addEventListener('pointerover', onIntent, {passive: true});
  document.addEventListener('focusin', onIntent);
  return () => {
    window.removeEventListener('pageshow', onShow);
    document.removeEventListener('click', onClick);
    document.removeEventListener('pointerover', onIntent);
    document.removeEventListener('focusin', onIntent);
  };
}
