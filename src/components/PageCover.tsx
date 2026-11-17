/** The three slabs of the page wipe (styles in index.css, logic in lib/nav.ts). */
export function PageCover() {
  return (
    <div className="page-cover pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <span className="bg-ink" />
      <span className="bg-lavender" />
      <span className="flex items-center justify-center bg-paper">
        <span className="display text-[clamp(28px,4vw,56px)] tracking-[0.18em] text-ink">
          Salon <span className="it text-rose">Lauren</span>
        </span>
      </span>
    </div>
  );
}
