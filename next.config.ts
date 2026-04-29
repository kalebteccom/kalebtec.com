import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Allow images served by the app itself (Payload's /api/media/file/... endpoint,
// used when S3 storage isn't enabled). Derived from NEXT_PUBLIC_SITE_URL so
// dev (localhost) and deployed environments both work without hardcoding.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
let appHostPattern: { protocol: 'http' | 'https'; hostname: string } | undefined;
if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);
    appHostPattern = {
      protocol: parsed.protocol.replace(':', '') as 'http' | 'https',
      hostname: parsed.hostname,
    };
  } catch {
    // malformed URL — skip
  }
}

const nextConfig: NextConfig = {
  htmlLimitedBots: new RegExp('.*'),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kalebtec.com',
      },
      ...(appHostPattern ? [appHostPattern] : []),
    ],
  },
};

export default withPayload(withNextIntl(nextConfig));
