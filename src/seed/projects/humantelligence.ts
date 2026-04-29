import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const humantelligence: ProjectSeedData = {
  title: 'Humantelligence Platform Modernization',
  slug: 'humantelligence-platform-modernization',
  client: 'Humantelligence',
  description:
    'A five-year partnership with Humantelligence across two engagements. From 2018–2020 we shipped the cross-platform React Native app with MS CodePush OTA updates, the EQ-everywhere mailbox browser extensions, and led a long-term Ruby on Rails to React.js migration. Returning in 2023 we set up a PNPM monorepo, migrated Create React App to Vite, and drove a 10x improvement in developer experience and deployment performance.',
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
  status: 'published',
  publishedDate: '2023-10-01T00:00:00.000Z',
  order: 6,
  featuredImageUrl: 'humantelligence.png',
  featuredImageAlt: 'Humantelligence EQ-everywhere Outlook integration',
  content: buildRichText([
    h2('Overview'),
    p(
      'Humantelligence provides people analytics and team collaboration tools used by enterprises worldwide. We partnered with the company across two separate engagements spanning five years — first as Mobile Engineer in Medellín (2018–2020), then returning as a Front-end Engineer in 2023.',
    ),

    h2('Platform Architecture (2023)'),

    h3('Mono-Repo Migration'),
    p(
      'Developed a future-proof architecture using PNPM to set up a mono-repo, segregating different mini-apps from the core platform with integrated linting and formatting tools.',
    ),

    h3('Build System Modernization'),
    ul([
      'Migrated the project from Create React App (CRA) to Vite, maintaining all capabilities including automatic S3 asset uploads',
      'Upgraded React to the latest stable versions and enabled Strict Mode — improving performance and reliability',
      'Improved developer experience (DX) and deployment performance by 10x',
    ]),

    h3('Team Coaching'),
    p(
      'Coached the team into modern React practices, caching with SWR, and profiling techniques.',
    ),

    h2('Mobile & Browser Extensions (2018–2020)'),

    h3('Cross-Platform Mobile App'),
    p(
      'Designed and developed a cross-platform, client-facing mobile application using Sketch, Figma, React Native, and MS CodePush for over-the-air updates.',
    ),

    h3('EQ-everywhere Browser Extensions'),
    p(
      'Designed and developed EQ-everywhere integrations with mailboxes on modern browsers to provide tailored communication and engagement tips, using React.js, content scripts, and an event-driven architecture.',
    ),

    h3('Rails to React Migration'),
    p(
      'Planned and led a long-term migration of a rich UI/UX Ruby on Rails front-end to React.js, enhancing performance and maintainability.',
    ),

    h3('Team Coaching'),
    p(
      'Coached team members on modern web techniques and React.js throughout the engagement.',
    ),
  ]),
  translations: {
    es: {
      title: 'Modernización de la Plataforma Humantelligence',
      description:
        'Trabajé con Humantelligence en dos compromisos separados a lo largo de cinco años. Como Mobile Engineer (2018–2020) entregué la app multiplataforma en React Native con actualizaciones over-the-air vía MS CodePush, las extensiones de navegador EQ-everywhere para buzones de correo y lideré una migración a largo plazo de Ruby on Rails a React.js. Como Front-end Engineer (2023) configuré un mono-repo con PNPM, migré Create React App a Vite y conseguí una mejora de 10x en DX y rendimiento de deployment.',
      content: buildRichText([
        h2('Descripción General'),
        p('Humantelligence proporciona herramientas de analítica de personas y colaboración de equipos utilizadas por empresas en todo el mundo. Colaboramos con la empresa en dos compromisos separados a lo largo de cinco años — primero como Mobile Engineer en Medellín (2018–2020) y regresando como Front-end Engineer en 2023.'),
        h2('Arquitectura de la Plataforma (2023)'),
        h3('Migración a Mono-Repo'),
        p('Desarrollo de una arquitectura preparada para el futuro usando PNPM para configurar un mono-repo, segregando diferentes mini-apps del core de la plataforma con herramientas integradas de linting y formatting.'),
        h3('Modernización del Sistema de Build'),
        ul([
          'Migración del proyecto de Create React App (CRA) a Vite, manteniendo todas las capacidades incluyendo la subida automática de assets a S3',
          'Actualización de React a las últimas versiones estables y activación de Strict Mode — mejorando rendimiento y fiabilidad',
          'Mejora de la experiencia de desarrollo (DX) y el rendimiento de deployment en 10x',
        ]),
        h3('Coaching del Equipo'),
        p('Coaching del equipo en prácticas modernas de React, caching con SWR y técnicas de profiling.'),
        h2('Aplicaciones Móviles y Extensiones de Navegador (2018–2020)'),
        h3('Aplicación Móvil Multiplataforma'),
        p('Diseño y desarrollo de una aplicación móvil multiplataforma orientada al cliente usando Sketch, Figma, React Native y MS CodePush para actualizaciones over-the-air.'),
        h3('Extensiones de Navegador EQ-everywhere'),
        p('Diseño y desarrollo de integraciones EQ-everywhere con buzones de correo en navegadores modernos para ofrecer consejos personalizados de comunicación y engagement, usando React.js, content scripts y una arquitectura basada en eventos.'),
        h3('Migración de Rails a React'),
        p('Planificación y liderazgo de una migración a largo plazo del frontend Ruby on Rails con UX rica hacia React.js, mejorando rendimiento y mantenibilidad.'),
        h3('Coaching del Equipo'),
        p('Coaching a los miembros del equipo en técnicas modernas de desarrollo web y React.js durante toda la colaboración.'),
      ]),
    },
    fr: {
      title: 'Modernisation de la Plateforme Humantelligence',
      description:
        "J'ai travaillé avec Humantelligence sur deux missions séparées étalées sur cinq ans. En tant que Mobile Engineer (2018–2020) j'ai livré l'application multiplateforme en React Native avec mises à jour over-the-air via MS CodePush, les extensions de navigateur EQ-everywhere pour les boîtes mail et mené une migration à long terme de Ruby on Rails vers React.js. En tant que Front-end Engineer (2023) j'ai mis en place un mono-repo avec PNPM, migré Create React App vers Vite et obtenu une amélioration de 10x de la DX et des performances de deployment.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("Humantelligence fournit des outils d'analytique des personnes et de collaboration d'équipe utilisés par des entreprises dans le monde entier. Nous avons collaboré avec l'entreprise sur deux missions distinctes étalées sur cinq ans — d'abord en tant que Mobile Engineer à Medellín (2018–2020), puis en revenant comme Front-end Engineer en 2023."),
        h2('Architecture de la Plateforme (2023)'),
        h3('Migration vers Mono-Repo'),
        p("Développement d'une architecture pérenne avec PNPM pour configurer un mono-repo, séparant les différents mini-apps du core de la plateforme avec des outils intégrés de linting et formatting."),
        h3('Modernisation du Système de Build'),
        ul([
          'Migration du projet de Create React App (CRA) vers Vite, en conservant toutes les capacités y compris le téléversement automatique des assets sur S3',
          'Montée de version de React vers les dernières versions stables et activation du Strict Mode — améliorant performance et fiabilité',
          "Amélioration de l'expérience développeur (DX) et des performances de deployment par 10x",
        ]),
        h3('Coaching de l\'Équipe'),
        p("Coaching de l'équipe sur les pratiques React modernes, le caching avec SWR et les techniques de profiling."),
        h2('Applications Mobiles et Extensions de Navigateur (2018–2020)'),
        h3('Application Mobile Multiplateforme'),
        p("Conception et développement d'une application mobile multiplateforme orientée client avec Sketch, Figma, React Native et MS CodePush pour les mises à jour over-the-air."),
        h3('Extensions de Navigateur EQ-everywhere'),
        p("Conception et développement d'intégrations EQ-everywhere avec les boîtes mail sur les navigateurs modernes pour fournir des conseils de communication et d'engagement personnalisés, en utilisant React.js, des content scripts et une architecture orientée événements."),
        h3('Migration de Rails vers React'),
        p("Planification et direction d'une migration à long terme du frontend Ruby on Rails à l'UX riche vers React.js, améliorant performance et maintenabilité."),
        h3('Coaching de l\'Équipe'),
        p("Coaching des membres de l'équipe sur les techniques modernes de développement web et React.js tout au long de la mission."),
      ]),
    },
    ca: {
      title: 'Modernització de la Plataforma Humantelligence',
      description:
        "Vaig treballar amb Humantelligence en dos encàrrecs separats al llarg de cinc anys. Com a Mobile Engineer (2018–2020) vaig lliurar l'app multiplataforma en React Native amb actualitzacions over-the-air via MS CodePush, les extensions de navegador EQ-everywhere per a bústies de correu i vaig liderar una migració a llarg termini de Ruby on Rails a React.js. Com a Front-end Engineer (2023) vaig configurar un mono-repo amb PNPM, vaig migrar Create React App a Vite i vaig aconseguir una millora de 10x en DX i rendiment de deployment.",
      content: buildRichText([
        h2('Descripció General'),
        p("Humantelligence ofereix eines d'analítica de persones i col·laboració d'equips utilitzades per empreses arreu del món. Vam col·laborar amb l'empresa en dos encàrrecs separats al llarg de cinc anys — primer com a Mobile Engineer a Medellín (2018–2020) i tornant com a Front-end Engineer el 2023."),
        h2('Arquitectura de la Plataforma (2023)'),
        h3('Migració a Mono-Repo'),
        p("Desenvolupament d'una arquitectura preparada per al futur usant PNPM per configurar un mono-repo, segregant diferents mini-apps del core de la plataforma amb eines integrades de linting i formatting."),
        h3('Modernització del Sistema de Build'),
        ul([
          "Migració del projecte de Create React App (CRA) a Vite, mantenint totes les capacitats incloent la pujada automàtica d'assets a S3",
          "Actualització de React a les darreres versions estables i activació de Strict Mode — millorant rendiment i fiabilitat",
          "Millora de l'experiència de desenvolupament (DX) i el rendiment de deployment en 10x",
        ]),
        h3("Coaching de l'Equip"),
        p("Coaching de l'equip en pràctiques modernes de React, caching amb SWR i tècniques de profiling."),
        h2('Aplicacions Mòbils i Extensions de Navegador (2018–2020)'),
        h3('Aplicació Mòbil Multiplataforma'),
        p("Disseny i desenvolupament d'una aplicació mòbil multiplataforma orientada al client amb Sketch, Figma, React Native i MS CodePush per a actualitzacions over-the-air."),
        h3('Extensions de Navegador EQ-everywhere'),
        p("Disseny i desenvolupament d'integracions EQ-everywhere amb bústies de correu en navegadors moderns per oferir consells personalitzats de comunicació i engagement, usant React.js, content scripts i una arquitectura basada en esdeveniments."),
        h3('Migració de Rails a React'),
        p("Planificació i lideratge d'una migració a llarg termini del frontend Ruby on Rails amb UX rica cap a React.js, millorant rendiment i mantenibilitat."),
        h3("Coaching de l'Equip"),
        p("Coaching als membres de l'equip en tècniques modernes de desenvolupament web i React.js durant tota la col·laboració."),
      ]),
    },
    gl: {
      title: 'Modernización da Plataforma Humantelligence',
      description:
        'Traballei con Humantelligence en dous compromisos separados ao longo de cinco anos. Como Mobile Engineer (2018–2020) entreguei a app multiplataforma en React Native con actualizacións over-the-air vía MS CodePush, as extensións de navegador EQ-everywhere para caixas de correo e liderei unha migración a longo prazo de Ruby on Rails a React.js. Como Front-end Engineer (2023) configurei un mono-repo con PNPM, migrei Create React App a Vite e conseguín unha mellora de 10x en DX e rendemento de deployment.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('Humantelligence ofrece ferramentas de analítica de persoas e colaboración de equipos utilizadas por empresas en todo o mundo. Colaboramos coa empresa en dous compromisos separados ao longo de cinco anos — primeiro como Mobile Engineer en Medellín (2018–2020) e regresando como Front-end Engineer en 2023.'),
        h2('Arquitectura da Plataforma (2023)'),
        h3('Migración a Mono-Repo'),
        p('Desenvolvemento dunha arquitectura preparada para o futuro usando PNPM para configurar un mono-repo, segregando diferentes mini-apps do core da plataforma con ferramentas integradas de linting e formatting.'),
        h3('Modernización do Sistema de Build'),
        ul([
          'Migración do proxecto de Create React App (CRA) a Vite, mantendo todas as capacidades incluíndo a suba automática de assets a S3',
          'Actualización de React ás últimas versións estables e activación de Strict Mode — mellorando rendemento e fiabilidade',
          'Mellora da experiencia de desenvolvemento (DX) e o rendemento de deployment en 10x',
        ]),
        h3('Coaching do Equipo'),
        p('Coaching do equipo en prácticas modernas de React, caching con SWR e técnicas de profiling.'),
        h2('Aplicacións Móbiles e Extensións de Navegador (2018–2020)'),
        h3('Aplicación Móbil Multiplataforma'),
        p('Deseño e desenvolvemento dunha aplicación móbil multiplataforma orientada ao cliente usando Sketch, Figma, React Native e MS CodePush para actualizacións over-the-air.'),
        h3('Extensións de Navegador EQ-everywhere'),
        p('Deseño e desenvolvemento de integracións EQ-everywhere con caixas de correo en navegadores modernos para ofrecer consellos personalizados de comunicación e engagement, usando React.js, content scripts e unha arquitectura baseada en eventos.'),
        h3('Migración de Rails a React'),
        p('Planificación e liderado dunha migración a longo prazo do frontend Ruby on Rails con UX rica cara a React.js, mellorando rendemento e mantibilidade.'),
        h3('Coaching do Equipo'),
        p('Coaching aos membros do equipo en técnicas modernas de desenvolvemento web e React.js durante toda a colaboración.'),
      ]),
    },
    pt: {
      title: 'Modernização da Plataforma Humantelligence',
      description:
        'Trabalhei com a Humantelligence em dois compromissos separados ao longo de cinco anos. Como Mobile Engineer (2018–2020) entreguei a app multiplataforma em React Native com atualizações over-the-air via MS CodePush, as extensões de navegador EQ-everywhere para caixas de correio e liderei uma migração a longo prazo de Ruby on Rails para React.js. Como Front-end Engineer (2023) configurei um mono-repo com PNPM, migrei Create React App para Vite e obtive uma melhoria de 10x em DX e performance de deployment.',
      content: buildRichText([
        h2('Visão Geral'),
        p('A Humantelligence oferece ferramentas de analytics de pessoas e colaboração de equipas utilizadas por empresas em todo o mundo. Colaborámos com a empresa em dois compromissos separados ao longo de cinco anos — primeiro como Mobile Engineer em Medellín (2018–2020) e regressando como Front-end Engineer em 2023.'),
        h2('Arquitetura da Plataforma (2023)'),
        h3('Migração para Mono-Repo'),
        p('Desenvolvimento de uma arquitetura preparada para o futuro usando PNPM para configurar um mono-repo, segregando diferentes mini-apps do core da plataforma com ferramentas integradas de linting e formatting.'),
        h3('Modernização do Sistema de Build'),
        ul([
          'Migração do projeto de Create React App (CRA) para Vite, mantendo todas as capacidades incluindo o upload automático de assets para S3',
          'Atualização de React para as últimas versões estáveis e ativação de Strict Mode — melhorando performance e fiabilidade',
          'Melhoria da experiência de desenvolvimento (DX) e da performance de deployment em 10x',
        ]),
        h3('Coaching da Equipa'),
        p('Coaching da equipa em práticas modernas de React, caching com SWR e técnicas de profiling.'),
        h2('Aplicações Móveis e Extensões de Navegador (2018–2020)'),
        h3('Aplicação Móvel Multiplataforma'),
        p('Desenho e desenvolvimento de uma aplicação móvel multiplataforma orientada ao cliente usando Sketch, Figma, React Native e MS CodePush para atualizações over-the-air.'),
        h3('Extensões de Navegador EQ-everywhere'),
        p('Desenho e desenvolvimento de integrações EQ-everywhere com caixas de correio em navegadores modernos para fornecer dicas personalizadas de comunicação e engagement, usando React.js, content scripts e uma arquitetura orientada a eventos.'),
        h3('Migração de Rails para React'),
        p('Planeamento e liderança de uma migração a longo prazo do frontend Ruby on Rails com UX rica para React.js, melhorando performance e manutibilidade.'),
        h3('Coaching da Equipa'),
        p('Coaching aos membros da equipa em técnicas modernas de desenvolvimento web e React.js durante toda a colaboração.'),
      ]),
    },
  },
};
