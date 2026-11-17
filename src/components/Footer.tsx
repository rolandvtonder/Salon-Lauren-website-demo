import {link} from '../lib/url';
import {routes} from '../routes';
import {bookingUrl, mapsUrl, site} from '../site';

/** Name, address and phone on every page — the core of local SEO. */
export function Footer() {
  return (
    <footer className="relative border-t border-paper/10 bg-ink px-5 pt-20 pb-32 md:px-14 md:pb-16">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="display text-[clamp(44px,5vw,80px)] text-paper">
            Salon <span className="it text-latte">Lauren</span>
          </p>
          <p className="caps mt-3 text-paper/70">Hair & beauty salon · Kraaifontein</p>
        </div>

        <div>
          <h2 className="caps text-latte">Visit</h2>
          <address className="mt-3 text-[16px] leading-[1.7] text-paper/85 not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.suburb}, {site.address.city}
            <br />
            {site.address.postal}, South Africa
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener" className="caps link mt-3 inline-block text-paper">
            Get directions
          </a>
        </div>

        <div>
          <h2 className="caps text-latte">Book</h2>
          <ul className="mt-3 space-y-2 text-[16px] text-paper/85">
            <li>
              Salon: <a href={`tel:${site.phones.salon.intl}`} className="link">{site.phones.salon.display}</a>
            </li>
            <li>
              WhatsApp: <a href={bookingUrl} target="_blank" rel="noopener" className="link">{site.phones.nella.display}</a>
            </li>
            <li>
              L. Beauty: <a href={`tel:${site.phones.kim.intl}`} className="link">{site.phones.kim.display}</a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener" className="link">Facebook</a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="caps text-latte">Pages</h2>
          <ul className="mt-3 space-y-2 text-[16px] text-paper/85">
            {routes.map((r) => (
              <li key={r.path}>
                <a href={link(r.path)} className="link">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="caps mx-auto mt-16 max-w-[1680px] text-paper/60">© 2026 Salon Lauren · 54–56 Brighton Road, Kraaifontein · Bookings are essential</p>
    </footer>
  );
}
