import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const messynger: ProjectSeedData = {
  title: 'Messynger Social Support Platform',
  slug: 'messynger',
  client: 'Synphonyte',
  description:
    'Led Messynger, a multi-channel social media aggregation platform that lets customer support teams reach users across WhatsApp, Messenger, Slack, and MS Teams from a single workspace. As Lead Software Engineer, Rowin managed a team of three remote, cross-functional developers and shipped integrations on a Kubernetes-based infrastructure backed by IBM Cloud, IBM Cloudant, and IBM Functions.',
  industries: ['SaaS'],
  technologies: [
    'Vue.js',
    'Docker',
    'Kubernetes',
    'IBM Cloud',
    'IBM Cloudant',
    'IBM Functions',
    'Strapi',
    'Heroku',
  ],
  status: 'published',
  publishedDate: '2022-01-01T00:00:00.000Z',
  order: 5,
  featuredImageUrl: 'messynger.png',
  featuredImageAlt: 'Messynger — multi-channel social media support aggregation platform',
  content: buildRichText([
    h2('Overview'),
    p(
      "Messynger is a social media aggregation platform built at Synphonyte to help customer support teams reach users where they already are — WhatsApp, Messenger, Slack, and MS Teams — from a single workspace. As Lead Software Engineer, Rowin drove the project end-to-end, from integration work with each messaging platform to the Kubernetes infrastructure it runs on.",
    ),

    h2('Platform & Integrations'),

    h3('Multi-Channel Messaging'),
    p(
      'Developed integrations with WhatsApp, Messenger, Slack, and MS Teams so support teams could unify conversations across channels and improve customer outreach without context-switching between apps.',
    ),

    h3('Stack'),
    ul([
      'Strapi as the headless CMS and content backbone for operators',
      'Heroku for application hosting and managed add-ons',
      'IBM Cloud, IBM Cloudant, and IBM Functions for serverless integration logic and persistence',
    ]),

    h2('Infrastructure'),

    h3('Kubernetes Deployment'),
    p(
      'Deployed Kubernetes systems to run the integration services reliably at scale, giving the team predictable rollouts, horizontal scaling per channel, and a consistent operational model across environments.',
    ),

    h2('Team Leadership'),

    h3('Remote, Cross-Functional Delivery'),
    p(
      'Managed a team of three remote, cross-functional developers using Agile methodologies and Kanban for project planning, stakeholder collaboration, and code reviews — keeping delivery cadence steady across time zones.',
    ),
  ]),
  translations: {
    es: {
      title: 'Messynger — Plataforma de Soporte Social',
      description:
        'Lideré Messynger, una plataforma de agregación de redes sociales multi-canal que permite a los equipos de soporte atender a los usuarios en WhatsApp, Messenger, Slack y MS Teams desde un único espacio de trabajo. Como Ingeniero de Software Principal, gestioné un equipo de tres desarrolladores remotos y multifuncionales y entregué las integraciones sobre una infraestructura basada en Kubernetes con IBM Cloud, IBM Cloudant e IBM Functions.',
      content: buildRichText([
        h2('Descripción General'),
        p('Messynger es una plataforma de agregación de redes sociales construida en Synphonyte para ayudar a los equipos de soporte a atender a los usuarios donde ya están — WhatsApp, Messenger, Slack y MS Teams — desde un único espacio de trabajo. Como Ingeniero de Software Principal, Rowin llevó el proyecto de principio a fin, desde las integraciones con cada plataforma de mensajería hasta la infraestructura Kubernetes sobre la que se ejecuta.'),
        h2('Plataforma e Integraciones'),
        h3('Mensajería Multi-Canal'),
        p('Desarrollo de integraciones con WhatsApp, Messenger, Slack y MS Teams para que los equipos de soporte unifiquen las conversaciones entre canales y mejoren el outreach a clientes sin cambiar de aplicación.'),
        h3('Stack'),
        ul([
          'Strapi como CMS headless y columna vertebral de contenido para operadores',
          'Heroku para el hosting de la aplicación y add-ons gestionados',
          'IBM Cloud, IBM Cloudant e IBM Functions para lógica de integración serverless y persistencia',
        ]),
        h2('Infraestructura'),
        h3('Despliegue en Kubernetes'),
        p('Despliegue de sistemas Kubernetes para ejecutar los servicios de integración de forma fiable a escala, con rollouts predecibles, escalado horizontal por canal y un modelo operativo consistente entre entornos.'),
        h2('Liderazgo de Equipo'),
        h3('Entrega Remota y Multifuncional'),
        p('Gestión de un equipo de tres desarrolladores remotos y multifuncionales usando metodologías Agile y Kanban para planificación, colaboración con stakeholders y code reviews — manteniendo una cadencia de entrega estable entre zonas horarias.'),
      ]),
    },
    fr: {
      title: 'Messynger — Plateforme de Support Social',
      description:
        "J'ai dirigé Messynger, une plateforme d'agrégation de réseaux sociaux multi-canal qui permet aux équipes de support client de joindre les utilisateurs sur WhatsApp, Messenger, Slack et MS Teams depuis un espace de travail unique. En tant qu'Ingénieur Logiciel Principal, j'ai géré une équipe de trois développeurs distants et pluridisciplinaires et livré les intégrations sur une infrastructure basée sur Kubernetes avec IBM Cloud, IBM Cloudant et IBM Functions.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("Messynger est une plateforme d'agrégation de réseaux sociaux construite chez Synphonyte pour aider les équipes de support à joindre les utilisateurs là où ils sont déjà — WhatsApp, Messenger, Slack et MS Teams — depuis un espace de travail unique. En tant qu'Ingénieur Logiciel Principal, Rowin a mené le projet de bout en bout, des intégrations avec chaque plateforme de messagerie jusqu'à l'infrastructure Kubernetes sur laquelle il tourne."),
        h2('Plateforme et Intégrations'),
        h3('Messagerie Multi-Canal'),
        p("Développement d'intégrations avec WhatsApp, Messenger, Slack et MS Teams pour permettre aux équipes de support d'unifier les conversations entre canaux et d'améliorer l'outreach client sans changer d'application."),
        h3('Stack'),
        ul([
          'Strapi comme CMS headless et colonne vertébrale de contenu pour les opérateurs',
          'Heroku pour le hosting de l\'application et les add-ons gérés',
          'IBM Cloud, IBM Cloudant et IBM Functions pour la logique d\'intégration serverless et la persistance',
        ]),
        h2('Infrastructure'),
        h3('Déploiement sur Kubernetes'),
        p("Déploiement de systèmes Kubernetes pour exécuter les services d'intégration de façon fiable à l'échelle, avec des rollouts prévisibles, un scaling horizontal par canal et un modèle opérationnel cohérent entre les environnements."),
        h2('Leadership d\'Équipe'),
        h3('Livraison à Distance et Pluridisciplinaire'),
        p("Gestion d'une équipe de trois développeurs distants et pluridisciplinaires avec des méthodologies Agile et Kanban pour la planification, la collaboration avec les parties prenantes et les code reviews — maintenant une cadence de livraison stable entre les fuseaux horaires."),
      ]),
    },
    ca: {
      title: 'Messynger — Plataforma de Suport Social',
      description:
        "Vaig liderar Messynger, una plataforma d'agregació de xarxes socials multi-canal que permet als equips de suport atendre els usuaris a WhatsApp, Messenger, Slack i MS Teams des d'un únic espai de treball. Com a Enginyer de Software Principal, vaig gestionar un equip de tres desenvolupadors remots i multifuncionals i vaig entregar les integracions sobre una infraestructura basada en Kubernetes amb IBM Cloud, IBM Cloudant i IBM Functions.",
      content: buildRichText([
        h2('Descripció General'),
        p("Messynger és una plataforma d'agregació de xarxes socials construïda a Synphonyte per ajudar els equips de suport a atendre els usuaris on ja són — WhatsApp, Messenger, Slack i MS Teams — des d'un únic espai de treball. Com a Enginyer de Software Principal, Rowin va portar el projecte de principi a fi, des de les integracions amb cada plataforma de missatgeria fins a la infraestructura Kubernetes sobre la qual s'executa."),
        h2('Plataforma i Integracions'),
        h3('Missatgeria Multi-Canal'),
        p("Desenvolupament d'integracions amb WhatsApp, Messenger, Slack i MS Teams perquè els equips de suport unifiquin les converses entre canals i millorin l'outreach a clients sense canviar d'aplicació."),
        h3('Stack'),
        ul([
          'Strapi com a CMS headless i columna vertebral de contingut per als operadors',
          'Heroku per al hosting de l\'aplicació i add-ons gestionats',
          'IBM Cloud, IBM Cloudant i IBM Functions per a lògica d\'integració serverless i persistència',
        ]),
        h2('Infraestructura'),
        h3('Desplegament a Kubernetes'),
        p("Desplegament de sistemes Kubernetes per executar els serveis d'integració de manera fiable a escala, amb rollouts predictibles, escalat horitzontal per canal i un model operatiu consistent entre entorns."),
        h2("Lideratge d'Equip"),
        h3('Lliurament Remot i Multifuncional'),
        p("Gestió d'un equip de tres desenvolupadors remots i multifuncionals usant metodologies Agile i Kanban per a planificació, col·laboració amb stakeholders i code reviews — mantenint una cadència de lliurament estable entre zones horàries."),
      ]),
    },
    gl: {
      title: 'Messynger — Plataforma de Soporte Social',
      description:
        'Liderei Messynger, unha plataforma de agregación de redes sociais multi-canle que permite aos equipos de soporte atender os usuarios en WhatsApp, Messenger, Slack e MS Teams dende un único espazo de traballo. Como Enxeñeiro de Software Principal, xestionei un equipo de tres desenvolvedores remotos e multifuncionais e entreguei as integracións sobre unha infraestrutura baseada en Kubernetes con IBM Cloud, IBM Cloudant e IBM Functions.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('Messynger é unha plataforma de agregación de redes sociais construída en Synphonyte para axudar aos equipos de soporte a atender os usuarios onde xa están — WhatsApp, Messenger, Slack e MS Teams — dende un único espazo de traballo. Como Enxeñeiro de Software Principal, Rowin levou o proxecto de principio a fin, dende as integracións con cada plataforma de mensaxería ata a infraestrutura Kubernetes sobre a que se executa.'),
        h2('Plataforma e Integracións'),
        h3('Mensaxería Multi-Canle'),
        p('Desenvolvemento de integracións con WhatsApp, Messenger, Slack e MS Teams para que os equipos de soporte unifiquen as conversas entre canles e melloren o outreach a clientes sen cambiar de aplicación.'),
        h3('Stack'),
        ul([
          'Strapi como CMS headless e columna vertebral de contido para os operadores',
          'Heroku para o hosting da aplicación e add-ons xestionados',
          'IBM Cloud, IBM Cloudant e IBM Functions para lóxica de integración serverless e persistencia',
        ]),
        h2('Infraestrutura'),
        h3('Despregamento en Kubernetes'),
        p('Despregamento de sistemas Kubernetes para executar os servizos de integración de xeito fiable a escala, con rollouts predicibles, escalado horizontal por canle e un modelo operativo consistente entre ambientes.'),
        h2('Liderado de Equipo'),
        h3('Entrega Remota e Multifuncional'),
        p('Xestión dun equipo de tres desenvolvedores remotos e multifuncionais usando metodoloxías Agile e Kanban para planificación, colaboración con stakeholders e code reviews — mantendo unha cadencia de entrega estable entre zonas horarias.'),
      ]),
    },
    pt: {
      title: 'Messynger — Plataforma de Suporte Social',
      description:
        'Liderei o Messynger, uma plataforma de agregação de redes sociais multi-canal que permite às equipas de suporte atender os utilizadores em WhatsApp, Messenger, Slack e MS Teams a partir de um único espaço de trabalho. Como Engenheiro de Software Principal, geri uma equipa de três programadores remotos e multifuncionais e entreguei as integrações sobre uma infraestrutura baseada em Kubernetes com IBM Cloud, IBM Cloudant e IBM Functions.',
      content: buildRichText([
        h2('Visão Geral'),
        p('O Messynger é uma plataforma de agregação de redes sociais construída na Synphonyte para ajudar as equipas de suporte a atender os utilizadores onde já estão — WhatsApp, Messenger, Slack e MS Teams — a partir de um único espaço de trabalho. Como Engenheiro de Software Principal, Rowin levou o projeto de ponta a ponta, desde as integrações com cada plataforma de mensagens até à infraestrutura Kubernetes em que corre.'),
        h2('Plataforma e Integrações'),
        h3('Mensagens Multi-Canal'),
        p('Desenvolvimento de integrações com WhatsApp, Messenger, Slack e MS Teams para que as equipas de suporte unifiquem as conversas entre canais e melhorem o outreach a clientes sem mudar de aplicação.'),
        h3('Stack'),
        ul([
          'Strapi como CMS headless e espinha dorsal de conteúdo para operadores',
          'Heroku para o hosting da aplicação e add-ons geridos',
          'IBM Cloud, IBM Cloudant e IBM Functions para lógica de integração serverless e persistência',
        ]),
        h2('Infraestrutura'),
        h3('Deployment em Kubernetes'),
        p('Deployment de sistemas Kubernetes para correr os serviços de integração de forma fiável à escala, com rollouts previsíveis, escalabilidade horizontal por canal e um modelo operacional consistente entre ambientes.'),
        h2('Liderança de Equipa'),
        h3('Entrega Remota e Multifuncional'),
        p('Gestão de uma equipa de três programadores remotos e multifuncionais usando metodologias Agile e Kanban para planeamento, colaboração com stakeholders e code reviews — mantendo uma cadência de entrega estável entre fusos horários.'),
      ]),
    },
  },
};
