import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const graphaware: ProjectSeedData = {
  title: 'GraphAware Analytics Suite',
  slug: 'graphaware-analytics-suite',
  client: 'GraphAware',
  description:
    'Designed and developed solutions for the analytics suite of a web application using Vue.js and Neo4j. Built end-to-end tests for a complex canvas-based graph editor using Playwright.',
  industries: ['Data & Analytics', 'SaaS'],
  technologies: ['Vue.js', 'Neo4j', 'Playwright', 'Java'],
  status: 'draft',
  publishedDate: '2023-08-01T00:00:00.000Z',
  order: 6,
  featuredImageUrl:
    'https://graphaware.com/wp-content/uploads/2024/09/GraphAware_Social-Avatar.png',
  featuredImageAlt: 'GraphAware graph analytics platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'GraphAware specializes in graph-powered analytics and knowledge management. The Hume platform enables organizations to extract insights from complex, interconnected data using Neo4j graph databases.',
    ),

    h2('Key Contributions'),

    h3('Analytics Suite Development'),
    p(
      'Designed and developed solutions for the analytics suite of the web application using Vue.js on the frontend and Neo4j for graph data querying and visualization.',
    ),

    h3('End-to-End Testing'),
    p(
      'Developed comprehensive end-to-end tests for a complex, canvas-based web graph editor utilizing Playwright for Java — ensuring functionality and performance across interactive graph manipulation workflows.',
    ),
  ]),
  translations: {
    es: {
      title: 'Suite de Analítica GraphAware',
      description:
        'Analítica basada en grafos y gestión del conocimiento. La plataforma Hume permite a las organizaciones extraer insights de datos complejos e interconectados usando bases de datos de grafos Neo4j.',
      content: buildRichText([
        h2('Descripción General'),
        p('GraphAware se especializa en analítica basada en grafos y gestión del conocimiento. La plataforma Hume permite a las organizaciones extraer insights de datos complejos e interconectados usando bases de datos de grafos Neo4j.'),
        h2('Contribuciones Clave'),
        h3('Desarrollo de la Suite de Analítica'),
        p('Diseño y desarrollo de soluciones para la suite de analítica de la aplicación web usando Vue.js en el frontend y Neo4j para consultas y visualización de datos de grafos.'),
        h3('Pruebas End-to-End'),
        p('Desarrollo de pruebas end-to-end exhaustivas para un editor de grafos web complejo basado en canvas, utilizando Playwright para Java — asegurando funcionalidad y rendimiento en flujos de trabajo de manipulación interactiva de grafos.'),
      ]),
    },
  },
};
