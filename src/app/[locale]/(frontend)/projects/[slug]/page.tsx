import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import type { Project, Media, Industry } from '@/payload-types';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string; locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  });

  const project = docs[0];
  if (!project) return { title: t('notFoundTitle') };

  const image = project.featuredImage as Media | null;

  return {
    title: `${project.title} | Kalebtec`,
    description: project.description ?? `${project.title} — a Kalebtec project.`,
    openGraph: image?.url
      ? {
          images: [{ url: image.url, alt: image.alt ?? project.title }],
        }
      : undefined,
  };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  });

  const project = docs[0];
  if (!project) notFound();

  const image = project.featuredImage as Media | null;
  const industries = (project.industries ?? []).filter(
    (ind): ind is Industry => typeof ind !== 'string',
  );
  const technologies = project.technologies ?? [];

  return (
    <section aria-label={project.title} className="min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-cyber-muted hover:text-brand-light transition-colors duration-300 mb-8 group"
        >
          <span
            className="transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            &larr;
          </span>
          <span
            className="text-cyber-faint group-hover:text-cyber-muted transition-colors"
            aria-hidden="true"
          >
            [
          </span>
          {t('backToProjects')}
          <span
            className="text-cyber-faint group-hover:text-cyber-muted transition-colors"
            aria-hidden="true"
          >
            ]
          </span>
        </Link>

        {/* Hero image */}
        {image?.url && (
          <div className="relative aspect-[16/9] overflow-hidden border border-cyber-border mb-10">
            <Image
              src={image.url}
              alt={image.alt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              priority
              {...(image.blurDataURL
                ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                : {})}
            />
            <div className="absolute inset-0 scanlines opacity-15" aria-hidden="true" />
          </div>
        )}

        {/* Project header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-cyber-heading neon-glow">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            {project.client && (
              <span className="font-mono text-xs text-cyber-cyan tracking-wide">
                [{project.client.toUpperCase()}]
              </span>
            )}
            {project.publishedDate && (
              <span className="font-mono text-xs text-cyber-faint tracking-wide">
                {new Date(project.publishedDate).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {industries.map((ind) => (
              <span
                key={ind.id}
                className="cyber-badge font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-cyber-border text-cyber-muted"
              >
                {ind.name}
              </span>
            ))}
            {technologies.map((tech) =>
              tech.technology ? (
                <span
                  key={tech.id}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-brand/20 text-brand-light"
                >
                  {tech.technology}
                </span>
              ) : null,
            )}
          </div>

          {/* Accent line */}
          <div className="mt-6 flex items-center gap-0" aria-hidden="true">
            <div className="w-2 h-2 bg-brand" />
            <div className="h-px w-24 bg-gradient-to-r from-brand/40 to-transparent" />
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="mb-10">
            <p className="text-base leading-relaxed text-cyber-body max-w-3xl">
              {project.description}
            </p>
          </div>
        )}

        {/* Rich text content */}
        {project.content && (
          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-wide prose-headings:text-cyber-heading prose-p:text-cyber-body prose-a:text-brand-light prose-a:no-underline hover:prose-a:underline prose-strong:text-cyber-heading prose-code:font-mono prose-code:text-cyber-cyan">
            <ProjectContent content={project.content} />
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectContent({ content }: { content: NonNullable<Project['content']> }) {
  // Render Lexical rich text as simple HTML paragraphs
  // For full Lexical rendering, use @payloadcms/richtext-lexical/react
  const nodes = content.root?.children ?? [];

  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === 'paragraph') {
          const text = extractText(node);
          if (!text) return null;
          return <p key={i}>{text}</p>;
        }
        if (node.type === 'heading') {
          const text = extractText(node);
          const Tag = (node as any).tag ?? 'h2';
          return <Tag key={i}>{text}</Tag>;
        }
        return null;
      })}
    </>
  );
}

function extractText(node: any): string {
  if (node.text) return node.text;
  if (node.children) {
    return node.children.map(extractText).join('');
  }
  return '';
}
