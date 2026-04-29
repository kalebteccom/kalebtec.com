import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const synphonyteDental: ProjectSeedData = {
  title: '3D Dental Imaging Software',
  slug: '3d-dental-imaging-software',
  client: 'Synphonyte',
  description:
    'Led engineering across three parallel tracks at Synphonyte over nearly four years: 3D dental imaging with custom nerve-canal geometry in Vue.js and THREE.js, the Soku mobile puzzle game, and internal tooling. Shipped a visual regression testing pipeline on Puppeteer, AVA.js, AWS CodeBuild and GitLab CI for automated QA.',
  industries: ['Healthcare & MedTech'],
  technologies: [
    'Vue.js',
    'THREE.js',
    'Puppeteer',
    'AVA.js',
    'AWS CodeBuild',
    'AWS Lambda',
    'GitLab CI',
  ],
  status: 'published',
  publishedDate: '2023-06-01T00:00:00.000Z',
  order: 4,
  featuredImageUrl: 'synphonyte-dental.png',
  featuredImageAlt: 'Voxel — Synphonyte 3D dental imaging software with custom nerve-canal geometry',
  content: buildRichText([
    h2('Overview'),
    p(
      'Synphonyte develops dental technology software and related products. As Lead Software Engineer over nearly four years, Rowin led engineering across three parallel tracks: 3D dental imaging, the Soku mobile puzzle game, and internal tooling.',
    ),

    h2('3D Dental Imaging'),

    h3('Visual Regression Testing'),
    p(
      'Built visual regression tests for complex 3D dental imaging software using Puppeteer and AVA.js, integrated with AWS CodeBuild, Lambda Functions, and GitLab CI to catch rendering regressions automatically on every commit.',
    ),

    h3('Custom Nerve-Canal Geometry'),
    p(
      "Designed and implemented custom nerve-canal geometry alongside graphics experts using Vue.js, THREE.js, and a custom rendering pipeline — helping radiologists prepare more accurately for dental implant procedures.",
    ),

    h2('Soku Mobile Puzzle Game'),

    h3('Cross-Functional Team Leadership'),
    p(
      'Managed a team of seven — game story writers, developers, and key stakeholders — for the Soku mobile puzzle game. Ran weekly meetings and bi-annual performance reviews, and coached team members on modern web techniques during weekly sessions.',
    ),

    h2('Internal Developer Tools'),

    h3('Integrations for Delivery Velocity'),
    p(
      'Created and deployed internal tools to accelerate development processes through integrations with Harvest time tracking and Infinity boards.',
    ),
  ]),
  translations: {
    es: {
      title: 'Software de Imagen Dental 3D',
      description:
        'Lideré la ingeniería en tres líneas paralelas en Synphonyte durante casi cuatro años: imagen dental 3D con geometría personalizada de canal nervioso en Vue.js y THREE.js, el juego móvil de puzzle Soku y herramientas internas. Implementé un pipeline de visual regression testing con Puppeteer, AVA.js, AWS CodeBuild y GitLab CI para QA automatizado.',
      content: buildRichText([
        h2('Descripción General'),
        p('Synphonyte desarrolla software de tecnología dental y productos relacionados. Como Ingeniero de Software Principal durante casi cuatro años, Rowin lideró la ingeniería en tres líneas paralelas: imagen dental 3D, el juego móvil de puzzle Soku y herramientas internas.'),
        h2('Imagen Dental 3D'),
        h3('Visual Regression Testing'),
        p('Desarrollo de tests de visual regression para software complejo de imagen dental 3D con Puppeteer y AVA.js, integrados con AWS CodeBuild, Lambda Functions y GitLab CI para detectar regresiones de renderizado automáticamente en cada commit.'),
        h3('Geometría Personalizada de Canal Nervioso'),
        p('Diseño e implementación de geometría personalizada de canal nervioso junto a expertos en gráficos usando Vue.js, THREE.js y un pipeline de renderizado propio — ayudando a los radiólogos a preparar procedimientos de implantes dentales con mayor precisión.'),
        h2('Juego Móvil de Puzzle Soku'),
        h3('Liderazgo de Equipo Multidisciplinar'),
        p('Gestión de un equipo de siete personas — guionistas de juego, desarrolladores y stakeholders clave — para el juego móvil de puzzle Soku. Reuniones semanales, revisiones de desempeño semestrales y coaching semanal sobre técnicas modernas de desarrollo web.'),
        h2('Herramientas Internas para Desarrolladores'),
        h3('Integraciones para Velocidad de Entrega'),
        p('Creación y despliegue de herramientas internas para acelerar los procesos de desarrollo mediante integraciones con Harvest para time tracking e Infinity boards.'),
      ]),
    },
    fr: {
      title: 'Logiciel d\'Imagerie Dentaire 3D',
      description:
        "J'ai dirigé l'ingénierie sur trois axes parallèles chez Synphonyte pendant près de quatre ans : imagerie dentaire 3D avec géométrie personnalisée des canaux nerveux en Vue.js et THREE.js, jeu mobile de puzzle Soku et outils internes. J'ai mis en place un pipeline de visual regression testing avec Puppeteer, AVA.js, AWS CodeBuild et GitLab CI pour une QA automatisée.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("Synphonyte développe des logiciels de technologie dentaire et des produits associés. En tant qu'Ingénieur Logiciel Principal pendant près de quatre ans, Rowin a dirigé l'ingénierie sur trois axes parallèles : imagerie dentaire 3D, jeu mobile de puzzle Soku et outils internes."),
        h2('Imagerie Dentaire 3D'),
        h3('Visual Regression Testing'),
        p("Développement de tests de visual regression pour un logiciel complexe d'imagerie dentaire 3D avec Puppeteer et AVA.js, intégrés à AWS CodeBuild, Lambda Functions et GitLab CI — détection automatique des régressions de rendu à chaque commit."),
        h3('Géométrie Personnalisée des Canaux Nerveux'),
        p("Conception et implémentation d'une géométrie personnalisée des canaux nerveux aux côtés d'experts en graphisme avec Vue.js, THREE.js et un pipeline de rendu sur mesure — aidant les radiologues à préparer plus précisément les procédures d'implants dentaires."),
        h2('Jeu Mobile de Puzzle Soku'),
        h3('Leadership d\'Équipe Pluridisciplinaire'),
        p("Gestion d'une équipe de sept personnes — scénaristes de jeu, développeurs et parties prenantes clés — pour le jeu mobile de puzzle Soku. Réunions hebdomadaires, évaluations semestrielles et coaching hebdomadaire sur les techniques modernes de développement web."),
        h2('Outils Internes pour Développeurs'),
        h3('Intégrations pour la Vélocité de Livraison'),
        p("Création et déploiement d'outils internes pour accélérer les processus de développement via des intégrations avec Harvest pour le time tracking et Infinity boards."),
      ]),
    },
    ca: {
      title: 'Software d\'Imatge Dental 3D',
      description:
        "Vaig liderar l'enginyeria en tres línies paral·leles a Synphonyte durant gairebé quatre anys: imatge dental 3D amb geometria personalitzada del canal nerviós en Vue.js i THREE.js, el joc mòbil de puzzle Soku i eines internes. Vaig implementar un pipeline de visual regression testing amb Puppeteer, AVA.js, AWS CodeBuild i GitLab CI per a QA automatitzat.",
      content: buildRichText([
        h2('Descripció General'),
        p("Synphonyte desenvolupa software de tecnologia dental i productes relacionats. Com a Enginyer de Software Principal durant gairebé quatre anys, Rowin va liderar l'enginyeria en tres línies paral·leles: imatge dental 3D, el joc mòbil de puzzle Soku i eines internes."),
        h2('Imatge Dental 3D'),
        h3('Visual Regression Testing'),
        p("Desenvolupament de tests de visual regression per a software complex d'imatge dental 3D amb Puppeteer i AVA.js, integrats amb AWS CodeBuild, Lambda Functions i GitLab CI per detectar regressions de renderitzat automàticament a cada commit."),
        h3('Geometria Personalitzada del Canal Nerviós'),
        p("Disseny i implementació de geometria personalitzada del canal nerviós al costat d'experts en gràfics amb Vue.js, THREE.js i un pipeline de renderitzat propi — ajudant els radiòlegs a preparar amb més precisió els procediments d'implants dentals."),
        h2('Joc Mòbil de Puzzle Soku'),
        h3("Lideratge d'Equip Multidisciplinari"),
        p("Gestió d'un equip de set persones — guionistes de joc, desenvolupadors i stakeholders clau — per al joc mòbil de puzzle Soku. Reunions setmanals, revisions de desempenyament semestrals i coaching setmanal sobre tècniques modernes de desenvolupament web."),
        h2('Eines Internes per a Desenvolupadors'),
        h3('Integracions per a la Velocitat de Lliurament'),
        p("Creació i desplegament d'eines internes per accelerar els processos de desenvolupament mitjançant integracions amb Harvest per al time tracking i Infinity boards."),
      ]),
    },
    gl: {
      title: 'Software de Imaxe Dental 3D',
      description:
        'Liderei a enxeñaría en tres liñas paralelas en Synphonyte durante case catro anos: imaxe dental 3D con xeometría personalizada do canal nervioso en Vue.js e THREE.js, o xogo móbil de puzzle Soku e ferramentas internas. Implementei un pipeline de visual regression testing con Puppeteer, AVA.js, AWS CodeBuild e GitLab CI para QA automatizado.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('Synphonyte desenvolve software de tecnoloxía dental e produtos relacionados. Como Enxeñeiro de Software Principal durante case catro anos, Rowin liderou a enxeñaría en tres liñas paralelas: imaxe dental 3D, o xogo móbil de puzzle Soku e ferramentas internas.'),
        h2('Imaxe Dental 3D'),
        h3('Visual Regression Testing'),
        p('Desenvolvemento de tests de visual regression para software complexo de imaxe dental 3D con Puppeteer e AVA.js, integrados con AWS CodeBuild, Lambda Functions e GitLab CI para detectar regresións de renderizado automaticamente en cada commit.'),
        h3('Xeometría Personalizada do Canal Nervioso'),
        p('Deseño e implementación de xeometría personalizada do canal nervioso xunto a expertos en gráficos usando Vue.js, THREE.js e un pipeline de renderizado propio — axudando aos radiólogos a preparar procedementos de implantes dentais con maior precisión.'),
        h2('Xogo Móbil de Puzzle Soku'),
        h3('Liderado de Equipo Multidisciplinar'),
        p('Xestión dun equipo de sete persoas — guionistas de xogo, desenvolvedores e stakeholders clave — para o xogo móbil de puzzle Soku. Reunións semanais, revisións de desempeño semestrais e coaching semanal sobre técnicas modernas de desenvolvemento web.'),
        h2('Ferramentas Internas para Desenvolvedores'),
        h3('Integracións para a Velocidade de Entrega'),
        p('Creación e despregamento de ferramentas internas para acelerar os procesos de desenvolvemento mediante integracións con Harvest para time tracking e Infinity boards.'),
      ]),
    },
    pt: {
      title: 'Software de Imagem Dentária 3D',
      description:
        'Liderei a engenharia em três frentes paralelas na Synphonyte durante quase quatro anos: imagem dentária 3D com geometria personalizada do canal nervoso em Vue.js e THREE.js, o jogo móvel de puzzle Soku e ferramentas internas. Implementei um pipeline de visual regression testing com Puppeteer, AVA.js, AWS CodeBuild e GitLab CI para QA automatizada.',
      content: buildRichText([
        h2('Visão Geral'),
        p('A Synphonyte desenvolve software de tecnologia dentária e produtos relacionados. Como Engenheiro de Software Principal durante quase quatro anos, Rowin liderou a engenharia em três frentes paralelas: imagem dentária 3D, o jogo móvel de puzzle Soku e ferramentas internas.'),
        h2('Imagem Dentária 3D'),
        h3('Visual Regression Testing'),
        p('Desenvolvimento de testes de visual regression para software complexo de imagem dentária 3D com Puppeteer e AVA.js, integrados com AWS CodeBuild, Lambda Functions e GitLab CI para detetar regressões de renderização automaticamente em cada commit.'),
        h3('Geometria Personalizada do Canal Nervoso'),
        p('Desenho e implementação de geometria personalizada do canal nervoso em conjunto com especialistas em gráficos usando Vue.js, THREE.js e um pipeline de renderização próprio — ajudando os radiologistas a preparar procedimentos de implantes dentários com maior precisão.'),
        h2('Jogo Móvel de Puzzle Soku'),
        h3('Liderança de Equipa Multidisciplinar'),
        p('Gestão de uma equipa de sete pessoas — argumentistas de jogo, programadores e stakeholders chave — para o jogo móvel de puzzle Soku. Reuniões semanais, avaliações de desempenho semestrais e coaching semanal sobre técnicas modernas de desenvolvimento web.'),
        h2('Ferramentas Internas para Programadores'),
        h3('Integrações para Velocidade de Entrega'),
        p('Criação e deployment de ferramentas internas para acelerar os processos de desenvolvimento através de integrações com Harvest para time tracking e Infinity boards.'),
      ]),
    },
  },
};
