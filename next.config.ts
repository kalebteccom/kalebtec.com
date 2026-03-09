import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  htmlLimitedBots: new RegExp('.*'),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kalebtec.com',
      },
    ],
  },
};

export default withPayload(withNextIntl(nextConfig));
