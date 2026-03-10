import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectsSectionClient from './ProjectsSectionClient';
import type { Locale } from '@/i18n/routing';
import type { Project, Industry } from '@/payload-types';

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
    // DB unreachable at build time — render nothing
    return null;
  }

  if (projects.length === 0) return null;

  const t = await getTranslations('projects');

  // Compute aggregate stats from the fetched projects
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
    <section id="projects" aria-label={t('ariaLabel')} className="relative py-32 overflow-hidden">
      {/* Gradient top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      {/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(128, 0, 255, 0.03) 0%, rgba(0, 255, 255, 0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title={t('sectionTitle')}
          sectionNumber={t('sectionNumber')}
          subtitle={t('subtitle')}
        />

        {/* Stats bar */}
        <ProjectsSectionClient projects={projects} stats={stats} />

        {/* Prominent CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 border border-brand bg-brand/10 text-cyber-heading hover:bg-brand hover:text-white hover:shadow-[0_0_40px_rgba(128,0,255,0.3)] focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-cyber-bg transition-all duration-500 cyber-border-glow"
          >
            {/* Corner accents on the CTA button */}
            <span
              className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-cyan/50 group-hover:border-cyber-cyan transition-colors duration-300"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-cyan/50 group-hover:border-cyber-cyan transition-colors duration-300"
              aria-hidden="true"
            />

            <span className="text-cyber-faint group-hover:text-white/60 transition-colors" aria-hidden="true">
              [
            </span>
            <span>{t('viewAll')}</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
            <span className="text-cyber-faint group-hover:text-white/60 transition-colors" aria-hidden="true">
              ]
            </span>
          </Link>

          {/* Terminal-style hint below CTA */}
          <p className="mt-4 font-mono text-xs text-cyber-faint/50" aria-hidden="true">
            &gt; {t('terminalHint', { count: totalProjects })}
          </p>
        </div>
      </div>
    </section>
  );
}
