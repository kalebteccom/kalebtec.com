import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getLocale, getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import ProjectsSectionClient from './ProjectsSectionClient';
import type { Locale } from '@/i18n/routing';
import type { Project } from '@/payload-types';

export default async function ProjectsSection() {
  let projects: Project[] = [];
  let totalProjects = 0;
  try {
    const locale = await getLocale();
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'projects',
      locale: locale as Locale,
      fallbackLocale: 'en',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 4,
      depth: 2,
    });
    projects = result.docs;
    totalProjects = result.totalDocs;
  } catch {
    return null;
  }

  if (projects.length === 0) return null;

  const t = await getTranslations('projects');

  const allTechnologies = new Set<string>();
  const allIndustries = new Set<string>();
  for (const project of projects) {
    for (const tech of project.technologies ?? []) {
      if (tech.technology) allTechnologies.add(tech.technology);
    }
    for (const ind of project.industries ?? []) {
      if (typeof ind !== 'string' && ind.name) allIndustries.add(ind.name);
    }
  }

  const stats = {
    totalProjects,
    technologiesUsed: allTechnologies.size,
    industriesServed: allIndustries.size,
  };

  return (
    <section
      id="projects"
      aria-label={t('ariaLabel')}
      className="relative py-24 md:py-32 bg-bg"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={t('sectionTitle')}
          sectionNumber={t('sectionNumber')}
          subtitle={t('subtitle')}
        />

        <ProjectsSectionClient projects={projects} stats={stats} />

        <div className="mt-16 flex justify-start">
          <ButtonLink href="/projects" variant="secondary" size="md">
            {t('viewAll')}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="ml-1"
            >
              <line x1="2" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" fill="none" />
            </svg>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
