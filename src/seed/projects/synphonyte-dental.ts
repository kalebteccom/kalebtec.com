import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const synphonyteDental: ProjectSeedData = {
  title: '3D Dental Imaging Software',
  slug: '3d-dental-imaging-software',
  client: 'Synphonyte',
  description:
    'Developed complex 3D dental imaging software with custom nerve-canal geometry rendering, visual regression testing, and Kubernetes-based deployment pipelines. Led multiple cross-functional teams across diverse projects.',
  industries: ['Healthcare & MedTech'],
  technologies: [
    'Vue.js',
    'THREE.js',
    'Puppeteer',
    'AVA.js',
    'AWS CodeBuild',
    'AWS Lambda',
    'GitLab CI',
    'Kubernetes',
    'Strapi',
  ],
  status: 'published',
  publishedDate: '2023-06-01T00:00:00.000Z',
  order: 4,
  featuredImageUrl: null,
  featuredImageAlt: '3D dental imaging software visualization',
  content: buildRichText([
    h2('Overview'),
    p(
      'Synphonyte develops cutting-edge dental technology software. Over nearly four years, Rowin led engineering efforts across 3D imaging, social media aggregation, internal tooling, and mobile game development.',
    ),

    h2('3D Dental Imaging'),

    h3('Visual Regression Testing'),
    p(
      'Developed visual regression tests for complex 3D dental imaging software using Puppeteer and AVA.js, integrated with AWS CodeBuild, Lambda Functions, and GitLab CI for automated quality assurance.',
    ),

    h3('Custom Nerve-Canal Geometry'),
    p(
      "Designed and implemented custom nerve-canal geometry alongside graphics experts using Vue.js, THREE.js, and a custom rendering pipeline — enhancing radiologists' preparation for dental implant procedures.",
    ),

    h2('Additional Projects at Synphonyte'),

    h3('Social Media Aggregation Platform'),
    ul([
      'Led a social media aggregation project managing three remote, cross-functional developers',
      'Deployed Kubernetes systems with integrations to social media platforms',
      'Used Strapi, Heroku, IBM Cloud, IBM Cloudant, and IBM Functions',
    ]),

    h3('Soku Mobile Puzzle Game'),
    ul([
      'Managed a team of seven: game story writers, developers, and stakeholders',
      'Conducted weekly meetings and bi-annual performance reviews',
      'Applied Agile methodologies throughout the development lifecycle',
    ]),

    h3('Internal Developer Tools'),
    p(
      'Created and deployed internal tools to accelerate development processes through integrations with Harvest time tracking and Infinity project boards.',
    ),
  ]),
};
