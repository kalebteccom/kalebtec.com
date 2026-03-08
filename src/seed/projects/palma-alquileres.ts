import { buildRichText, h2, h3, p } from '../lexical'
import type { ProjectSeedData } from '../types'

export const palmaAlquileres: ProjectSeedData = {
  title: 'Palma Alquileres Real Estate Platform',
  slug: 'palma-alquileres-real-estate',
  client: 'Palma Alquileres',
  description:
    'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, with Redis caching and a sales-focused client-facing website.',
  industries: ['Real Estate'],
  technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis'],
  status: 'published',
  publishedDate: '2016-11-01T00:00:00.000Z',
  order: 12,
  featuredImageUrl: null,
  featuredImageAlt: 'Palma Alquileres real estate listings',
  content: buildRichText([
    h2('Overview'),
    p(
      'Palma Alquileres is a real estate company in Colombia. The project involved building a performant property listing and sales platform from the ground up.'
    ),

    h2('Key Contributions'),

    h3('Backend Architecture'),
    p(
      'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, utilizing Redis for persistence and caching to optimize the client-facing website.'
    ),

    h3('Sales-Focused Frontend'),
    p(
      'Developed a sales-focused, client-facing website seamlessly integrated with the Ruby on Rails API to enhance user experience and drive property sales.'
    ),
  ]),
}
