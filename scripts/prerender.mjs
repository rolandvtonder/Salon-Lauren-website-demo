/**
 * Static-site generation. After `vite build` (client) and the SSR build of
 * src/entry-server.tsx, this renders every route to real HTML with its own
 * <head> (title, description, canonical, social cards, JSON-LD), writes
 * dist/<path>/index.html for each, a 404.html, sitemap.xml and robots.txt.
 * The result is plain static files: host it anywhere.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = path.join(root, 'dist-ssr');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const {render, routes, notFound, sitemap, robots} = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);

const write = (rel, html) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, html);
  console.log(`  ${rel}`);
};

const page = (p) => {
  const {html, head} = render(p);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

console.log('Prerendering:');
for (const r of routes) write(r.path === '/' ? 'index.html' : `${r.path.slice(1)}index.html`, page(r.path));
write('404.html', page(notFound.path));
write('sitemap.xml', sitemap(new Date().toISOString().slice(0, 10)));
write('robots.txt', robots());

fs.rmSync(ssr, {recursive: true, force: true});
