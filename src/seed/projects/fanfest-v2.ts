import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const fanfestV2: ProjectSeedData = {
  title: 'FanFest 2.0 Platform',
  slug: 'fanfest-v2-platform',
  client: 'FanFest',
  description:
    'Developed and deployed version 2.0 of the FanFest platform for real-time events across partners including PSG, Manchester City, and The 49ers. Architected crypto wallet integrations and screen-sharing capabilities for live shows.',
  industries: ['Sports & Entertainment', 'Streaming & Media'],
  technologies: [
    'Vue.js',
    'Vue.js 3',
    'Vuetify',
    'TailwindCSS',
    'Socket.IO',
    'PhenixRTS',
    'Docker',
    'GCP App Engine',
    'AWS Chime SDK',
  ],
  status: 'published',
  publishedDate: '2022-12-01T00:00:00.000Z',
  order: 2,
  featuredImageUrl: null,
  featuredImageAlt: 'FanFest 2.0 real-time event platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Version 2.0 of the FanFest platform brought real-time event capabilities to fans across all partner organizations, from major football clubs to NFL franchises.',
    ),

    h2('Key Contributions'),

    h3('Platform Development & Deployment'),
    p(
      'Developed and deployed the platform for real-time events utilizing Vue.js, PhenixRTS for low-latency streaming, and Socket.IO for real-time bidirectional communication.',
    ),

    h3('Crypto Wallet Integrations'),
    p(
      'Architected and developed integrations with crypto wallets in collaboration with the CEO, enabling token-gated fan experiences with partners like PSG, Manchester City, and The 49ers.',
    ),

    h3('Screen-Sharing for Producers'),
    p(
      'Researched and developed screen-sharing capabilities for producers during live shows, integrating streams into simulcasts using Docker and GCP App Engine.',
    ),

    h3('Platform Modernization'),
    ul([
      'Migrated the project to Vue.js 3, Vuetify 3, and TailwindCSS',
      'Enabled new composable patterns to enhance development experience',
      'Integrated AWS Chime SDK to improve real-time experience and reduce latency',
      'Triaged issues using LogRocket, GCP Cloud Logging, and New Relic',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma FanFest 2.0',
      description:
        'Plataforma de eventos en tiempo real que lleva experiencias interactivas de fans a organizaciones deportivas asociadas, desde grandes clubes de fútbol hasta franquicias de la NFL.',
      content: buildRichText([
        h2('Descripción General'),
        p('La versión 2.0 de la plataforma FanFest trajo capacidades de eventos en tiempo real a los fans de todas las organizaciones asociadas, desde grandes clubes de fútbol hasta franquicias de la NFL.'),
        h2('Contribuciones Clave'),
        h3('Desarrollo y Despliegue de la Plataforma'),
        p('Desarrollo y despliegue de la plataforma para eventos en tiempo real utilizando Vue.js, PhenixRTS para streaming de baja latencia y Socket.IO para comunicación bidireccional en tiempo real.'),
        h3('Integraciones de Wallets Crypto'),
        p('Arquitectura y desarrollo de integraciones con wallets crypto en colaboración con el CEO, habilitando experiencias para fans con acceso por tokens con socios como PSG, Manchester City y The 49ers.'),
        h3('Compartición de Pantalla para Productores'),
        p('Investigación y desarrollo de capacidades de compartición de pantalla para productores durante shows en directo, integrando los streams en simulcasts usando Docker y GCP App Engine.'),
        h3('Modernización de la Plataforma'),
        ul([
          'Migración del proyecto a Vue.js 3, Vuetify 3 y TailwindCSS',
          'Habilitación de nuevos patrones composable para mejorar la experiencia de desarrollo',
          'Integración de AWS Chime SDK para mejorar la experiencia en tiempo real y reducir la latencia',
          'Triaje de incidencias usando LogRocket, GCP Cloud Logging y New Relic',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme FanFest 2.0',
      description:
        "Plateforme d'événements en temps réel apportant des expériences interactives aux fans à travers toutes les organisations sportives partenaires, des grands clubs de football aux franchises NFL.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("La version 2.0 de la plateforme FanFest a apporté des capacités d'événements en temps réel aux fans de toutes les organisations partenaires, des grands clubs de football aux franchises NFL."),
        h2('Contributions Clés'),
        h3('Développement et Déploiement de la Plateforme'),
        p("Développement et déploiement de la plateforme pour des événements en temps réel utilisant Vue.js, PhenixRTS pour le streaming à faible latence et Socket.IO pour la communication bidirectionnelle en temps réel."),
        h3('Intégrations de Portefeuilles Crypto'),
        p("Architecture et développement d'intégrations avec des portefeuilles crypto en collaboration avec le CEO, permettant des expériences fans avec accès par tokens avec des partenaires comme le PSG, Manchester City et les 49ers."),
        h3('Partage d\'Écran pour les Producteurs'),
        p("Recherche et développement de capacités de partage d'écran pour les producteurs pendant les shows en direct, intégrant les flux dans des diffusions simultanées en utilisant Docker et GCP App Engine."),
        h3('Modernisation de la Plateforme'),
        ul([
          'Migration du projet vers Vue.js 3, Vuetify 3 et TailwindCSS',
          "Activation de nouveaux patterns composables pour améliorer l'expérience de développement",
          "Intégration d'AWS Chime SDK pour améliorer l'expérience en temps réel et réduire la latence",
          "Triage des problèmes avec LogRocket, GCP Cloud Logging et New Relic",
        ]),
      ]),
    },
    ca: {
      title: 'Plataforma FanFest 2.0',
      description:
        "Plataforma d'esdeveniments en temps real que porta experiències interactives de fans a organitzacions esportives associades, des de grans clubs de futbol fins a franquícies de la NFL.",
      content: buildRichText([
        h2('Descripció General'),
        p("La versió 2.0 de la plataforma FanFest va portar capacitats d'esdeveniments en temps real als fans de totes les organitzacions associades, des de grans clubs de futbol fins a franquícies de la NFL."),
        h2('Contribucions Clau'),
        h3('Desenvolupament i Desplegament de la Plataforma'),
        p("Desenvolupament i desplegament de la plataforma per a esdeveniments en temps real utilitzant Vue.js, PhenixRTS per a streaming de baixa latència i Socket.IO per a comunicació bidireccional en temps real."),
        h3('Integracions de Wallets Crypto'),
        p("Arquitectura i desenvolupament d'integracions amb wallets crypto en col·laboració amb el CEO, habilitant experiències per a fans amb accés per tokens amb socis com el PSG, Manchester City i The 49ers."),
        h3('Compartició de Pantalla per a Productors'),
        p("Investigació i desenvolupament de capacitats de compartició de pantalla per a productors durant shows en directe, integrant els streams en simulcasts usant Docker i GCP App Engine."),
        h3('Modernització de la Plataforma'),
        ul([
          'Migració del projecte a Vue.js 3, Vuetify 3 i TailwindCSS',
          "Habilitació de nous patrons composable per millorar l'experiència de desenvolupament",
          "Integració d'AWS Chime SDK per millorar l'experiència en temps real i reduir la latència",
          "Triatge d'incidències usant LogRocket, GCP Cloud Logging i New Relic",
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma FanFest 2.0',
      description:
        'Plataforma de eventos en tempo real que leva experiencias interactivas de fans a organizacións deportivas asociadas, desde grandes clubs de fútbol ata franquías da NFL.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('A versión 2.0 da plataforma FanFest trouxo capacidades de eventos en tempo real aos fans de todas as organizacións asociadas, desde grandes clubs de fútbol ata franquías da NFL.'),
        h2('Contribucións Clave'),
        h3('Desenvolvemento e Despregamento da Plataforma'),
        p('Desenvolvemento e despregamento da plataforma para eventos en tempo real utilizando Vue.js, PhenixRTS para streaming de baixa latencia e Socket.IO para comunicación bidireccional en tempo real.'),
        h3('Integracións de Wallets Crypto'),
        p('Arquitectura e desenvolvemento de integracións con wallets crypto en colaboración co CEO, habilitando experiencias para fans con acceso por tokens con socios como o PSG, Manchester City e The 49ers.'),
        h3('Compartición de Pantalla para Produtores'),
        p('Investigación e desenvolvemento de capacidades de compartición de pantalla para produtores durante shows en directo, integrando os streams en simulcasts usando Docker e GCP App Engine.'),
        h3('Modernización da Plataforma'),
        ul([
          'Migración do proxecto a Vue.js 3, Vuetify 3 e TailwindCSS',
          'Habilitación de novos patróns composable para mellorar a experiencia de desenvolvemento',
          'Integración de AWS Chime SDK para mellorar a experiencia en tempo real e reducir a latencia',
          'Triaxe de incidencias usando LogRocket, GCP Cloud Logging e New Relic',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma FanFest 2.0',
      description:
        'Plataforma de eventos em tempo real que traz experiências interativas de fãs a organizações desportivas parceiras, desde grandes clubes de futebol até franquias da NFL.',
      content: buildRichText([
        h2('Visão Geral'),
        p('A versão 2.0 da plataforma FanFest trouxe capacidades de eventos em tempo real aos fãs de todas as organizações parceiras, desde grandes clubes de futebol até franquias da NFL.'),
        h2('Contribuições Chave'),
        h3('Desenvolvimento e Deploy da Plataforma'),
        p('Desenvolvimento e deploy da plataforma para eventos em tempo real utilizando Vue.js, PhenixRTS para streaming de baixa latência e Socket.IO para comunicação bidirecional em tempo real.'),
        h3('Integrações de Wallets Crypto'),
        p('Arquitetura e desenvolvimento de integrações com wallets crypto em colaboração com o CEO, habilitando experiências para fãs com acesso por tokens com parceiros como o PSG, Manchester City e os 49ers.'),
        h3('Partilha de Ecrã para Produtores'),
        p('Investigação e desenvolvimento de capacidades de partilha de ecrã para produtores durante shows ao vivo, integrando os streams em simulcasts usando Docker e GCP App Engine.'),
        h3('Modernização da Plataforma'),
        ul([
          'Migração do projeto para Vue.js 3, Vuetify 3 e TailwindCSS',
          'Habilitação de novos padrões composable para melhorar a experiência de desenvolvimento',
          'Integração do AWS Chime SDK para melhorar a experiência em tempo real e reduzir a latência',
          'Triagem de problemas usando LogRocket, GCP Cloud Logging e New Relic',
        ]),
      ]),
    },
  },
};
