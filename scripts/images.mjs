/**
 * Turns the original Facebook photos in ../media into responsive WebP files in
 * public/img, and writes their real sizes to src/data/image-sizes.json so every
 * <img> can carry width/height (no layout shift). Also builds the social-share
 * image and the touch icon. Run with `npm run images` after adding photos.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaDir = path.resolve(root, '..', 'media');
const outDir = path.join(root, 'public', 'img');
const photos = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'photos.json'), 'utf8'));

// The sources are phone photos (640–2048px); never upscale past the original.
const WIDTHS = [480, 960, 1600];

fs.mkdirSync(outDir, {recursive: true});
const manifest = {};

for (const p of photos) {
  const input = path.join(mediaDir, p.file);
  const meta = await sharp(input).rotate().metadata();
  const max = Math.min(meta.width, 1600);
  const widths = [...new Set([...WIDTHS.filter((w) => w < max), max])].sort((a, b) => a - b);
  let h = 0;
  for (const w of widths) {
    const info = await sharp(input).rotate().resize({width: w}).webp({quality: 74}).toFile(path.join(outDir, `${p.slug}-${w}.webp`));
    if (w === max) h = info.height;
  }
  manifest[p.slug] = {w: max, h, widths};
  console.log(`${p.slug}: ${widths.join(', ')}`);
}

fs.writeFileSync(path.join(root, 'src', 'data', 'image-sizes.json'), JSON.stringify(manifest, null, 2) + '\n');

// Social share card, 1200×630: wordmark on espresso, three photos on the right.
const strip = ['hero-balayage-waves', 'sleek-highlights', 'black-bob'];
const src = (slug) => path.join(mediaDir, photos.find((p) => p.slug === slug).file);
const tiles = await Promise.all(
  strip.map(async (slug, i) => ({
    input: await sharp(src(slug)).rotate().resize(196, 630, {fit: 'cover'}).toBuffer(),
    left: 606 + i * 198,
    top: 0,
  })),
);
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="630">
  <text x="64" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="78" letter-spacing="6" fill="#f7f1ec">SALON</text>
  <text x="64" y="350" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-style="italic" letter-spacing="6" fill="#c9a492">LAUREN</text>
  <text x="66" y="420" font-family="Georgia, 'Times New Roman', serif" font-size="24" letter-spacing="4" fill="#d9cdd8">HAIR &amp; BEAUTY SALON</text>
  <text x="66" y="456" font-family="Georgia, 'Times New Roman', serif" font-size="18" letter-spacing="2.5" fill="#f7f1ec" fill-opacity="0.7">54–56 BRIGHTON ROAD · KRAAIFONTEIN</text>
</svg>`);
await sharp({create: {width: 1200, height: 630, channels: 3, background: '#1d1513'}})
  .composite([...tiles, {input: text, left: 0, top: 0}])
  .jpeg({quality: 82})
  .toFile(path.join(root, 'public', 'og-image.jpg'));

await sharp(path.join(root, 'public', 'favicon.svg')).resize(180, 180).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'));
console.log('og-image.jpg and apple-touch-icon.png written');
