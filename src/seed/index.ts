/**
 * Seed script for kalebtec.com
 *
 * Seeds industries and projects into Payload CMS.
 * Run with: pnpm seed
 *
 * Requires MongoDB to be running and PAYLOAD_SECRET / DATABASE_URI env vars set.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { ProjectSeedData, TranslatableLocale } from './types';
import { industryTranslations } from './industry-translations';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, 'assets');

const MIME_BY_EXT: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  gif: 'image/gif',
};

async function loadFeaturedImage(
  ref: string,
): Promise<{ buffer: Buffer; filename: string; mimetype: string }> {
  if (ref.startsWith('http://') || ref.startsWith('https://')) {
    const response = await fetch(ref);
    if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${ref}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const mimetype = response.headers.get('content-type') || 'image/png';
    const ext = mimetype.includes('svg')
      ? 'svg'
      : mimetype.includes('webp')
        ? 'webp'
        : mimetype.includes('png')
          ? 'png'
          : 'jpg';
    return { buffer, filename: path.basename(new URL(ref).pathname) || `image.${ext}`, mimetype };
  }
  // Local asset path, resolved relative to src/seed/assets
  const absolutePath = path.resolve(ASSETS_DIR, ref);
  const buffer = await readFile(absolutePath);
  const ext = path.extname(absolutePath).slice(1).toLowerCase();
  const mimetype = MIME_BY_EXT[ext] ?? 'application/octet-stream';
  return { buffer, filename: path.basename(absolutePath), mimetype };
}

import {
  fanfestV3,
  fanfestV2,
  limbicAi,
  synphonyteDental,
  messynger,
  humantelligence,
  graphaware,
  sabanto,
  sunliner,
  learapido,
  parrolabs,
  yourkar,
  palmaAlquileres,
  tricampa,
} from './projects';

// ---------------------------------------------------------------------------
// Industry definitions
// ---------------------------------------------------------------------------

const INDUSTRIES = [
  { name: 'Sports & Entertainment', color: '#e63946' },
  { name: 'Streaming & Media', color: '#f4a261' },
  { name: 'Healthcare & MedTech', color: '#2a9d8f' },
  { name: 'AI & Machine Learning', color: '#8338ec' },
  { name: 'HR & People Analytics', color: '#fb5607' },
  { name: 'SaaS', color: '#3a86ff' },
  { name: 'Data & Analytics', color: '#06d6a0' },
  { name: 'AgTech & IoT', color: '#57cc99' },
  { name: 'Travel & Hospitality', color: '#00b4d8' },
  { name: 'EdTech', color: '#ffbe0b' },
  { name: 'Media & News', color: '#ff006e' },
  { name: 'Automotive & Fleet', color: '#8d99ae' },
  { name: 'Real Estate', color: '#d4a373' },
  { name: 'Smart Cities & Mobility', color: '#7209b7' },
];

// All project seed data in display order
const ALL_PROJECTS: ProjectSeedData[] = [
  fanfestV3,
  fanfestV2,
  limbicAi,
  synphonyteDental,
  messynger,
  humantelligence,
  graphaware,
  sabanto,
  sunliner,
  learapido,
  parrolabs,
  yourkar,
  palmaAlquileres,
  tricampa,
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  const payload = await getPayload({ config });

  console.log('[seed] Starting...');

  // --- 0. Purge existing data (localization schema changed) ---
  console.log('[seed] Purging existing projects...');
  const existingProjects = await payload.find({ collection: 'projects', limit: 100 });
  for (const doc of existingProjects.docs) {
    await payload.delete({ collection: 'projects', id: doc.id });
  }
  console.log(`  [purged] ${existingProjects.docs.length} projects`);

  console.log('[seed] Purging existing industries...');
  const existingIndustries = await payload.find({ collection: 'industries', limit: 100 });
  for (const doc of existingIndustries.docs) {
    await payload.delete({ collection: 'industries', id: doc.id });
  }
  console.log(`  [purged] ${existingIndustries.docs.length} industries`);

  // --- 1. Seed Industries ---
  console.log('[seed] Seeding industries...');
  const industryIdMap = new Map<string, string>();

  for (const industry of INDUSTRIES) {
    // Check if already exists
    const existing = await payload.find({
      collection: 'industries',
      where: { name: { equals: industry.name } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      industryIdMap.set(industry.name, existing.docs[0].id);
      console.log(`  [skip] Industry "${industry.name}" already exists`);
      continue;
    }

    const created = await payload.create({
      collection: 'industries',
      data: {
        name: industry.name,
        color: industry.color,
      },
    });
    industryIdMap.set(industry.name, created.id);
    console.log(`  [created] Industry "${industry.name}"`);

    // Add locale translations
    const translations = industryTranslations[industry.name];
    if (translations) {
      for (const locale of Object.keys(translations) as TranslatableLocale[]) {
        await payload.update({
          collection: 'industries',
          id: created.id,
          locale,
          data: { name: translations[locale] },
        });
      }
      console.log(`  [i18n] Industry "${industry.name}" — ${Object.keys(translations).length} locales`);
    }
  }

  // --- 2. Seed Projects ---
  console.log('[seed] Seeding projects...');

  for (const project of ALL_PROJECTS) {
    // Check if already exists by slug
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  [skip] Project "${project.title}" already exists`);
      continue;
    }

    // Resolve industry names to IDs
    const industryIds = project.industries
      .map((name) => industryIdMap.get(name))
      .filter((id): id is string => !!id);

    // Load featured image from local assets or URL and upload to Payload
    let featuredImageId: string | undefined;
    if (project.featuredImageUrl) {
      try {
        console.log(`  [image] Loading ${project.featuredImageUrl}...`);
        const { buffer, mimetype } = await loadFeaturedImage(project.featuredImageUrl);
        const ext = (MIME_BY_EXT[path.extname(project.featuredImageUrl).slice(1).toLowerCase()]
          ? path.extname(project.featuredImageUrl).slice(1).toLowerCase()
          : mimetype.split('/')[1]) || 'png';
        const uploadFilename = `${project.slug}.${ext}`;

        const media = await payload.create({
          collection: 'media',
          data: { alt: project.featuredImageAlt },
          file: {
            data: buffer,
            name: uploadFilename,
            mimetype,
            size: buffer.length,
          },
        });
        featuredImageId = media.id;
        console.log(`  [image] Uploaded as "${uploadFilename}" (${mimetype}, ${buffer.length} bytes)`);
      } catch (err) {
        console.warn(`  [image] Failed to load image for ${project.title}:`, err);
      }
    }

    // Create the project (default locale = en)
    const created = await payload.create({
      collection: 'projects',
      data: {
        title: project.title,
        slug: project.slug,
        client: project.client,
        description: project.description,
        content: project.content as any,
        featuredImage: featuredImageId ?? null,
        industries: industryIds,
        technologies: project.technologies.map((tech) => ({ technology: tech })),
        status: project.status,
        publishedDate: project.publishedDate,
        order: project.order,
      },
    });
    console.log(
      `  [created] Project "${project.title}" (${project.technologies.length} technologies, ${industryIds.length} industries)`,
    );

    // Add locale translations
    if (project.translations) {
      for (const locale of Object.keys(project.translations) as TranslatableLocale[]) {
        const t = project.translations[locale];
        if (!t) continue;
        await payload.update({
          collection: 'projects',
          id: created.id,
          locale,
          data: {
            title: t.title,
            description: t.description,
            content: t.content as any,
          },
        });
      }
      console.log(
        `  [i18n] Project "${project.title}" — ${Object.keys(project.translations).length} locales`,
      );
    }
  }

  console.log('[seed] Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Error:', err);
  process.exit(1);
});
