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
  OG_LOCALE_BY_LOCALE,
  TWITTER_HANDLE,
  buildAlternates,
  absoluteUrl,
  siteOGImage,
} from '@/lib/metadata';
import {
  buildOrganizationLD,
  buildWebSiteLD,
  buildServiceListLD,
} from '@/lib/seo/jsonld';
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
      images: [
        {
          url: siteOGImage(locale as Locale),
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      images: [siteOGImage(locale as Locale)],
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

  const lang = locale as Locale;
  const description = tMeta('description');

  const organizationLd = buildOrganizationLD(lang, { description });
  const websiteLd = buildWebSiteLD(lang, { description });
  const servicesLd = buildServiceListLD(
    lang,
    serviceKeys.map((key) => ({
      name: tServices(`${key}.name`),
      description: tServices(`${key}.description`),
    })),
    tServices('sectionTitle'),
  );

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
