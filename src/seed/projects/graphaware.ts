import { buildRichText, h2, h3, p } from '../lexical'
import type { ProjectSeedData } from '../types'

export const graphaware: ProjectSeedData = {
  title: 'GraphAware Analytics Suite',
  slug: 'graphaware-analytics-suite',
  client: 'GraphAware',
  description:
    'Designed and developed solutions for the analytics suite of a web application using Vue.js and Neo4j. Built end-to-end tests for a complex canvas-based graph editor using Playwright.',
  industries: ['Data & Analytics', 'SaaS'],
  technologies: ['Vue.js', 'Neo4j', 'Playwright', 'Java'],
  status: 'published',
  publishedDate: '2023-08-01T00:00:00.000Z',
  order: 6,
  featuredImageUrl:
    'https://graphaware.com/wp-content/uploads/2024/09/GraphAware_Social-Avatar.png',
  featuredImageAlt: 'GraphAware graph analytics platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'GraphAware specializes in graph-powered analytics and knowledge management. The Hume platform enables organizations to extract insights from complex, interconnected data using Neo4j graph databases.'
    ),

    h2('Key Contributions'),

    h3('Analytics Suite Development'),
    p(
      'Designed and developed solutions for the analytics suite of the web application using Vue.js on the frontend and Neo4j for graph data querying and visualization.'
    ),

    h3('End-to-End Testing'),
    p(
      'Developed comprehensive end-to-end tests for a complex, canvas-based web graph editor utilizing Playwright for Java — ensuring functionality and performance across interactive graph manipulation workflows.'
    ),
  ]),
}
