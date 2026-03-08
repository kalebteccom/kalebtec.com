import { buildRichText, h2, h3, p, ul } from '../lexical'
import type { ProjectSeedData } from '../types'

export const humantelligence: ProjectSeedData = {
  title: 'Humantelligence Platform Modernization',
  slug: 'humantelligence-platform-modernization',
  client: 'Humantelligence',
  description:
    'Modernized the Humantelligence platform across two engagements: first as a mobile engineer building the cross-platform app and EQ-everywhere browser extensions, then returning to architect a mono-repo migration and 10x deployment performance improvement.',
  industries: ['HR & People Analytics', 'SaaS'],
  technologies: [
    'React.js',
    'React Native',
    'Vite',
    'PNPM',
    'SWR',
    'Ruby on Rails',
    'MS CodePush',
    'Figma',
  ],
  status: 'published',
  publishedDate: '2023-10-01T00:00:00.000Z',
  order: 5,
  featuredImageUrl: 'https://www.humantelligence.com/Outlook.png',
  featuredImageAlt: 'Humantelligence EQ-everywhere Outlook integration',
  content: buildRichText([
    h2('Overview'),
    p(
      'Humantelligence provides people analytics and team collaboration tools used by enterprises worldwide. Rowin worked with the company across two separate engagements spanning five years.'
    ),

    h2('Platform Architecture (2023)'),

    h3('Mono-Repo Migration'),
    p(
      'Developed a future-proof architecture using PNPM to set up a mono-repo, segregating different mini-apps from the core platform with integrated linting and formatting tools.'
    ),

    h3('Build System Modernization'),
    ul([
      'Migrated from Create React App (CRA) to Vite, maintaining all capabilities including automatic S3 asset uploads',
      'Upgraded React to the latest stable versions and enabled strict mode',
      'Improved developer experience and deployment performance by 10x',
    ]),

    h3('Team Coaching'),
    p(
      'Coached the team into modern React practices, including caching with SWR and performance profiling techniques.'
    ),

    h2('Mobile & Browser Extensions (2018–2020)'),

    h3('Cross-Platform Mobile App'),
    p(
      'Designed and developed a cross-platform, client-facing mobile application using React Native and MS CodePush for over-the-air updates.'
    ),

    h3('EQ-everywhere Browser Extensions'),
    p(
      'Designed and developed EQ-everywhere integrations with mailboxes on modern browsers to provide tailored communication and engagement tips, utilizing React.js, content scripts, and an event-driven architecture.'
    ),

    h3('Rails to React Migration'),
    p(
      'Planned and led a long-term migration of a rich UI/UX Ruby on Rails front-end to React.js, enhancing performance and maintainability.'
    ),
  ]),
}
