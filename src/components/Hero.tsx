import {hero} from '../content';
import {useHeroScroll} from '../hooks/useHeroScroll';
import {site} from '../site';
import {Img} from './Img';
import {Lines} from './Lines';

/**
 * Home hero. The salon's photos are phone-sized portraits, so instead of
 * stretching one across a 1920px screen (soft and pixelated) the crisp photo
 * sits in a tall window on the right, over a heavily blurred copy of itself
 * that fills the screen — the blur hides the upscale. On phones the crisp
 * photo fills the screen on its own.
 */
export function Hero() {
  const {root, stage} = useHeroScroll<HTMLElement>();

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-ink" aria-labelledby="hero-title">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div className="absolute inset-0 overflow-hidden max-md:hidden">
          <Img name="hero-balayage-waves" decorative sizes="480px" className="h-full w-full scale-125 object-cover blur-2xl brightness-[0.5] saturate-[1.1]" />
        </div>

        <figure className="absolute top-[clamp(88px,13vh,140px)] right-[clamp(20px,6vw,120px)] bottom-[clamp(88px,12vh,124px)] w-[min(36vw,600px)] overflow-hidden max-md:inset-0 max-md:w-auto">
          <Img name="hero-balayage-waves" priority sizes="(max-width: 767px) 100vw, 36vw" className="drift h-full w-full object-cover" />
        </figure>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(29_21_19/0.55),transparent_60%)] max-md:bg-[linear-gradient(180deg,rgb(29_21_19/0.7),rgb(29_21_19/0.25)_45%,rgb(29_21_19/0.8))]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(96px,14vh,150px)] md:px-14">
          <h1 id="hero-title" className="display text-[clamp(42px,7vw,128px)] text-paper drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <Lines lines={hero.lines} indentFirst />
          </h1>
          <p className="mt-8 max-w-[34ch] text-[16px] leading-[1.7] text-paper/90 md:mt-10 md:ml-[clamp(0px,14vw,260px)] md:text-[17px]">{hero.body}</p>
          <p className="caps mt-6 text-latte md:ml-[clamp(0px,14vw,260px)]">
            {site.address.street} · {site.address.suburb}
          </p>
        </div>
      </div>
    </section>
  );
}
