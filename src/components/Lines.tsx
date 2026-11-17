import type {Line} from '../content';

/** Headline lines from content.ts; lines marked `i` are set in italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'md:pl-[1.2em]' : ''}`}>
          {l.t}{' '}
        </span>
      ))}
    </>
  );
}
