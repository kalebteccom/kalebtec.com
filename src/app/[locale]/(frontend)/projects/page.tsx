import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
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
    <section aria-label={t('pageTitle')} className="min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-sm text-cyber-faint tracking-wider">
              {t('allLabel')}
            </span>
            <span className="font-mono text-sm text-cyber-faint/50">//</span>
            <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
              {t.raw('sectionTitle')}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-cyber-heading neon-glow">
            {t('pageTitle')}
          </h1>
          <div className="mt-6 flex items-center gap-0" aria-hidden="true">
            <div className="w-2 h-2 bg-brand" />
            <div className="h-px w-24 bg-gradient-to-r from-brand/40 to-transparent" />
          </div>
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
