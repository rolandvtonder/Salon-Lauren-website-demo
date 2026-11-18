import {Hours} from '../components/Hours';
import {PageHero} from '../components/PageHero';
import {d} from '../lib/style';
import {bookingUrl, mapsEmbed, mapsUrl, site} from '../site';

export function Contact() {
  const ways = [
    {label: 'WhatsApp Nella', sub: 'Fastest way to book', value: site.phones.nella.display, href: bookingUrl, external: true},
    {label: 'Call the salon', sub: 'During opening hours', value: site.phones.salon.display, href: `tel:${site.phones.salon.intl}`},
    {label: 'L. Beauty (Kim)', sub: 'Gel nails, pedicures & massage', value: site.phones.kim.display, href: `tel:${site.phones.kim.intl}`},
    {label: 'Facebook', sub: 'News, specials & photos', value: 'Salon Lauren', href: site.facebook, external: true},
  ];

  return (
    <>
      <PageHero
        label="Contact"
        lines={[{t: 'Book your'}, {t: 'appointment', i: true}]}
        intro={`Bookings are essential. WhatsApp or call us, or pop in at ${site.address.street}, ${site.address.suburb}.`}
        photo="short-grey"
      />

      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="ways-title">
        <div className="mx-auto max-w-[1680px]">
          <h2 id="ways-title" className="display text-[clamp(46px,6vw,104px)]" data-reveal>
            Get in <span className="it text-rose">touch</span>
          </h2>
          <ul className="mt-14 grid gap-[3px] sm:grid-cols-2 xl:grid-cols-4">
            {ways.map((w, i) => (
              <li key={w.label} data-reveal style={d(i)}>
                <a
                  href={w.href}
                  {...(w.external ? {target: '_blank', rel: 'noopener'} : {})}
                  className="group flex h-full min-h-[220px] flex-col justify-between bg-ink p-8 text-paper transition-colors duration-500 hover:bg-mocha"
                >
                  <span>
                    <span className="caps block text-latte">{w.label}</span>
                    <span className="mt-1 block text-[15px] text-paper/70">{w.sub}</span>
                  </span>
                  <span className="display mt-8 flex items-end justify-between gap-4 text-[clamp(30px,2.6vw,42px)]">
                    {w.value}
                    <span aria-hidden className="text-latte transition-transform duration-500 ease-silk group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-24 grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-20">
            <div data-reveal>
              <h2 className="display text-[clamp(40px,4.4vw,72px)]">
                Find <span className="it text-rose">us</span>
              </h2>
              <address className="mt-6 text-[19px] leading-[1.6] not-italic">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.suburb}, {site.address.city}, {site.address.postal}
              </address>
              <a href={mapsUrl} target="_blank" rel="noopener" className="btn mt-8 bg-ink text-paper hover:bg-mocha hover:text-paper">
                Get directions
              </a>
              <h3 className="caps mt-14 text-rose">Opening hours</h3>
              <Hours className="mt-3" />
              <p className="mt-4 text-[14px] text-ink/70">Public holiday hours may differ. Please check with us on WhatsApp.</p>
            </div>
            <div className="min-h-[420px] bg-lavender" data-reveal style={d(1)}>
              <iframe
                title={`Map: ${site.name}, ${site.address.street}, ${site.address.suburb}`}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[420px] w-full border-0 grayscale-[0.4] sepia-[0.15]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
