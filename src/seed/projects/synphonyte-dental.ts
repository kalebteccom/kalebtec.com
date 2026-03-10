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
  status: 'draft',
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
  translations: {
    es: {
      title: 'Software de Imagen Dental 3D',
      description:
        'Tecnología dental de vanguardia que abarca imagen 3D, agregación de redes sociales, herramientas internas y desarrollo de juegos móviles durante casi cuatro años de liderazgo de ingeniería.',
      content: buildRichText([
        h2('Descripción General'),
        p('Synphonyte desarrolla software de tecnología dental de vanguardia. Durante casi cuatro años, Rowin lideró los esfuerzos de ingeniería en imagen 3D, agregación de redes sociales, herramientas internas y desarrollo de juegos móviles.'),
        h2('Imagen Dental 3D'),
        h3('Pruebas de Regresión Visual'),
        p('Desarrollo de pruebas de regresión visual para software complejo de imagen dental 3D usando Puppeteer y AVA.js, integradas con AWS CodeBuild, Lambda Functions y GitLab CI para aseguramiento de calidad automatizado.'),
        h3('Geometría Personalizada de Canal Nervioso'),
        p('Diseño e implementación de geometría personalizada de canal nervioso junto a expertos en gráficos usando Vue.js, THREE.js y un pipeline de renderizado personalizado — mejorando la preparación de radiólogos para procedimientos de implantes dentales.'),
        h2('Proyectos Adicionales en Synphonyte'),
        h3('Plataforma de Agregación de Redes Sociales'),
        ul([
          'Liderazgo de un proyecto de agregación de redes sociales gestionando tres desarrolladores remotos y multifuncionales',
          'Despliegue de sistemas Kubernetes con integraciones a plataformas de redes sociales',
          'Uso de Strapi, Heroku, IBM Cloud, IBM Cloudant e IBM Functions',
        ]),
        h3('Juego Móvil de Puzzle Soku'),
        ul([
          'Gestión de un equipo de siete: escritores de historias, desarrolladores y stakeholders',
          'Reuniones semanales y evaluaciones de rendimiento bianuales',
          'Aplicación de metodologías Agile a lo largo del ciclo de desarrollo',
        ]),
        h3('Herramientas Internas para Desarrolladores'),
        p('Creación y despliegue de herramientas internas para acelerar los procesos de desarrollo mediante integraciones con Harvest para seguimiento de tiempo e Infinity para gestión de proyectos.'),
      ]),
    },
  },
};
