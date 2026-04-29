import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/seo/JsonLd';
import {
  SITE_URL,
  OG_LOCALE_BY_LOCALE,
  TWITTER_HANDLE,
  buildAlternates,
  absoluteUrl,
} from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const ogLocale = OG_LOCALE_BY_LOCALE[locale as Locale] ?? 'en_US';

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale as Locale, '/'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: absoluteUrl(locale as Locale, '/'),
      siteName: 'Kalebtec',
      locale: ogLocale,
      type: 'website',
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

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tServices = await getTranslations({ locale, namespace: 'services' });

  const serviceKeys = [
    'softwareArchitecture',
    'webDevelopment',
    'aiAutomation',
    'cloudInfrastructure',
    'technicalStrategy',
    'teamAugmentation',
  ] as const;

  // Organization — single source of truth on the homepage
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Kalebtec',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}${absoluteUrl(locale as Locale, '/').replace(SITE_URL, '')}/opengraph-image`,
    description: tMeta('description'),
    founders: [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#rowin`,
        name: 'Rowin Hernandez',
        jobTitle: 'Co-Founder & Lead Engineer',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#mari`,
        name: 'Mari Hernandez',
        jobTitle: 'Co-Founder & Operations Lead',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@kalebtec.com',
      contactType: 'customer service',
      availableLanguage: ['en', 'es', 'ca', 'fr', 'gl', 'pt'],
    },
    sameAs: [
      'https://linkedin.com/company/kalebtec',
      'https://x.com/kalebtec',
      'https://github.com/kalebtec',
    ],
  };

  // WebSite — site-level entity with search action placeholder
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Kalebtec',
    url: SITE_URL,
    description: tMeta('description'),
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
  };

  // Services — explicit ItemList so search engines can pick up the offering
  const servicesLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#services`,
    name: tServices('sectionTitle'),
    itemListElement: serviceKeys.map((key, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: tServices(`${key}.name`),
        description: tServices(`${key}.description`),
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    })),
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <JsonLd data={servicesLd} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
