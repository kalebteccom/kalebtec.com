import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import JsonLd from '@/components/seo/JsonLd';
import {
  SITE_URL,
  OG_LOCALE_BY_LOCALE,
  TWITTER_HANDLE,
  buildAlternates,
  absoluteUrl,
  siteOGImage,
} from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const ogLocale = OG_LOCALE_BY_LOCALE[locale as Locale] ?? 'en_US';

  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
    alternates: buildAlternates(locale as Locale, '/projects'),
    openGraph: {
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      url: absoluteUrl(locale as Locale, '/projects'),
      siteName: 'Kalebtec',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: siteOGImage(locale as Locale),
          width: 1200,
          height: 630,
          alt: t('projectsTitle'),
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('projectsTitle'),
      description: t('projectsDescription'),
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      images: [siteOGImage(locale as Locale)],
    },
  };
}

export default async function ProjectsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const payload = await getPayload({ config: configPromise });

  const { docs: projects } = await payload.find({
    collection: 'projects',
    locale: locale as Locale,
    fallbackLocale: 'en',
    where: {
      status: { equals: 'published' },
    },
    sort: 'order',
    limit: 100,
    depth: 2,
  });

  // Extract unique industry names and technology names for filters
  const industrySet = new Set<string>();
  const technologySet = new Set<string>();

  for (const project of projects) {
    if (project.industries) {
      for (const ind of project.industries) {
        if (typeof ind !== 'string' && ind.name) {
          industrySet.add(ind.name);
        }
      }
    }
    if (project.technologies) {
      for (const tech of project.technologies) {
        if (tech.technology) {
          technologySet.add(tech.technology);
        }
      }
    }
  }

  // CollectionPage + ItemList for the project archive
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(locale as Locale, '/projects')}#collection`,
    name: tMeta('projectsTitle'),
    description: tMeta('projectsDescription'),
    url: absoluteUrl(locale as Locale, '/projects'),
    inLanguage: locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: absoluteUrl(locale as Locale, `/projects/${project.slug}`),
        name: project.title,
      })),
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Kalebtec',
        item: absoluteUrl(locale as Locale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tMeta('projectsTitle'),
        item: absoluteUrl(locale as Locale, '/projects'),
      },
    ],
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <JsonLd data={breadcrumbLd} />
      <section aria-labelledby="projects-page-heading" className="min-h-screen pt-32 pb-32 bg-bg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest text-faint mb-4">
              {t('sectionNumber')} — {t.raw('sectionTitle')}
            </p>
            <h1 id="projects-page-heading" className="text-display-xl text-heading">
              {t('pageTitle')}
            </h1>
          </div>

          <ProjectsFilter
            projects={projects}
            industries={Array.from(industrySet).sort()}
            technologies={Array.from(technologySet).sort()}
          />
        </div>
      </section>
    </>
  );
}
