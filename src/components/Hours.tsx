import {site} from '../site';

export function Hours({className = ''}: {className?: string}) {
  return (
    <dl className={`divide-y divide-current/15 ${className}`}>
      {site.hours.map((h) => (
        <div key={h.days} className="flex items-baseline justify-between gap-6 py-3">
          <dt className="text-[16px]">{h.days}</dt>
          <dd className="caps text-[13px]">{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}
