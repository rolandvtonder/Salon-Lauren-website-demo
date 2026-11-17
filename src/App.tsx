import {link} from './lib/url';
import {useCallback, useEffect, useRef, useState, type JSX} from 'react';
import {Footer} from './components/Footer';
import {Menu} from './components/Menu';
import {PageCover} from './components/PageCover';
import {useReducedMotion} from './hooks/useReducedMotion';
import {useReveals} from './hooks/useReveals';
import {initNav} from './lib/nav';
import {startScroll} from './lib/scroll';
import {Beauty} from './pages/Beauty';
import {Contact} from './pages/Contact';
import {Gallery} from './pages/Gallery';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import {Services} from './pages/Services';
import {Specials} from './pages/Specials';
import {Team} from './pages/Team';
import {findRoute, type RouteId} from './routes';
import {bookingUrl} from './site';

const pages: Record<RouteId, () => JSX.Element> = {
  home: Home,
  services: Services,
  specials: Specials,
  gallery: Gallery,
  team: Team,
  beauty: Beauty,
  contact: Contact,
  notfound: NotFound,
};

export default function App({path}: {path: string}) {
  const route = findRoute(path);
  const Page = pages[route.id];
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => initNav(), []);
  useReveals();

  // The prerendered HTML already has the right <title>; this covers `npm run dev`.
  useEffect(() => {
    document.title = route.title;
  }, [route.title]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus({preventScroll: true});
  }, []);

  return (
    <>
      <a href="#main" className="skip caps">
        Skip to content
      </a>

      <a
        href={link('/')}
        aria-label="Salon Lauren, home"
        className="display fixed top-6 left-5 z-[55] text-[21px] tracking-[0.18em] text-white mix-blend-difference md:top-8 md:left-14"
      >
        Salon <span className="it">Lauren</span>
      </a>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-4 right-4 z-[55] flex min-h-[48px] items-center gap-4 px-6 backdrop-blur-md transition-colors duration-500 md:top-6 md:right-8 ${
          open ? 'bg-ink text-paper' : 'bg-ink/75 text-white hover:bg-ink'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener"
        className={`caps fixed right-4 bottom-4 z-[55] flex min-h-[52px] items-center px-7 shadow-[0_10px_40px_rgb(0_0_0/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 md:px-8 ${
          open ? 'bg-lavender text-ink' : 'bg-latte text-ink hover:bg-lavender'
        }`}
      >
        Book&nbsp;<em className="normal-case">now</em>
        <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
      </a>

      <main id="main" tabIndex={-1} className="outline-none">
        <Page />
      </main>
      <Footer />

      <Menu id="site-menu" open={open} current={route.path} onClose={close} />
      <PageCover />
      <div className="grain" aria-hidden />
    </>
  );
}
