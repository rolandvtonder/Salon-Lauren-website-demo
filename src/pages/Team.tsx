import {link} from '../lib/url';
import {team} from '../content';
import {Img} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {d} from '../lib/style';
import {site, whatsapp} from '../site';

export function Team() {
  return (
    <>
      <PageHero
        label="Our team"
        lines={[{t: 'Meet'}, {t: 'the team', i: true}]}
        intro="Friendly, experienced stylists who listen first, and a beauty therapist for nails, waxing and lashes. Come and say hello on Brighton Road."
        photo="team-salon"
      />

      <section className="on-paper bg-paper px-5 py-24 text-ink md:px-14 md:py-32" aria-labelledby="team-title">
        <div className="mx-auto max-w-[1680px]">
          <h2 id="team-title" className="display text-[clamp(46px,6vw,104px)]" data-reveal>
            The faces <span className="it text-rose">behind the chair</span>
          </h2>
          <ul className="mt-16 grid gap-[3px] sm:grid-cols-2 xl:grid-cols-4">
            {team.map((m, i) => (
              <li key={m.name} className="flex min-h-[420px] flex-col justify-between bg-ink p-8 text-paper md:p-10" data-reveal style={d(i)}>
                <div>
                  <span aria-hidden className="display flex size-20 items-center justify-center rounded-full border border-latte/60 text-[34px] text-latte italic">
                    {m.name[0]}
                  </span>
                  <h3 className="display mt-8 text-[clamp(38px,3.2vw,56px)]">{m.name}</h3>
                  <p className="caps mt-2 text-latte">{m.role}</p>
                  <p className="mt-5 text-[16px] leading-[1.7] text-paper/85">{m.bio}</p>
                </div>
                {m.contact && (
                  <a
                    href={whatsapp(site.phones[m.contact.phone].intl)}
                    target="_blank"
                    rel="noopener"
                    className="caps mt-8 inline-flex min-h-[44px] items-center gap-3 self-start text-paper"
                  >
                    <span className="link">{m.contact.label}</span> <span aria-hidden>→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink" aria-label="The team at the salon">
        <div className="grid gap-[3px] md:grid-cols-2">
          <Img name="team-salon-cheer" sizes="(max-width: 767px) 100vw, 50vw" className="aspect-[4/5] w-full object-cover md:aspect-[3/4]" />
          <div className="flex flex-col justify-center px-5 py-20 md:px-16" data-reveal>
            <p className="display text-[clamp(40px,4.6vw,80px)]">
              Good hair, <span className="it text-latte">good company.</span>
            </p>
            <p className="mt-6 max-w-[44ch] text-[17px] text-paper/85">
              Whether it’s a quick blow-dry, a full colour or a whole new look, you’ll be looked after by a team that loves what it does.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={link('/contact/')} className="btn">
                Book an appointment
              </a>
              <a href={link('/gallery/')} className="btn btn-line">
                See our work
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
