import type {CSSProperties} from 'react';

/** Stagger for `[data-reveal]` elements: each step adds 90ms (see index.css). */
export const d = (n: number) => ({'--d': n}) as CSSProperties;
