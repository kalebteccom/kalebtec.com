import { buildRichText, h2, h3, p } from '../lexical'
import type { ProjectSeedData } from '../types'

export const parrolabs: ProjectSeedData = {
  title: 'Parrolabs News & Maps Platform',
  slug: 'parrolabs-news-maps-platform',
  client: 'Parrolabs',
  description:
    'Improved the codebase of a React.js app for a prominent news company, optimizing image loading and enhancing SEO through server-side rendering. Developed a map-intensive application for boot camps in Medellin.',
  industries: ['Media & News', 'SaaS'],
  technologies: ['React.js', 'SSR', 'Mapbox'],
  status: 'published',
  publishedDate: '2018-03-01T00:00:00.000Z',
  order: 10,
  featuredImageUrl: null,
  featuredImageAlt: 'Parrolabs news platform interface',
  content: buildRichText([
    h2('Overview'),
    p(
      'At Parrolabs, a software consultancy in Medellin, Rowin worked on two distinct client projects: a news platform requiring performance and SEO optimization, and a map-intensive boot camp discovery application.'
    ),

    h2('News Platform'),

    h3('Performance & SEO'),
    p(
      'Fixed issues and improved the codebase of an existing React.js app for a prominent news company, optimizing image loading and enhancing SEO through server-side rendering.'
    ),

    h2('Boot Camp Maps Application'),

    h3('Interactive Mapping'),
    p(
      'Further developed a map-intensive React.js application for boot camps in Medellin, Colombia, enhancing functionality, location discovery, and overall user experience.'
    ),
  ]),
}
