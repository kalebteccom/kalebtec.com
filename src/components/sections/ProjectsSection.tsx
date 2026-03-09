import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectsSectionClient from './ProjectsSectionClient';
import type { Project, Media, Industry } from '@/payload-types';

export default async function ProjectsSection() {
  let projects: Project[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 4,
      depth: 2,
    });
    projects = result.docs;
  } catch {
    // DB unreachable at build time — render nothing
    return null;
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" aria-label="Our Work" className="relative py-32">
      {/* Gradient top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="OUR WORK" sectionNumber="03" />

        <ProjectsSectionClient projects={projects} />

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-cyber-muted hover:text-brand-light transition-colors duration-300 group"
          >
            <span
              className="text-cyber-faint group-hover:text-cyber-muted transition-colors"
              aria-hidden="true"
            >
              [
            </span>
            View All Projects
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
            <span
              className="text-cyber-faint group-hover:text-cyber-muted transition-colors"
              aria-hidden="true"
            >
              ]
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
