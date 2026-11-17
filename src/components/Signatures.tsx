import {link} from '../lib/url';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {signatures} from '../content';
import {Img} from './Img';

/**
 * The three signature services: tall panels slide in from the right one
 * after another (a third of a 1920px screen is ~640px — the photos' native
 * width, so they stay sharp). Each whole panel links to its price list.
 * Without JS, or with reduced motion, the panels are simply in place.
 */
export function Signatures() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {threshold: 0.2},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="relative bg-ink" aria-labelledby="signatures-title">
      <h2 id="signatures-title" className="sr-only">
        Signature services
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {signatures.map((s, i) => (
          <article
            key={s.id}
            className={`group relative overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[82svh] motion-reduce:transition-none ${
              shown ? 'translate-x-0' : '[.js_&]:translate-x-[calc(100%_+_100vw)] motion-reduce:translate-x-0'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: s.tint} as CSSProperties}
          >
            <Img name={s.photo} sizes="(max-width: 767px) 100vw, 34vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(29_21_19/0.7),transparent_42%,transparent_62%,rgb(29_21_19/0.75))]" />
            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <div>
                <p className="caps text-paper/70">0{i + 1} / 03</p>
                <h3 className="display mt-3 text-[clamp(38px,3.6vw,64px)] text-paper">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h3>
              </div>
              <div className={`transition-opacity delay-[1300ms] duration-700 ${shown ? 'opacity-100' : '[.js_&]:opacity-0'}`}>
                <dl className="space-y-3">
                  {s.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-paper/65">{k}</dt>
                      <dd className="text-[16px] text-paper">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={link(s.href)} className="caps mt-6 inline-flex items-center gap-3 text-latte after:absolute after:inset-0">
                  See prices <span aria-hidden className="transition-transform duration-500 ease-silk group-hover:translate-x-1.5">→</span>
                  <span className="sr-only">for {s.name.join(' ')}</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
