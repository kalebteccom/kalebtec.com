import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const fanfestV2: ProjectSeedData = {
  title: 'FanFest 2.0 Platform',
  slug: 'fanfest-v2-platform',
  client: 'FanFest',
  description:
    'Developed and deployed version 2.0 of the FanFest platform for real-time events across partners including PSG, Manchester City, and The 49ers. Architected crypto wallet integrations and screen-sharing capabilities for live shows.',
  industries: ['Sports & Entertainment', 'Streaming & Media'],
  technologies: [
    'Vue.js',
    'Vue.js 3',
    'Vuetify',
    'TailwindCSS',
    'Socket.IO',
    'PhenixRTS',
    'Docker',
    'GCP App Engine',
    'AWS Chime SDK',
  ],
  status: 'published',
  publishedDate: '2022-12-01T00:00:00.000Z',
  order: 2,
  featuredImageUrl: null,
  featuredImageAlt: 'FanFest 2.0 real-time event platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Version 2.0 of the FanFest platform brought real-time event capabilities to fans across all partner organizations, from major football clubs to NFL franchises.',
    ),

    h2('Key Contributions'),

    h3('Platform Development & Deployment'),
    p(
      'Developed and deployed the platform for real-time events utilizing Vue.js, PhenixRTS for low-latency streaming, and Socket.IO for real-time bidirectional communication.',
    ),

    h3('Crypto Wallet Integrations'),
    p(
      'Architected and developed integrations with crypto wallets in collaboration with the CEO, enabling token-gated fan experiences with partners like PSG, Manchester City, and The 49ers.',
    ),

    h3('Screen-Sharing for Producers'),
    p(
      'Researched and developed screen-sharing capabilities for producers during live shows, integrating streams into simulcasts using Docker and GCP App Engine.',
    ),

    h3('Platform Modernization'),
    ul([
      'Migrated the project to Vue.js 3, Vuetify 3, and TailwindCSS',
      'Enabled new composable patterns to enhance development experience',
      'Integrated AWS Chime SDK to improve real-time experience and reduce latency',
      'Triaged issues using LogRocket, GCP Cloud Logging, and New Relic',
    ]),
  ]),
};
