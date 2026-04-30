import { notFound } from 'next/navigation';

/**
 * Catch-all fallback that funnels any unmatched URL inside a locale
 * segment into the (frontend) group's not-found.tsx — without it,
 * top-level garbage paths like `/projectsiuhhiuhiu` skip every layout
 * chain and Next.js renders its built-in fallback instead of our
 * editorial 404.
 *
 * Route specificity: this only catches URLs that no other (frontend)
 * page handles, so existing routes (`/projects`, `/projects/[slug]`,
 * `/privacy`, `/terms`, …) are unaffected.
 */
export default function CatchAll() {
  notFound();
}
