import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import type { Locale } from '@/i18n/routing';
import type { Project, Industry, Media } from '@/payload-types';

export const dynamic = 'force-dynamic';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('projectsTitle'),
    description: t('projectsDescription'),
  };
}

export default async function ProjectsPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
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

  return (
    <section aria-label={t('pageTitle')} className="min-h-screen pt-32 pb-32 bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-faint mb-4">
            {t('sectionNumber')} — {t.raw('sectionTitle')}
          </p>
          <h1 className="text-display-xl text-heading">{t('pageTitle')}</h1>
        </div>

        <ProjectsFilter
          projects={projects}
          industries={Array.from(industrySet).sort()}
          technologies={Array.from(technologySet).sort()}
        />
      </div>
    </section>
  );
}
