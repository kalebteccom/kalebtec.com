/**
 * Seed script for kalebtec.com
 *
 * Seeds industries and projects into Payload CMS.
 * Run with: pnpm seed
 *
 * Requires MongoDB to be running and PAYLOAD_SECRET / DATABASE_URI env vars set.
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import type { ProjectSeedData } from './types';

import {
  fanfestV3,
  fanfestV2,
  limbicAi,
  synphonyteDental,
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

    // Download and upload featured image if URL is provided
    let featuredImageId: string | undefined;
    if (project.featuredImageUrl) {
      try {
        console.log(`  [image] Downloading ${project.featuredImageUrl}...`);
        const response = await fetch(project.featuredImageUrl);
        if (response.ok) {
          const buffer = Buffer.from(await response.arrayBuffer());
          const contentType = response.headers.get('content-type') || 'image/png';
          const ext = contentType.includes('webp')
            ? 'webp'
            : contentType.includes('png')
              ? 'png'
              : 'jpg';
          const filename = `${project.slug}.${ext}`;

          const media = await payload.create({
            collection: 'media',
            data: { alt: project.featuredImageAlt },
            file: {
              data: buffer,
              name: filename,
              mimetype: contentType,
              size: buffer.length,
            },
          });
          featuredImageId = media.id;
          console.log(`  [image] Uploaded as "${filename}"`);
        }
      } catch (err) {
        console.warn(`  [image] Failed to download image for ${project.title}:`, err);
      }
    }

    // Create the project
    await payload.create({
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
  }

  console.log('[seed] Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Error:', err);
  process.exit(1);
});
