import {link} from '../lib/url';
import {services} from '../content';
import {Img} from '../components/Img';
import {Lines} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {PriceList} from '../components/PriceList';
import {d} from '../lib/style';
import {bookingUrl} from '../site';

export function Services() {
  return (
    <>
      <PageHero
        label="Services"
        lines={[{t: 'Services'}, {t: '& prices', i: true}]}
        intro="Cuts, colour, highlights, smoothing and styling for every length and texture, with professional products in a friendly salon in Kraaifontein."
        photo="balayage-waves-3"
      >
        <nav aria-label="Service categories" className="mt-8 flex flex-wrap gap-2">
          {services.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="caps border border-paper/40 px-4 py-2.5 text-paper transition-colors hover:bg-paper hover:text-ink">
              {g.title.map((l) => l.t).join(' ')}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="on-paper bg-paper text-ink">
        {services.map((g, gi) => (
          <section key={g.id} id={g.id} className="scroll-mt-6 border-b border-ink/10 px-5 py-24 md:px-14 md:py-32" aria-labelledby={`${g.id}-title`}>
            <div className={`mx-auto grid max-w-[1680px] items-start gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20 ${gi % 2 ? 'md:[&>figure]:order-2' : ''}`}>
              <figure className="md:sticky md:top-24" data-reveal>
                <Img name={g.photo} sizes="(max-width: 767px) 100vw, 40vw" className="aspect-[4/5] w-full object-cover" />
              </figure>
              <div>
                <p className="caps text-rose" data-reveal>
                  0{gi + 1} / 0{services.length}
                </p>
                <h2 id={`${g.id}-title`} className="display mt-4 text-[clamp(46px,5.6vw,96px)]" data-reveal style={d(1)}>
                  <Lines lines={g.title} />
                </h2>
                <p className="mt-6 max-w-[48ch] text-[17px] text-ink/80" data-reveal style={d(2)}>
                  {g.intro}
                </p>
                <div className="mt-10" data-reveal style={d(3)}>
                  <PriceList items={g.items} />
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="px-5 py-24 md:px-14" aria-labelledby="quote-title">
          <div className="mx-auto max-w-[1100px] text-center" data-reveal>
            <h2 id="quote-title" className="display text-[clamp(40px,5vw,84px)]">
              Not sure what <span className="it text-rose">you need?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px] text-ink/80">
              Prices depend on your hair’s length, thickness and condition. Send us a photo on WhatsApp and we’ll give you an honest quote. Bookings are essential.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={bookingUrl} target="_blank" rel="noopener" className="btn bg-ink text-paper hover:bg-mocha hover:text-paper">
                Ask on WhatsApp
              </a>
              <a href={link('/specials/')} className="btn btn-line">
                See the specials
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
