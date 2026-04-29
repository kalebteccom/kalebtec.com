import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const graphaware: ProjectSeedData = {
  title: 'GraphAware Analytics Suite',
  slug: 'graphaware-analytics-suite',
  client: 'GraphAware',
  description:
    "We joined GraphAware's Hume platform — a Neo4j-powered graph analytics application — as senior engineers on the analytics suite. We designed and shipped Vue.js features against Neo4j and built end-to-end test coverage for a canvas-based graph editor using Playwright for Java.",
  industries: ['Data & Analytics', 'SaaS'],
  technologies: ['Vue.js', 'Neo4j', 'Playwright', 'Java'],
  status: 'published',
  publishedDate: '2023-08-01T00:00:00.000Z',
  order: 7,
  featuredImageUrl: 'graphaware.png',
  featuredImageAlt: 'GraphAware Hume graph analytics platform',
  content: buildRichText([
    h2('Overview'),
    p(
      "GraphAware specializes in graph-powered analytics and knowledge management. Hume, their flagship platform, helps organizations extract insights from complex, interconnected data using Neo4j graph databases. We joined as the engineering team behind the analytics suite.",
    ),

    h2('Key Contributions'),

    h3('Analytics Suite Development'),
    p(
      'Designed and developed solutions for the analytics suite of the web application using Vue.js on the frontend and Neo4j for graph data querying and visualization.',
    ),

    h3('End-to-End Testing'),
    p(
      'Developed end-to-end tests for a complex, canvas-based web graph editor using Playwright for Java — covering interactive graph manipulation workflows to ensure functionality and performance.',
    ),
  ]),
  translations: {
    es: {
      title: 'Suite de Analítica GraphAware',
      description:
        'Contrato como Contractor — Senior Software Engineer en la suite de analítica de la plataforma Hume de GraphAware, una aplicación de grafos sobre Neo4j. Diseñé y desarrollé funcionalidades en Vue.js contra Neo4j y escribí tests end-to-end de un editor de grafos basado en canvas usando Playwright para Java.',
      content: buildRichText([
        h2('Descripción General'),
        p('GraphAware se especializa en analítica basada en grafos y gestión del conocimiento. Hume, su plataforma insignia, ayuda a las organizaciones a extraer insights de datos complejos e interconectados usando bases de datos de grafos Neo4j. Nos incorporamos como equipo de ingeniería detrás de la suite de analítica.'),
        h2('Contribuciones Clave'),
        h3('Desarrollo de la Suite de Analítica'),
        p('Diseño y desarrollo de soluciones para la suite de analítica de la aplicación web usando Vue.js en el frontend y Neo4j para consultas y visualización de datos de grafos.'),
        h3('Testing End-to-End'),
        p('Desarrollo de tests end-to-end para un editor de grafos web complejo basado en canvas usando Playwright para Java — cubriendo flujos de manipulación interactiva del grafo para asegurar funcionalidad y rendimiento.'),
      ]),
    },
    fr: {
      title: 'Suite Analytique GraphAware',
      description:
        "Mission en tant que Contractor — Senior Software Engineer sur la suite analytique de la plateforme Hume de GraphAware, une application graphe sur Neo4j. J'ai conçu et développé des fonctionnalités en Vue.js sur Neo4j et écrit des tests end-to-end pour un éditeur de graphes basé sur canvas avec Playwright pour Java.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("GraphAware est spécialisée dans l'analytique basée sur les graphes et la gestion des connaissances. Hume, leur plateforme phare, aide les organisations à extraire des insights de données complexes et interconnectées en utilisant les bases de données graphe Neo4j. Nous sommes intervenus comme équipe d'ingénierie sur la suite analytique."),
        h2('Contributions Clés'),
        h3('Développement de la Suite Analytique'),
        p("Conception et développement de solutions pour la suite analytique de l'application web en utilisant Vue.js côté frontend et Neo4j pour l'interrogation et la visualisation de données graphe."),
        h3('Tests End-to-End'),
        p("Développement de tests end-to-end pour un éditeur de graphes web complexe basé sur canvas avec Playwright pour Java — couvrant les flux de manipulation interactive du graphe afin de garantir fonctionnalité et performance."),
      ]),
    },
    ca: {
      title: 'Suite d\'Analítica GraphAware',
      description:
        "Contracte com a Contractor — Senior Software Engineer a la suite d'analítica de la plataforma Hume de GraphAware, una aplicació de grafs sobre Neo4j. Vaig dissenyar i desenvolupar funcionalitats en Vue.js contra Neo4j i vaig escriure tests end-to-end d'un editor de grafs basat en canvas amb Playwright per a Java.",
      content: buildRichText([
        h2('Descripció General'),
        p("GraphAware s'especialitza en analítica basada en grafs i gestió del coneixement. Hume, la seva plataforma insígnia, ajuda les organitzacions a extreure insights de dades complexes i interconnectades usant bases de dades de grafs Neo4j. Ens hi vam incorporar com a equip d'enginyeria darrere de la suite d'analítica."),
        h2('Contribucions Clau'),
        h3("Desenvolupament de la Suite d'Analítica"),
        p("Disseny i desenvolupament de solucions per a la suite d'analítica de l'aplicació web usant Vue.js al frontend i Neo4j per a consultes i visualització de dades de grafs."),
        h3('Testing End-to-End'),
        p("Desenvolupament de tests end-to-end per a un editor de grafs web complex basat en canvas amb Playwright per a Java — cobrint fluxos de manipulació interactiva del graf per assegurar funcionalitat i rendiment."),
      ]),
    },
    gl: {
      title: 'Suite de Analítica GraphAware',
      description:
        'Contrato como Contractor — Senior Software Engineer na suite de analítica da plataforma Hume de GraphAware, unha aplicación de grafos sobre Neo4j. Deseñei e desenvolvín funcionalidades en Vue.js contra Neo4j e escribín tests end-to-end dun editor de grafos baseado en canvas usando Playwright para Java.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('GraphAware especialízase en analítica baseada en grafos e xestión do coñecemento. Hume, a súa plataforma insignia, axuda ás organizacións a extraer insights de datos complexos e interconectados usando bases de datos de grafos Neo4j. Incorporámonos como equipo de enxeñería detrás da suite de analítica.'),
        h2('Contribucións Clave'),
        h3('Desenvolvemento da Suite de Analítica'),
        p('Deseño e desenvolvemento de solucións para a suite de analítica da aplicación web usando Vue.js no frontend e Neo4j para consultas e visualización de datos de grafos.'),
        h3('Testing End-to-End'),
        p('Desenvolvemento de tests end-to-end para un editor de grafos web complexo baseado en canvas usando Playwright para Java — cubrindo fluxos de manipulación interactiva do grafo para asegurar funcionalidade e rendemento.'),
      ]),
    },
    pt: {
      title: 'Suite de Analytics GraphAware',
      description:
        'Contrato como Contractor — Senior Software Engineer na suite de analytics da plataforma Hume da GraphAware, uma aplicação de grafos sobre Neo4j. Desenhei e desenvolvi funcionalidades em Vue.js contra Neo4j e escrevi testes end-to-end de um editor de grafos baseado em canvas usando Playwright para Java.',
      content: buildRichText([
        h2('Visão Geral'),
        p('A GraphAware especializa-se em analytics baseada em grafos e gestão de conhecimento. A Hume, a sua plataforma principal, ajuda as organizações a extrair insights de dados complexos e interligados usando bases de dados de grafos Neo4j. Integrámo-nos como equipa de engenharia por detrás da suite de analytics.'),
        h2('Contribuições Chave'),
        h3('Desenvolvimento da Suite de Analytics'),
        p('Desenho e desenvolvimento de soluções para a suite de analytics da aplicação web usando Vue.js no frontend e Neo4j para consultas e visualização de dados de grafos.'),
        h3('Testes End-to-End'),
        p('Desenvolvimento de testes end-to-end para um editor de grafos web complexo baseado em canvas usando Playwright para Java — cobrindo fluxos de manipulação interativa do grafo para garantir funcionalidade e performance.'),
      ]),
    },
  },
};
