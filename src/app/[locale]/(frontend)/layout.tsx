import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import KonamiCode from '@/components/ui/KonamiCode';
import ThemeProvider from '@/components/ui/ThemeProvider';
import {
  SITE_URL,
  OG_LOCALE_BY_LOCALE,
  TWITTER_HANDLE,
  buildAlternates,
} from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const ogLocale = OG_LOCALE_BY_LOCALE[locale as Locale] ?? 'en_US';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: '%s | Kalebtec',
    },
    description: t('description'),
    alternates: buildAlternates(locale as Locale, '/'),
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Kalebtec',
      locale: ogLocale,
      type: 'website',
      url: SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
  };
}

// Inline script to prevent flash of wrong theme on load.
// Default = 'system' so first-time visitors see the OS preference, falling
// back to light (the editorial primary state) if matchMedia is unavailable.
const themeScript = `(function(){try{var t=localStorage.getItem('kalebtec-theme')||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('common');

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg text-body antialiased font-sans transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main-content" className="skip-to-content">
              {t('skipToContent')}
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CookieBanner />
            <KonamiCode />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
