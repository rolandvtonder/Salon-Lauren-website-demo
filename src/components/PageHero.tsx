import {link} from '../lib/url';
import type {ReactNode} from 'react';
import type {Line} from '../content';
import {useHeroScroll} from '../hooks/useHeroScroll';
import {Img} from './Img';
import {Lines} from './Lines';

/**
 * The opening of every inner page: breadcrumb, a two-line headline (upright +
 * italic) and the page's photo in a tall window over its own blurred copy —
 * the same composition and scroll-away as the home hero, a little shorter.
 */
export function PageHero({
  label,
  lines,
  intro,
  photo,
  children,
}: {
  label: string;
  lines: Line[];
  intro: string;
  photo: string;
  children?: ReactNode;
}) {
  const {root, stage} = useHeroScroll<HTMLElement>();

  return (
    <section ref={root} className="relative h-[86svh] min-h-[600px] overflow-hidden bg-ink" aria-labelledby="page-title">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div className="absolute inset-0 overflow-hidden max-md:hidden">
          <Img name={photo} decorative sizes="480px" className="h-full w-full scale-125 object-cover blur-2xl brightness-[0.45]" />
        </div>
        <figure className="absolute top-[clamp(88px,13vh,140px)] right-[clamp(20px,6vw,120px)] bottom-[clamp(40px,8vh,96px)] w-[min(34vw,560px)] overflow-hidden max-md:inset-0 max-md:w-auto">
          <Img name={photo} priority sizes="(max-width: 767px) 100vw, 36vw" className="drift h-full w-full object-cover" />
        </figure>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(29_21_19/0.6),transparent_62%)] max-md:bg-[linear-gradient(180deg,rgb(29_21_19/0.72),rgb(29_21_19/0.3)_45%,rgb(29_21_19/0.85))]" />

        <div className="absolute inset-0 mx-auto flex max-w-[1680px] flex-col justify-end px-5 pb-[clamp(48px,10vh,110px)] md:px-14">
          <nav aria-label="Breadcrumb" className="caps mb-6 text-paper/70">
            <ol className="flex gap-2">
              <li>
                <a href={link('/')} className="link">Home</a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-latte">{label}</li>
            </ol>
          </nav>
          <h1 id="page-title" className="display text-[clamp(52px,8vw,150px)] text-paper drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <Lines lines={lines} />
          </h1>
          <p className="mt-7 max-w-[40ch] text-[16px] leading-[1.7] text-paper/90 md:text-[17px]">{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
