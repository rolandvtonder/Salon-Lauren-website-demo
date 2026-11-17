import {link} from '../lib/url';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {routes} from '../routes';
import {bookingUrl, site} from '../site';
import {scrollToTop} from '../lib/scroll';

/**
 * The menu: three slabs wipe in from the right one after another
 * (espresso, lavender, cream); the cream one stays and holds the pages.
 * Hovering an item ripples it like heat off a blow-dryer — an SVG turbulence
 * + displacement filter whose strength and phase are animated per frame.
 */
export function Menu({id, open, current, onClose}: {id: string; open: boolean; current: string; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 8).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      disp.current?.setAttribute('scale', '0');
    };
  }, [hover]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the slabs have arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: espresso → lavender → cream, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id={id} inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button type="button" aria-label="Close menu" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default" />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-lavender')} style={delay(1)} />
      <nav className={slab('on-paper flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-24 pb-28 text-ink md:px-10')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {routes.map((r, i) => {
            const here = r.path === current;
            return (
              <li
                key={r.path}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.05}s` : '0s'} as CSSProperties}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={link(r.path)}
                  aria-current={here ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(i)}
                  onBlur={() => setHover(-1)}
                  onClick={(e) => {
                    if (!here) return; // other pages: the page wipe takes over (lib/nav.ts)
                    e.preventDefault();
                    onClose();
                    scrollToTop();
                  }}
                  className={`display relative inline-block py-1 text-[clamp(32px,3vw,46px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  } ${here ? 'it text-rose' : ''}`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {r.label}
                  <sup className="caps absolute top-1 -right-7 text-[10px] tracking-normal text-ink/50">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-ink/60">
            {site.address.street}, {site.address.suburb}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <a href={bookingUrl} target="_blank" rel="noopener" className="caps link text-ink/85 hover:text-berry">
              WhatsApp
            </a>
            <a href={site.facebook} target="_blank" rel="noopener" className="caps link text-ink/85 hover:text-berry">
              Facebook
            </a>
            <a href={`tel:${site.phones.salon.intl}`} className="caps link text-ink/85 hover:text-berry">
              {site.phones.salon.display}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
