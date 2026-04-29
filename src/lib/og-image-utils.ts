import fs from 'node:fs';
import path from 'node:path';

/**
 * Inter font binaries fetched at runtime for next/og's <ImageResponse>.
 * Cached per-process so we don't refetch on every OG render.
 */
const fontCache = new Map<number, ArrayBuffer>();

/** Fetch a single Inter weight from Google Fonts and return the binary. */
export async function getOGFont(weight: 400 | 500 | 600 | 700 | 800 = 800): Promise<ArrayBuffer> {
  const cached = fontCache.get(weight);
  if (cached) return cached;

  const cssUrl = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`;
  const cssRes = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!cssRes.ok) throw new Error(`Failed to fetch Inter ${weight} CSS`);
  const css = await cssRes.text();

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(woff2?|truetype)'\)/);
  if (!match) throw new Error(`Could not extract font URL for Inter ${weight}`);

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) throw new Error(`Failed to fetch Inter ${weight} binary`);
  const buffer = await fontRes.arrayBuffer();

  fontCache.set(weight, buffer);
  return buffer;
}

/** Read the site logo SVG and return a base64 data URI for embedding in OG. */
let cachedLogoUri: string | null = null;
export function getOGLogoDataUri(): string {
  if (cachedLogoUri) return cachedLogoUri;
  const logoPath = path.join(process.cwd(), 'public', 'logo.svg');
  const svg = fs.readFileSync(logoPath, 'utf-8');
  const base64 = Buffer.from(svg).toString('base64');
  cachedLogoUri = `data:image/svg+xml;base64,${base64}`;
  return cachedLogoUri;
}

/** Editorial palette mirrored from globals.css for use inside <ImageResponse>. */
export const OG_COLORS = {
  paper: '#e5e4d8',
  paperSoft: '#f1f0e4',
  ink: '#080f11',
  inkSoft: '#151b20',
  muted: 'rgba(8, 15, 17, 0.6)',
  faint: 'rgba(8, 15, 17, 0.4)',
  border: 'rgba(8, 15, 17, 0.12)',
  brand: '#8000FF',
  brandLight: '#a64dff',
} as const;

/**
 * Pick a fluid headline size based on title length so long project titles
 * still fit on the 1200×630 canvas. Returns a px number for inline styles.
 */
export function pickHeadlineSize(title: string): number {
  if (title.length > 70) return 64;
  if (title.length > 50) return 80;
  if (title.length > 30) return 96;
  return 112;
}
