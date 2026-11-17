import {useCallback, useEffect, useRef, useState} from 'react';
import {galleryFilters, galleryOrder} from '../content';
import {Img, photoBySlug} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {lockScroll} from '../lib/scroll';
import {bookingUrl} from '../site';

/**
 * Before-and-after gallery: filter chips, a masonry of real results, and a
 * native <dialog> lightbox (Escape closes it, arrow keys step through).
 * Every photo is in the prerendered HTML, so all of them are indexable.
 */
export function Gallery() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(-1);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = galleryOrder.filter((slug) => filter === 'all' || photoBySlug[slug]?.tags.includes(filter));
  const current = index >= 0 ? visible[index] : null;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    lockScroll(true);
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback((n: number) => setIndex((i) => (i + n + visible.length) % visible.length), [visible.length]);

  useEffect(() => {
    const el = dialog.current!;
    const onClose = () => {
      lockScroll(false);
      setIndex(-1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('close', onClose);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      el.removeEventListener('keydown', onKey);
    };
  }, [step]);

  return (
    <>
      <PageHero
        label="Gallery"
        lines={[{t: 'Before'}, {t: '& after', i: true}]}
        intro="Real results from our chairs in Kraaifontein: frizz smoothed to gloss, grey turned silver, bold bobs, soft balayage and special-occasion styling."
        photo="balayage-waves-2"
      />

      <section className="bg-ink px-5 py-20 md:px-14 md:py-28" aria-labelledby="gallery-title">
        <div className="mx-auto max-w-[1680px]">
          <h2 id="gallery-title" className="sr-only">
            Our work
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`caps min-h-[44px] border px-5 transition-colors duration-300 ${
                  filter === f.id ? 'border-latte bg-latte text-ink' : 'border-paper/30 text-paper hover:border-paper'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visible.length} photos
          </p>

          <ul className="mt-10 columns-1 gap-[3px] sm:columns-2 lg:columns-3 xl:columns-4">
            {visible.map((slug, i) => (
              <li key={slug} className="mb-[3px] break-inside-avoid">
                <figure className="group relative overflow-hidden">
                  <button type="button" onClick={() => open(i)} className="block w-full" aria-label={`Enlarge: ${photoBySlug[slug].caption}`}>
                    <Img name={slug} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" className="w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.03]" />
                  </button>
                  <figcaption className="caps pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(29_21_19/0.85))] px-5 pt-10 pb-4 text-paper">
                    {photoBySlug[slug].caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-10">
            <p className="display text-[clamp(32px,3.6vw,60px)]">
              Your transformation <span className="it text-latte">is next.</span>
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener" className="btn">
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        data-lenis-prevent
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-paper"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <Img name={current} sizes="(max-width: 767px) 100vw, 60vw" className="max-h-[78dvh] w-auto max-w-full object-contain" />
            <p className="caps text-center">
              {photoBySlug[current].caption} · {index + 1} / {visible.length}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => step(-1)} className="btn btn-line text-paper" aria-label="Previous photo">
                ← Prev
              </button>
              <button type="button" onClick={close} className="btn" autoFocus>
                Close
              </button>
              <button type="button" onClick={() => step(1)} className="btn btn-line text-paper" aria-label="Next photo">
                Next →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
