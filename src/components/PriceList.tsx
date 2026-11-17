import type {PriceItem} from '../content';

/** Name ······ price rows. Items without a price read "Ask for a quote". */
export function PriceList({items}: {items: PriceItem[]}) {
  return (
    <ul className="divide-y divide-current/15">
      {items.map((it) => (
        <li key={it.name} className="py-4">
          <div className="flex items-baseline gap-3">
            <span className="text-[17px] md:text-[18px]">{it.name}</span>
            <span className="leader" aria-hidden />
            <span className={`shrink-0 text-right ${it.price ? 'display text-[24px] md:text-[26px]' : 'caps opacity-70'}`}>{it.price ?? it.ask ?? 'Ask for a quote'}</span>
          </div>
          {it.note && <p className="mt-1 text-[14px] leading-[1.6] opacity-70">{it.note}</p>}
        </li>
      ))}
    </ul>
  );
}
