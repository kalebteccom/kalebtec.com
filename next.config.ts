import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

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

export default withPayload(nextConfig);
