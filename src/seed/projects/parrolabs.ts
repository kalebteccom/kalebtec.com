import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const parrolabs: ProjectSeedData = {
  title: 'Parrolabs News & Maps Platform',
  slug: 'parrolabs-news-maps-platform',
  client: 'Parrolabs',
  description:
    'Improved the codebase of a React.js app for a prominent news company, optimizing image loading and enhancing SEO through server-side rendering. Developed a map-intensive application for boot camps in Medellin.',
  industries: ['Media & News', 'SaaS'],
  technologies: ['React.js', 'SSR', 'Mapbox'],
  status: 'draft',
  publishedDate: '2018-03-01T00:00:00.000Z',
  order: 10,
  featuredImageUrl: null,
  featuredImageAlt: 'Parrolabs news platform interface',
  content: buildRichText([
    h2('Overview'),
    p(
      'At Parrolabs, a software consultancy in Medellin, Rowin worked on two distinct client projects: a news platform requiring performance and SEO optimization, and a map-intensive boot camp discovery application.',
    ),

    h2('News Platform'),

    h3('Performance & SEO'),
    p(
      'Fixed issues and improved the codebase of an existing React.js app for a prominent news company, optimizing image loading and enhancing SEO through server-side rendering.',
    ),

    h2('Boot Camp Maps Application'),

    h3('Interactive Mapping'),
    p(
      'Further developed a map-intensive React.js application for boot camps in Medellin, Colombia, enhancing functionality, location discovery, and overall user experience.',
    ),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Noticias y Mapas Parrolabs',
      description:
        'Trabajo en dos proyectos distintos de clientes: una plataforma de noticias que requería optimización de rendimiento y SEO, y una aplicación intensiva en mapas para descubrimiento de boot camps.',
      content: buildRichText([
        h2('Descripción General'),
        p('En Parrolabs, una consultora de software en Medellín, Rowin trabajó en dos proyectos distintos de clientes: una plataforma de noticias que requería optimización de rendimiento y SEO, y una aplicación intensiva en mapas para descubrimiento de boot camps.'),
        h2('Plataforma de Noticias'),
        h3('Rendimiento y SEO'),
        p('Corrección de incidencias y mejora del código de una aplicación React.js existente para una prominente empresa de noticias, optimizando la carga de imágenes y mejorando el SEO mediante renderizado del lado del servidor.'),
        h2('Aplicación de Mapas de Boot Camps'),
        h3('Mapeo Interactivo'),
        p('Desarrollo adicional de una aplicación React.js intensiva en mapas para boot camps en Medellín, Colombia, mejorando la funcionalidad, el descubrimiento de ubicaciones y la experiencia general del usuario.'),
      ]),
    },
  },
};
