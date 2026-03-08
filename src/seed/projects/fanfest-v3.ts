import { buildRichText, h2, h3, p, ul } from '../lexical'
import type { ProjectSeedData } from '../types'

export const fanfestV3: ProjectSeedData = {
  title: 'FanFest 3.0 Platform',
  slug: 'fanfest-v3-platform',
  client: 'FanFest',
  description:
    'Planned and architected version 3.0 of the FanFest platform — a real-time fan engagement system serving partners like Paris Saint-Germain FC, Comcast, the Premier League, and Real Madrid.',
  industries: ['Sports & Entertainment', 'Streaming & Media'],
  technologies: [
    'TypeScript',
    'Vue.js',
    'Node.js',
    'WebSockets',
    'AWS Chime SDK',
    'AWS Elemental',
    'OpenAI',
    'Viem',
    'WalletConnect',
  ],
  status: 'published',
  publishedDate: '2024-06-01T00:00:00.000Z',
  order: 1,
  featuredImageUrl: null,
  featuredImageAlt: 'FanFest 3.0 platform interface',
  content: buildRichText([
    h2('Overview'),
    p(
      'FanFest is a real-time fan engagement platform that connects sports fans with live events, interactive shows, and exclusive content from the world\'s biggest sports organizations.'
    ),
    p(
      'As Lead Software Engineer, Rowin planned and architected the roadmap for version 3.0, meeting technical requirements from business partners including Paris Saint-Germain FC, Comcast, the Premier League, and Real Madrid.'
    ),

    h2('Key Contributions'),

    h3('AI-Powered Content Moderation'),
    p(
      'Developed AI-based moderation and translation pipelines for user-authored content across real-time event live chats and static content, using OpenAI and a queue management system with real-time updates via WebSockets on targeted channels.'
    ),

    h3('Crypto Wallet Integration'),
    p(
      'Integrated Chiliz crypto-wallets into the platform\'s identity and gating mechanisms using Viem, Reown\'s WalletConnect, and AppKit — enabling token-gated access to exclusive fan experiences.'
    ),

    h3('Live Streaming Infrastructure'),
    p(
      'Developed a media pipeline distribution system to manage live-streaming capabilities for fans, integrating with AWS Elemental Media Services to support Low Latency HLS delivery.'
    ),

    h3('Identity & Access Architecture'),
    p(
      'Designed a layered identity system for seamless authentication and membership management (RBAC), integrating with partners to allow users to share a single profile and merge external profiles across different channels (tenants).'
    ),

    h3('Real-Time Communication'),
    p(
      'Architected the app\'s layered service architecture, including tracking, live-show tile coordination, real-time communication, and WebRTC capabilities using AWS Chime Web SDK.'
    ),

    h2('Team Leadership'),
    ul([
      'Led a team of six engineers using Agile practices',
      'Designed the technical hiring process and conducted interviews',
      'Established coding standards and code review workflows',
    ]),
  ]),
}
