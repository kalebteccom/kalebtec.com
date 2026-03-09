import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es', 'fr', 'ca', 'gl', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ca: 'Català',
  gl: 'Galego',
  pt: 'Português',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
