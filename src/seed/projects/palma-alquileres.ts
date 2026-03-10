import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const palmaAlquileres: ProjectSeedData = {
  title: 'Palma Alquileres Real Estate Platform',
  slug: 'palma-alquileres-real-estate',
  client: 'Palma Alquileres',
  description:
    'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, with Redis caching and a sales-focused client-facing website.',
  industries: ['Real Estate'],
  technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis'],
  status: 'draft',
  publishedDate: '2016-11-01T00:00:00.000Z',
  order: 12,
  featuredImageUrl: null,
  featuredImageAlt: 'Palma Alquileres real estate listings',
  content: buildRichText([
    h2('Overview'),
    p(
      'Palma Alquileres is a real estate company in Colombia. The project involved building a performant property listing and sales platform from the ground up.',
    ),

    h2('Key Contributions'),

    h3('Backend Architecture'),
    p(
      'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, utilizing Redis for persistence and caching to optimize the client-facing website.',
    ),

    h3('Sales-Focused Frontend'),
    p(
      'Developed a sales-focused, client-facing website seamlessly integrated with the Ruby on Rails API to enhance user experience and drive property sales.',
    ),
  ]),
  translations: {
    es: {
      title: 'Plataforma Inmobiliaria Palma Alquileres',
      description:
        'Empresa inmobiliaria en Colombia. Construcción de una plataforma de listado de propiedades y ventas de alto rendimiento desde cero.',
      content: buildRichText([
        h2('Descripción General'),
        p('Palma Alquileres es una empresa inmobiliaria en Colombia. El proyecto involucró la construcción de una plataforma de listado de propiedades y ventas de alto rendimiento desde cero.'),
        h2('Contribuciones Clave'),
        h3('Arquitectura Backend'),
        p('Arquitectura y desarrollo de una plataforma inmobiliaria de alto rendimiento usando Ruby on Rails y PostgreSQL, utilizando Redis para persistencia y caché para optimizar el sitio web orientado al cliente.'),
        h3('Frontend Orientado a Ventas'),
        p('Desarrollo de un sitio web orientado a ventas y al cliente, integrado de forma fluida con la API de Ruby on Rails para mejorar la experiencia de usuario e impulsar las ventas de propiedades.'),
      ]),
    },
  },
};
