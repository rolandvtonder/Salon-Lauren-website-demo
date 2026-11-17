import {useEffect, useRef} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero transition is a camera move, not a fade: as you scroll past, the
 * stage blurs, dims and shrinks back while sliding at half speed. Written
 * straight to the element every frame — no React state while scrolling.
 */
export function useHeroScroll<T extends HTMLElement>() {
  const root = useRef<T>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          s.style.transform = '';
          s.style.filter = '';
          return;
        }
        const r = el.getBoundingClientRect();
        const h = r.height || window.innerHeight;
        const p = clamp(-r.top / h);
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 16).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return {root, stage};
}
