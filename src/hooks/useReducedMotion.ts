import {useEffect, useState} from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Starts false on the server and first client render (so hydration matches), then follows the OS setting. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
