import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import KonamiCode from '@/components/ui/KonamiCode';
import ThemeProvider from '@/components/ui/ThemeProvider';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalebtec.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kalebtec | Tech Consulting',
  description:
    'Expert technology consulting by Rowin and Mari Hernandez. We build digital solutions that matter.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Kalebtec | Tech Consulting',
    description: 'Expert technology consulting by Rowin and Mari Hernandez.',
    siteName: 'Kalebtec',
    locale: 'en_US',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalebtec | Tech Consulting',
    description: 'Expert technology consulting by Rowin and Mari Hernandez.',
  },
};

// Inline script to prevent flash of wrong theme on load
const themeScript = `(function(){try{var t=localStorage.getItem('kalebtec-theme')||'dark';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

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
