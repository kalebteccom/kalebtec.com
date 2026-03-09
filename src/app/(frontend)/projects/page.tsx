import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import type { Project, Industry, Media } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects | Kalebtec',
  description:
    'Explore our portfolio of technology consulting projects spanning web development, AI, cloud infrastructure, and more.',
};

export default async function ProjectsPage() {
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
    <main id="main-content" className="min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-sm text-cyber-faint tracking-wider">[ALL]</span>
            <span className="font-mono text-sm text-cyber-faint/50">//</span>
            <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
              PROJECTS
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-cyber-heading neon-glow">
            OUR WORK
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
    </main>
  );
}
