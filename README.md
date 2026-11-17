# Salon Lauren — website

Seven-page website for Salon Lauren, a hair and beauty salon at Shop 54, Brighton Road, Kraaifontein.

**Live demo:** https://rolandvtonder.github.io/Salon-Lauren-website-demo/

Pages: Home · Services & prices · Specials · Gallery · Our team · L. Beauty · Contact

## Stack

Vite 6, React 19, TypeScript, Tailwind CSS v4 and Lenis smooth scrolling. Every page is prerendered to static HTML at build time, so search engines see the real content and metadata. The build also writes `sitemap.xml`, `robots.txt` and schema.org data for the business.

## Commands

```bash
npm install
npm run dev       # local development
npm run build     # static site in dist/
npm run preview   # serve the built site
npm run lint      # type-check
```

## Editing content

- **Business details** (domain, address, phones, opening hours): `src/site.ts`
- **Copy and prices** (services, specials, team, L. Beauty): `src/content.ts`
- **Page titles and descriptions** (SEO): `src/routes.ts`
- **Photos**: list them in `src/data/photos.json`, put the originals in `../media`, then run `npm run images` to regenerate the WebP files in `public/img`.

Before launch, search for `TODO(launch)` and replace the placeholders: the domain, the opening hours (then set `hoursConfirmed: true`), the missing prices and the team bios.

## Deploying

Pushing to `main` deploys the demo to GitHub Pages (`.github/workflows/deploy.yml`). The demo is marked `noindex` so it won't compete with the real site. For the real domain, run `npm run build` and upload `dist/` to any static host.
