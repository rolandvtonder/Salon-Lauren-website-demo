import {useEffect} from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` element the first time it scrolls
 * into view. Elements are only hidden when <html> has `.js` (see index.css),
 * so content is always visible to crawlers and to visitors without JavaScript.
 */
export function useReveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      {rootMargin: '0px 0px -8% 0px'},
    );

    const watch = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();

    // Pick up anything React adds later (e.g. gallery filters).
    const mo = new MutationObserver(watch);
    mo.observe(document.body, {childList: true, subtree: true});

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
