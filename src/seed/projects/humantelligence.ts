import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

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
  status: 'draft',
  publishedDate: '2023-10-01T00:00:00.000Z',
  order: 5,
  featuredImageUrl: 'https://www.humantelligence.com/Outlook.png',
  featuredImageAlt: 'Humantelligence EQ-everywhere Outlook integration',
  content: buildRichText([
    h2('Overview'),
    p(
      'Humantelligence provides people analytics and team collaboration tools used by enterprises worldwide. Rowin worked with the company across two separate engagements spanning five years.',
    ),

    h2('Platform Architecture (2023)'),

    h3('Mono-Repo Migration'),
    p(
      'Developed a future-proof architecture using PNPM to set up a mono-repo, segregating different mini-apps from the core platform with integrated linting and formatting tools.',
    ),

    h3('Build System Modernization'),
    ul([
      'Migrated from Create React App (CRA) to Vite, maintaining all capabilities including automatic S3 asset uploads',
      'Upgraded React to the latest stable versions and enabled strict mode',
      'Improved developer experience and deployment performance by 10x',
    ]),

    h3('Team Coaching'),
    p(
      'Coached the team into modern React practices, including caching with SWR and performance profiling techniques.',
    ),

    h2('Mobile & Browser Extensions (2018–2020)'),

    h3('Cross-Platform Mobile App'),
    p(
      'Designed and developed a cross-platform, client-facing mobile application using React Native and MS CodePush for over-the-air updates.',
    ),

    h3('EQ-everywhere Browser Extensions'),
    p(
      'Designed and developed EQ-everywhere integrations with mailboxes on modern browsers to provide tailored communication and engagement tips, utilizing React.js, content scripts, and an event-driven architecture.',
    ),

    h3('Rails to React Migration'),
    p(
      'Planned and led a long-term migration of a rich UI/UX Ruby on Rails front-end to React.js, enhancing performance and maintainability.',
    ),
  ]),
  translations: {
    es: {
      title: 'Modernización de la Plataforma Humantelligence',
      description:
        'Herramientas de analítica de personas y colaboración de equipos utilizadas por empresas en todo el mundo, con dos compromisos separados a lo largo de cinco años.',
      content: buildRichText([
        h2('Descripción General'),
        p('Humantelligence proporciona herramientas de analítica de personas y colaboración de equipos utilizadas por empresas en todo el mundo. Rowin trabajó con la empresa en dos compromisos separados a lo largo de cinco años.'),
        h2('Arquitectura de la Plataforma (2023)'),
        h3('Migración a Mono-Repo'),
        p('Desarrollo de una arquitectura preparada para el futuro usando PNPM para configurar un mono-repo, segregando diferentes mini-apps del core de la plataforma con herramientas integradas de linting y formateo.'),
        h3('Modernización del Sistema de Build'),
        ul([
          'Migración de Create React App (CRA) a Vite, manteniendo todas las capacidades incluyendo la subida automática de assets a S3',
          'Actualización de React a las últimas versiones estables y habilitación del modo estricto',
          'Mejora de la experiencia de desarrollo y el rendimiento de despliegue en 10x',
        ]),
        h3('Coaching del Equipo'),
        p('Coaching del equipo en prácticas modernas de React, incluyendo caché con SWR y técnicas de profiling de rendimiento.'),
        h2('Aplicaciones Móviles y Extensiones de Navegador (2018–2020)'),
        h3('Aplicación Móvil Multiplataforma'),
        p('Diseño y desarrollo de una aplicación móvil multiplataforma orientada al cliente usando React Native y MS CodePush para actualizaciones over-the-air.'),
        h3('Extensiones de Navegador EQ-everywhere'),
        p('Diseño y desarrollo de integraciones EQ-everywhere con buzones de correo en navegadores modernos para proporcionar consejos personalizados de comunicación y engagement, utilizando React.js, content scripts y una arquitectura basada en eventos.'),
        h3('Migración de Rails a React'),
        p('Planificación y liderazgo de una migración a largo plazo del front-end Ruby on Rails con UX rica hacia React.js, mejorando el rendimiento y la mantenibilidad.'),
      ]),
    },
  },
};
