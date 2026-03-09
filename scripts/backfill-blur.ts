/**
 * Backfill blurDataURL for existing media documents.
 *
 * Run with: NODE_OPTIONS='--no-warnings' tsx --env-file .env scripts/backfill-blur.ts
 *
 * Requires MongoDB to be running and PAYLOAD_SECRET / DATABASE_URI env vars set.
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function backfill() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'media',
    where: {
      mimeType: { contains: 'image' },
    },
    limit: 0,
  });

  const toProcess = docs.filter((doc) => !doc.blurDataURL);
  console.log(`Found ${toProcess.length} images without blurDataURL (of ${docs.length} total)`);

  let updated = 0;
  for (const doc of toProcess) {
    if (!doc.filename) continue;

    try {
      // Try local file first
      const localPath = path.resolve(__dirname, '../public/media', doc.filename);
      let buffer: Buffer;

      try {
        buffer = await fs.readFile(localPath);
      } catch {
        // If local file doesn't exist (S3-only), fetch from URL
        if (!doc.url) {
          console.warn(`  Skip: ${doc.filename} — no local file or URL`);
          continue;
        }
        const res = await fetch(doc.url);
        buffer = Buffer.from(await res.arrayBuffer());
      }

      const blurred = await sharp(buffer)
        .resize(20, 20, { fit: 'inside' })
        .jpeg({ quality: 20 })
        .toBuffer();

      const blurDataURL = `data:image/jpeg;base64,${blurred.toString('base64')}`;

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { blurDataURL },
      });

      updated++;
      console.log(`  Updated: ${doc.filename}`);
    } catch (err) {
      console.error(`  Failed: ${doc.filename}`, err);
    }
  }

  console.log(`\nDone — ${updated} images updated.`);
  process.exit(0);
}

backfill();
