import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {findRoute, notFound, routes} from './routes';
import {headFor, robots, sitemap} from './seo';

/** Used only at build time by scripts/prerender.mjs to write each page's HTML. */
export function render(path: string) {
  const route = findRoute(path);
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
  return {html, head: headFor(route)};
}

export {notFound, robots, routes, sitemap};
