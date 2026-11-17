import {link} from '../lib/url';
import {specials, specialsNote} from '../content';
import {Img} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {d} from '../lib/style';
import {bookingUrl, site, whatsapp} from '../site';

export function Specials() {
  return (
    <>
      <PageHero
        label="Specials"
        lines={[{t: 'Hair'}, {t: 'specials', i: true}]}
        intro="Full-head highlights, half-head highlights and full colour at special prices, each with a treatment included, R120 pensioner blow-dries from Monday to Thursday, and new specials every week."
        photo="highlights-honey"
      />

      <section className="bg-ink px-5 py-24 md:px-14 md:py-32" aria-label="Current specials">
        <ul className="mx-auto grid max-w-[1680px] gap-[3px] md:grid-cols-2 xl:grid-cols-4">
          {specials.map((s, i) => (
            <li key={s.title} className="group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-mocha" data-reveal style={d(i)}>
              <Img name={s.photo} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgb(29_21_19/0.92))]" />
              <div className="relative p-7 md:p-9">
                <p className="display text-[clamp(44px,4vw,68px)] text-latte italic">{s.price}</p>
                <h2 className="display mt-3 text-[clamp(28px,2.4vw,40px)]">{s.title}</h2>
                <p className="mt-2 text-[16px] text-paper/85">{s.detail}</p>
                <a
                  href={whatsapp(site.phones.nella.intl, `Hi Salon Lauren, I'd like to book the ${s.title} special (${s.price}).`)}
                  target="_blank"
                  rel="noopener"
                  className="caps mt-6 inline-flex min-h-[44px] items-center gap-3 text-paper"
                >
                  <span className="link">Book this special</span> <span aria-hidden>→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-paper bg-lavender px-5 py-20 text-ink md:px-14 md:py-24" aria-labelledby="weekly">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-8" data-reveal>
          <div className="max-w-[60ch]">
            <h2 id="weekly" className="display text-[clamp(40px,5vw,84px)]">
              {specialsNote.title.split(' ').slice(0, 2).join(' ')} <span className="it">{specialsNote.title.split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="mt-5 text-[17px] text-ink/85">{specialsNote.body}</p>
          </div>
          <a
            href={whatsapp(site.phones.nella.intl, "Hi Salon Lauren, what specials are on this week?")}
            target="_blank"
            rel="noopener"
            className="btn bg-ink text-paper hover:bg-mocha hover:text-paper"
          >
            Ask what’s on · {site.phones.nella.display}
          </a>
        </div>
      </section>

      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="good-to-know">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-2 md:gap-20">
          <h2 id="good-to-know" className="display text-[clamp(46px,6vw,104px)]" data-reveal>
            Good to <span className="it text-rose">know</span>
          </h2>
          <ul className="space-y-6 text-[17px] leading-[1.75] text-ink/85" data-reveal style={d(1)}>
            <li>
              <strong className="font-normal text-ink">Bookings are essential.</strong> WhatsApp Nella on {site.phones.nella.display} or call the salon on {site.phones.salon.display}.
            </li>
            <li>
              <strong className="font-normal text-ink">All lengths, one price.</strong> Highlight specials apply to short, medium and long hair. Toner is charged separately.
            </li>
            <li>
              <strong className="font-normal text-ink">Professional products.</strong> We stock professional hair-care products for all our clients’ needs, so you can keep your colour looking fresh at home.
            </li>
            <li>
              <strong className="font-normal text-ink">Specials can change.</strong> Ask us about this month’s offers when you book.
            </li>
          </ul>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1680px] flex-wrap gap-3">
          <a href={bookingUrl} target="_blank" rel="noopener" className="btn bg-ink text-paper hover:bg-mocha hover:text-paper">
            Book on WhatsApp
          </a>
          <a href={link('/services/')} className="btn btn-line">
            Full price list
          </a>
        </div>
      </section>
    </>
  );
}
