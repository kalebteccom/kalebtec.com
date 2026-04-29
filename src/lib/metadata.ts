import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalebtec.com';

/** ISO BCP-47 codes used by `og:locale` for each app locale. */
export const OG_LOCALE_BY_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  ca: 'ca_ES',
  gl: 'gl_ES',
  pt: 'pt_PT',
};

/**
 * Build a path on the site for a given locale, respecting the
 * `localePrefix: 'as-needed'` setting (English doesn't get a prefix).
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return clean === '/' ? '' : clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Absolute URL for a given locale + path. */
export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * Build the full alternates block for a page: canonical for the current
 * locale + hreflang map for every locale (including x-default → English).
 */
export function buildAlternates(
  currentLocale: Locale,
  path: string,
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = absoluteUrl(loc, path);
  }
  // x-default points to the canonical (English) version per Google's guidance.
  languages['x-default'] = absoluteUrl('en', path);

  return {
    canonical: absoluteUrl(currentLocale, path),
    languages,
  };
}

/**
 * Twitter handle used across Twitter card metadata. Kept here so it's
 * trivial to update in one place.
 */
export const TWITTER_HANDLE = '@kalebtec';
