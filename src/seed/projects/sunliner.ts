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
  status: 'draft',
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
  translations: {
    es: {
      title: 'Plataforma de Viajes Sunliner',
      description:
        'Operador turístico destacado en los Países Bajos que ofrece paquetes vacacionales y experiencias de viaje. La plataforma necesitaba una renovación completa del frontend.',
      content: buildRichText([
        h2('Descripción General'),
        p('Sunliner es una empresa operadora turística destacada en los Países Bajos, que ofrece paquetes vacacionales y experiencias de viaje. La plataforma necesitaba una renovación completa del frontend para soportar su creciente base de usuarios y cumplir con las expectativas de rendimiento modernas.'),
        h2('Contribuciones Clave'),
        h3('Optimización de Rendimiento'),
        p('Resolución de problemas de rendimiento en la aplicación PHP existente, mejorando la carga de imágenes y la velocidad general del sitio para una mejor experiencia de usuario.'),
        h3('Arquitectura Frontend Moderna'),
        p('Arquitectura, liderazgo y desarrollo de una aplicación front-end con React.js con renderizado del lado del servidor usando Next.js y técnicas modernas para soportar una gran base de usuarios de forma escalable y eficiente.'),
        h3('Gestión de Equipo y Stakeholders'),
        ul([
          'Gestión de un equipo de cuatro desarrolladores web remotos',
          'Utilización de metodologías Agile y herramientas Kanban incluyendo Slack, Trello, Infinity y Notion',
          'Responsable de contratación y coordinación del equipo',
          'Colaboración estrecha con stakeholders, el CEO y agentes de operaciones turísticas',
          'Aseguramiento de que los flujos de usuario y experiencias de compra estuvieran adaptados al mercado de los Países Bajos',
        ]),
      ]),
    },
  },
};
