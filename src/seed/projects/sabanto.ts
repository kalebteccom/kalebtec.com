import { buildRichText, h2, h3, p, ul } from '../lexical'
import type { ProjectSeedData } from '../types'

export const sabanto: ProjectSeedData = {
  title: 'Sabanto Mission Control',
  slug: 'sabanto-mission-control',
  client: 'Sabanto',
  description:
    'Built the Mission Control interface for autonomous farming equipment — developing map-based views with GeoJSON, deck.gl, and Mapbox, a custom map layering system, and the mobile MVP in React Native.',
  industries: ['AgTech & IoT'],
  technologies: [
    'React',
    'React Native',
    'TypeScript',
    'GeoJSON',
    'deck.gl',
    'Mapbox',
    'Turf.js',
    'TailwindCSS',
    'Storybook',
  ],
  status: 'published',
  publishedDate: '2023-02-01T00:00:00.000Z',
  order: 7,
  featuredImageUrl: null,
  featuredImageAlt: 'Sabanto Mission Control autonomous farming interface',
  content: buildRichText([
    h2('Overview'),
    p(
      'Sabanto builds autonomous farming technology, enabling tractors and equipment to operate without drivers. The Mission Control system is the central interface operators use to manage fleets of autonomous machines across vast agricultural fields.'
    ),

    h2('Key Contributions'),

    h3('Map-Based Mission Views'),
    p(
      'Researched and developed components to enhance user experience of map-based views using React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS, and Storybook.'
    ),

    h3('Map Layering Architecture'),
    p(
      'Designed and implemented a map layering system to manage map objects and features as individual components, enabling communication between layers using React\'s context, portals, and event buses.'
    ),

    h3('Mobile MVP'),
    ul([
      'Developed the Mission Control mobile MVP using React Native, Mapbox, and TypeScript',
      'Showcased real-time field monitoring and equipment tracking capabilities',
      'Enabled on-the-go mission management for farm operators',
    ]),
  ]),
}
