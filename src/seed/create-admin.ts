/**
 * One-off script to create an admin user.
 * Run with: pnpm create-admin
 *
 * Reads target email from CREATE_ADMIN_EMAIL env var, or defaults to the
 * constant below. Generates a random temporary password and prints it once.
 */
import { randomBytes } from 'node:crypto';
import { getPayload } from 'payload';
import config from '@payload-config';

const DEFAULT_EMAIL = 'rowin@kalebtec.com';
const DEFAULT_NAME = 'Rowin Hernandez';

function generatePassword(): string {
  return randomBytes(18).toString('base64url');
}

async function run() {
  const email = process.env.CREATE_ADMIN_EMAIL ?? DEFAULT_EMAIL;
  const name = process.env.CREATE_ADMIN_NAME ?? DEFAULT_NAME;

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.error(`[create-admin] A user with email "${email}" already exists. Aborting.`);
    process.exit(1);
  }

  const password = generatePassword();

  const created = await payload.create({
    collection: 'users',
    data: {
      email,
      name,
      role: 'admin',
      password,
    },
  });

  console.log('\n[create-admin] Admin user created:');
  console.log(`  id:       ${created.id}`);
  console.log(`  email:    ${created.email}`);
  console.log(`  name:     ${created.name ?? ''}`);
  console.log(`  role:     ${created.role}`);
  console.log(`\n  password: ${password}`);
  console.log('\n  ^ Save this now — it will not be shown again. Reset it after first login.\n');

  process.exit(0);
}

run().catch((err) => {
  console.error('[create-admin] Error:', err);
  process.exit(1);
});
