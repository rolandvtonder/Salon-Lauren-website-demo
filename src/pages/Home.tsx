import {link} from '../lib/url';
import {d} from '../lib/style';
import {about, specials} from '../content';
import {Hero} from '../components/Hero';
import {Hours} from '../components/Hours';
import {Img} from '../components/Img';
import {Lines} from '../components/Lines';
import {Signatures} from '../components/Signatures';
import {bookingUrl, mapsUrl, site} from '../site';

const transformations = ['ba-smooth-plum', 'ba-silver-pixie', 'ba-smooth-long'];

export function Home() {
  return (
    <>
      <Hero />
      <Signatures />

      {/* About */}
      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-36" aria-labelledby="about-title">
        <div className="mx-auto grid max-w-[1680px] items-center gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <p className="caps text-rose" data-reveal>
              {about.kicker}
            </p>
            <h2 id="about-title" className="display mt-5 text-[clamp(46px,6vw,104px)]" data-reveal style={d(1)}>
              <Lines lines={about.lines} />
            </h2>
            <div className="mt-10 max-w-[56ch] space-y-5 text-[17px] leading-[1.75] text-ink/85" data-reveal style={d(2)}>
              {about.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal style={d(3)}>
              <a href={link('/services/')} className="btn">
                Services & prices
              </a>
              <a href={link('/team/')} className="btn btn-line">
                Meet the team
              </a>
            </div>
          </div>
          <div className="relative" data-reveal style={d(1)}>
            <Img name="highlights-blonde" sizes="(max-width: 767px) 90vw, 40vw" className="aspect-[4/5] w-full object-cover" />
            <Img
              name="glossy-layers"
              sizes="(max-width: 767px) 40vw, 16vw"
              className="absolute -bottom-10 -left-6 aspect-[3/4] w-[38%] border-[6px] border-paper object-cover md:-left-14"
            />
          </div>
        </div>
      </section>

      {/* Before & after */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-32" aria-labelledby="ba-title">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="ba-title" className="display text-[clamp(46px,6vw,104px)]" data-reveal>
              Before <span className="it text-latte">& after</span>
            </h2>
            <a href={link('/gallery/')} className="btn btn-line" data-reveal>
              See the gallery <span aria-hidden>→</span>
            </a>
          </div>
          <ul className="mt-14 grid gap-[3px] md:grid-cols-3">
            {transformations.map((slug, i) => (
              <li key={slug} data-reveal style={d(i)}>
                <Img name={slug} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-square w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specials */}
      <section className="on-paper bg-lavender px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="specials-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div data-reveal>
            <h2 id="specials-title" className="display text-[clamp(46px,6vw,104px)]">
              Hair <span className="it">specials</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-[17px] text-ink/85">Professional colour and highlights at friendly prices, always finished with a treatment. Bookings are essential.</p>
            <a href={link('/specials/')} className="btn mt-8 bg-ink text-paper hover:bg-mocha hover:text-paper">
              All specials <span aria-hidden>→</span>
            </a>
          </div>
          <ul className="divide-y divide-ink/20 border-y border-ink/20">
            {specials.map((s, i) => (
              <li key={s.title} className="flex items-baseline justify-between gap-6 py-6" data-reveal style={d(i)}>
                <div>
                  <h3 className="display text-[clamp(26px,2.4vw,38px)]">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-ink/75">{s.detail}</p>
                </div>
                <p className="display shrink-0 text-[clamp(28px,2.8vw,46px)] italic">{s.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* L. Beauty */}
      <section className="relative overflow-hidden bg-mocha" aria-labelledby="beauty-title">
        <div className="mx-auto grid max-w-[1680px] items-stretch md:grid-cols-2">
          <Img name="nails-french" sizes="(max-width: 767px) 100vw, 50vw" className="h-full max-h-[720px] w-full object-cover max-md:aspect-[4/3]" />
          <div className="flex flex-col justify-center px-5 py-20 md:px-16" data-reveal>
            <p className="caps text-latte">Also at Salon Lauren</p>
            <h2 id="beauty-title" className="display mt-4 text-[clamp(46px,5.4vw,96px)]">
              L. <span className="it">Beauty</span>
            </h2>
            <p className="mt-6 max-w-[42ch] text-[17px] text-paper/85">
              Gel nails from R180, pedicures and relaxing massages: everything you need under one roof.
            </p>
            <a href={link('/l-beauty/')} className="btn mt-8 self-start">
              Nails & pedicures <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="visit-title">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <h2 id="visit-title" className="display text-[clamp(46px,6vw,104px)]">
              Visit <span className="it text-rose">us</span>
            </h2>
            <p className="mt-6 text-[19px] leading-[1.6]">
              {site.address.street}
              <br />
              {site.address.suburb}, {site.address.city}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={bookingUrl} target="_blank" rel="noopener" className="btn bg-ink text-paper hover:bg-mocha hover:text-paper">
                Book on WhatsApp
              </a>
              <a href={`tel:${site.phones.salon.intl}`} className="btn btn-line">
                Call {site.phones.salon.display}
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener" className="btn btn-line">
                Directions
              </a>
            </div>
          </div>
          <div data-reveal style={d(1)}>
            <h3 className="caps text-rose">Opening hours</h3>
            <Hours className="mt-3" />
          </div>
        </div>
      </section>
    </>
  );
}
