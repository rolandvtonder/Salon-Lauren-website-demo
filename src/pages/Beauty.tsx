import {beauty} from '../content';
import {Lines} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {PriceList} from '../components/PriceList';
import {d} from '../lib/style';
import {site, whatsapp} from '../site';

const bookKim = whatsapp(site.phones.kim.intl, "Hi Kim, I'd like to book with L. Beauty at Salon Lauren.");

export function Beauty() {
  return (
    <>
      <PageHero label="L. Beauty" lines={[{t: 'L.'}, {t: 'Beauty', i: true}]} intro={beauty.intro} photo="nails-french">
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={bookKim} target="_blank" rel="noopener" className="btn">
            Book with Kim
          </a>
          <a href={`tel:${site.phones.kim.intl}`} className="btn btn-line text-paper">
            {site.phones.kim.display}
          </a>
        </div>
      </PageHero>

      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="beauty-prices">
        <div className="mx-auto max-w-[1680px]">
          <h2 id="beauty-prices" className="display text-[clamp(46px,6vw,104px)]" data-reveal>
            Price <span className="it text-rose">list</span>
          </h2>
          <div className="mt-16 grid gap-x-20 gap-y-20 md:grid-cols-2">
            {beauty.groups.map((g, i) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} data-reveal style={d(i % 2)}>
                <h3 id={`${g.id}-title`} className="display text-[clamp(34px,3.2vw,54px)]">
                  <Lines lines={g.title} />
                </h3>
                <div className="mt-6">
                  <PriceList items={g.items} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender px-5 py-24 text-ink md:px-14" aria-labelledby="book-kim">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-8" data-reveal>
          <div>
            <h2 id="book-kim" className="display text-[clamp(40px,5vw,84px)]">
              Your dream nails <span className="it">are one booking away.</span>
            </h2>
            <p className="mt-4 text-[17px] text-ink/80">
              L. Beauty is inside Salon Lauren, {site.address.street}, {site.address.suburb}.
            </p>
          </div>
          <a href={bookKim} target="_blank" rel="noopener" className="btn bg-ink text-paper hover:bg-mocha hover:text-paper">
            WhatsApp Kim · {site.phones.kim.display}
          </a>
        </div>
      </section>
    </>
  );
}
