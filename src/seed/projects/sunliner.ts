import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const sunliner: ProjectSeedData = {
  title: 'Sunliner Travel Platform',
  slug: 'sunliner-travel-platform',
  client: 'Sunliner',
  description:
    'Architected and led development of a Next.js front-end application with server-side rendering for a prominent Dutch tour operator, managing a team of four remote developers and collaborating with stakeholders to tailor the platform to the Netherlands market.',
  industries: ['Travel & Hospitality'],
  technologies: ['React.js', 'Next.js', 'PHP', 'Agile'],
  status: 'published',
  publishedDate: '2021-06-01T00:00:00.000Z',
  order: 8,
  featuredImageUrl: null,
  featuredImageAlt: 'Sunliner travel booking platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Sunliner is a prominent tour operator company in the Netherlands, offering vacation packages and travel experiences. The platform needed a complete frontend overhaul to support their growing user base and meet modern performance expectations.',
    ),

    h2('Key Contributions'),

    h3('Performance Optimization'),
    p(
      'Resolved performance issues in the existing PHP application, improving image loading and overall site speed for a better user experience.',
    ),

    h3('Modern Frontend Architecture'),
    p(
      'Architected, led, and developed a React.js front-end application with server-side rendering using Next.js and modern techniques to support a large user base in a scalable and performant way.',
    ),

    h3('Team & Stakeholder Management'),
    ul([
      'Managed a team of four remote web developers',
      'Utilized Agile methodologies and Kanban tools including Slack, Trello, Infinity, and Notion',
      'Responsible for hiring and team coordination',
      'Collaborated closely with stakeholders, the CEO, and tour operation agents',
      'Ensured user flows and shopping experiences were tailored to the Netherlands market',
    ]),
  ]),
};
