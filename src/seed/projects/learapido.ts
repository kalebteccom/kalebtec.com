import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const learapido: ProjectSeedData = {
  title: 'Lea Rapido Speed-Reading Platform',
  slug: 'lea-rapido-speed-reading-platform',
  client: 'Lea Rapido',
  description:
    "Led development of a speed-reading academy's mobile platform, managing a team of five and building a rich visual learning experience using Flutter and Rive animations, backed by a scalable Ruby on Rails infrastructure.",
  industries: ['EdTech'],
  technologies: [
    'Flutter',
    'Rive (Flare)',
    'Ruby on Rails',
    'Redis',
    'PostgreSQL',
    'AWS EC2',
    'AWS S3',
    'Figma',
  ],
  status: 'published',
  publishedDate: '2021-01-01T00:00:00.000Z',
  order: 9,
  featuredImageUrl: 'https://www.learapido.com/wp-content/uploads/2023/10/logo_horizontal_3.png',
  featuredImageAlt: 'Lea Rapido speed-reading academy logo',
  content: buildRichText([
    h2('Overview'),
    p(
      'Lea Rapido is a speed-reading academy based in Medellin, Colombia, that teaches students to read 200 pages in 60 minutes with full comprehension. The project converted their formal in-person course into an engaging mobile format.',
    ),

    h2('Key Contributions'),

    h3('Mobile Learning Experience'),
    p(
      'Researched and developed a rich visual experience to enhance reading skills in a cross-platform mobile application using Flutter, Flare (Rive) animations, Figma, and Sketch.',
    ),

    h3('Scalable Backend'),
    p(
      'Architected a scalable platform solution to support thousands of monthly users, utilizing Ruby on Rails, Redis, PostgreSQL, AWS EC2, and AWS S3.',
    ),

    h3('Team Leadership'),
    ul([
      'Led a project team of five mobile developers and copywriters',
      'Oversaw hiring and onboarding',
      'Employed Agile methodologies with daily stand-ups, planning sessions, and coaching',
    ]),
  ]),
};
