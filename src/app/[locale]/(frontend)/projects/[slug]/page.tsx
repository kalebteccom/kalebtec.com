import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from 'lexical';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import type { Media, Industry } from '@/payload-types';

export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string; locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: 'projects',
    locale: locale as Locale,
    fallbackLocale: 'en',
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
      ? { images: [{ url: image.url, alt: image.alt ?? project.title }] }
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
    locale: locale as Locale,
    fallbackLocale: 'en',
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
    <article aria-label={project.title} className="min-h-screen pt-32 pb-32 bg-bg">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors duration-200 mb-12"
        >
          <span aria-hidden="true">←</span>
          <span>{t('backToProjects')}</span>
        </Link>

        <header className="mb-12 max-w-4xl">
          {project.client && (
            <p className="text-xs font-medium uppercase tracking-wider text-faint mb-4">
              {project.client}
            </p>
          )}
          <h1 className="text-display-xl text-heading">{project.title}</h1>

          {project.publishedDate && (
            <p className="text-sm text-muted mt-6">
              {new Date(project.publishedDate).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
              })}
            </p>
          )}

          {(industries.length > 0 || technologies.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-6">
              {industries.map((ind) => (
                <span
                  key={ind.id}
                  className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-border text-body"
                >
                  {ind.name}
                </span>
              ))}
              {technologies.map((tech) =>
                tech.technology ? (
                  <span
                    key={tech.id}
                    className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full text-faint"
                  >
                    {tech.technology}
                  </span>
                ) : null,
              )}
            </div>
          )}
        </header>

        {image?.url && (
          <div className="relative aspect-[16/9] overflow-hidden bg-surface mb-16">
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
          </div>
        )}

        {project.description && (
          <div className="mb-12 max-w-3xl">
            <p className="editorial-lead text-heading">{project.description}</p>
          </div>
        )}

        {project.content && (
          <RichText
            data={project.content as SerializedEditorState}
            className="prose prose-sm sm:prose-base max-w-3xl prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-heading prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2 prose-p:text-body prose-p:leading-relaxed prose-p:my-4 prose-a:text-heading prose-a:underline prose-a:underline-offset-4 hover:prose-a:no-underline prose-strong:text-heading prose-code:font-mono prose-code:text-heading prose-li:text-body prose-ul:my-3 prose-ol:my-3 prose-blockquote:border-l-2 prose-blockquote:border-border-strong prose-blockquote:pl-6 prose-blockquote:text-muted prose-blockquote:italic"
          />
        )}
      </div>
    </article>
  );
}
