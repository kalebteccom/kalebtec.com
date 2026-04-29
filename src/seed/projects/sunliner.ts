import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const sunliner: ProjectSeedData = {
  title: 'Sunliner Travel Platform',
  slug: 'sunliner-travel-platform',
  client: 'Sunliner',
  description:
    'Senior Software Engineer for a prominent Dutch tour operator. Resolved performance issues in the legacy PHP application, then architected and led development of a React.js front-end with server-side rendering in Next.js. Managed a team of four remote developers using Agile and Kanban tooling (Slack, Trello, Infinity, Notion) while tailoring user flows and shopping experiences to the Netherlands market.',
  industries: ['Travel & Hospitality'],
  technologies: ['React.js', 'Next.js', 'PHP', 'Agile', 'Kanban'],
  status: 'draft',
  publishedDate: '2021-06-01T00:00:00.000Z',
  order: 9,
  featuredImageUrl: null,
  featuredImageAlt: 'Sunliner travel booking platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Sunliner is a prominent tour operator in the Netherlands, offering vacation packages and travel experiences. The platform needed both immediate performance wins on its PHP legacy and a modern front-end architecture to support a growing user base and meet current performance expectations.',
    ),
    p(
      'As Senior Software Engineer, Rowin led the technical work across both tracks — first stabilizing the existing site, then architecting and shipping the new React.js + Next.js front-end with server-side rendering.',
    ),

    h2('Key Contributions'),

    h3('Performance Optimization on the PHP Legacy'),
    p(
      'Resolved performance issues in the existing PHP application for a prominent tour operator in the Netherlands — improving image loading and overall site speed for a better user experience.',
    ),

    h3('Modern Front-End Architecture'),
    p(
      'Architected, led, and developed a React.js front-end application with server-side rendering using Next.js and modern techniques to support a large user base in a scalable and performant way.',
    ),

    h3('Team & Stakeholder Management'),
    p(
      'Managed a team of four remote web developers, using Agile methodologies and Kanban tools (Slack, Trello, Infinity, Notion). Responsible for hiring and team coordination.',
    ),
    ul([
      'Led a team of four remote web developers end-to-end',
      'Agile ceremonies with Kanban via Slack, Trello, Infinity, and Notion',
      'Owned hiring and team coordination',
      'Collaborated closely with stakeholders, the CEO, and tour operation agents',
      'Tailored user flows and shopping experiences to the Netherlands market',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Viajes Sunliner',
      description:
        'Senior Software Engineer para un destacado tour operator de los Países Bajos. Resolución de problemas de rendimiento en la aplicación PHP legacy y, a continuación, arquitectura y liderazgo del desarrollo de un front-end en React.js con server-side rendering mediante Next.js. Gestión de un equipo de cuatro desarrolladores remotos usando Agile y Kanban (Slack, Trello, Infinity, Notion) y adaptación de los flujos de usuario y la experiencia de compra al mercado neerlandés.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Sunliner es un destacado tour operator en los Países Bajos, con paquetes vacacionales y experiencias de viaje. La plataforma necesitaba tanto mejoras inmediatas de rendimiento en su base PHP legacy como una arquitectura front-end moderna que soportara una base de usuarios en crecimiento y cumpliera con las expectativas actuales de performance.',
        ),
        p(
          'Como Senior Software Engineer, Rowin lideró el trabajo técnico en ambos frentes: primero estabilizando el sitio existente y después diseñando y entregando el nuevo front-end en React.js + Next.js con server-side rendering.',
        ),
        h2('Contribuciones Clave'),
        h3('Optimización de Rendimiento sobre el Legacy PHP'),
        p(
          'Resolución de problemas de rendimiento en la aplicación PHP existente de un destacado tour operator en los Países Bajos — mejorando la carga de imágenes y la velocidad general del sitio para una mejor experiencia de usuario.',
        ),
        h3('Arquitectura Front-End Moderna'),
        p(
          'Arquitectura, liderazgo y desarrollo de un front-end en React.js con server-side rendering mediante Next.js y técnicas modernas para soportar una gran base de usuarios de forma escalable y performante.',
        ),
        h3('Gestión de Equipo y Stakeholders'),
        p(
          'Gestión de un equipo de cuatro desarrolladores web remotos, con metodologías Agile y herramientas Kanban (Slack, Trello, Infinity, Notion). Responsable de contratación y coordinación de equipo.',
        ),
        ul([
          'Liderazgo end-to-end de un equipo de cuatro desarrolladores web remotos',
          'Ceremonias Agile con Kanban vía Slack, Trello, Infinity y Notion',
          'Responsable de contratación y coordinación del equipo',
          'Colaboración estrecha con stakeholders, el CEO y agentes de operaciones turísticas',
          'Adaptación de los flujos de usuario y la experiencia de compra al mercado neerlandés',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme de Voyages Sunliner',
      description:
        "Ingénieur Logiciel Senior pour un tour operator néerlandais de premier plan. Résolution des problèmes de performance sur l'application PHP legacy, puis architecture et direction du développement d'un front-end React.js avec server-side rendering sous Next.js. Gestion d'une équipe de quatre développeurs distants en Agile et Kanban (Slack, Trello, Infinity, Notion), et adaptation des parcours utilisateurs et de l'expérience d'achat au marché néerlandais.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Sunliner est un tour operator de premier plan aux Pays-Bas, proposant des forfaits vacances et des expériences de voyage. La plateforme avait besoin à la fois de gains de performance immédiats sur son legacy PHP et d'une architecture front-end moderne pour supporter une base d'utilisateurs en croissance et répondre aux exigences actuelles de performance.",
        ),
        p(
          "En tant qu'Ingénieur Logiciel Senior, Rowin a piloté le travail technique sur les deux fronts : d'abord en stabilisant le site existant, puis en architecturant et livrant le nouveau front-end React.js + Next.js avec server-side rendering.",
        ),
        h2('Contributions Clés'),
        h3('Optimisation de la Performance du Legacy PHP'),
        p(
          "Résolution des problèmes de performance de l'application PHP existante d'un tour operator néerlandais de premier plan — amélioration du chargement des images et de la vitesse globale du site pour une meilleure expérience utilisateur.",
        ),
        h3('Architecture Front-End Moderne'),
        p(
          "Architecture, direction et développement d'une application front-end React.js avec server-side rendering via Next.js et techniques modernes pour supporter une large base d'utilisateurs de façon scalable et performante.",
        ),
        h3("Gestion d'Équipe et Stakeholders"),
        p(
          "Gestion d'une équipe de quatre développeurs web distants, en méthodologies Agile et outils Kanban (Slack, Trello, Infinity, Notion). Responsable du recrutement et de la coordination d'équipe.",
        ),
        ul([
          "Direction end-to-end d'une équipe de quatre développeurs web distants",
          'Rituels Agile avec Kanban via Slack, Trello, Infinity et Notion',
          "Responsable du recrutement et de la coordination d'équipe",
          "Collaboration étroite avec les stakeholders, le CEO et les agents d'opérations touristiques",
          "Adaptation des parcours utilisateurs et de l'expérience d'achat au marché néerlandais",
        ]),
      ]),
    },
    ca: {
      title: 'Plataforma de Viatges Sunliner',
      description:
        "Enginyer de Software Senior per a un destacat tour operator dels Països Baixos. Resolució de problemes de rendiment en l'aplicació PHP legacy i, a continuació, arquitectura i lideratge del desenvolupament d'un front-end en React.js amb server-side rendering mitjançant Next.js. Gestió d'un equip de quatre desenvolupadors remots amb Agile i Kanban (Slack, Trello, Infinity, Notion) i adaptació dels fluxos d'usuari i l'experiència de compra al mercat neerlandès.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          "Sunliner és un destacat tour operator als Països Baixos, amb paquets vacacionals i experiències de viatge. La plataforma necessitava tant millores immediates de rendiment sobre la seva base PHP legacy com una arquitectura front-end moderna que suportés una base d'usuaris en creixement i complís amb les expectatives actuals de performance.",
        ),
        p(
          "Com a Enginyer de Software Senior, Rowin va liderar el treball tècnic en tots dos fronts: primer estabilitzant el lloc existent i després dissenyant i lliurant el nou front-end en React.js + Next.js amb server-side rendering.",
        ),
        h2('Contribucions Clau'),
        h3('Optimització de Rendiment sobre el Legacy PHP'),
        p(
          "Resolució de problemes de rendiment en l'aplicació PHP existent d'un destacat tour operator als Països Baixos — millorant la càrrega d'imatges i la velocitat general del lloc per a una millor experiència d'usuari.",
        ),
        h3('Arquitectura Front-End Moderna'),
        p(
          "Arquitectura, lideratge i desenvolupament d'un front-end en React.js amb server-side rendering mitjançant Next.js i tècniques modernes per suportar una gran base d'usuaris de manera escalable i performant.",
        ),
        h3("Gestió d'Equip i Stakeholders"),
        p(
          "Gestió d'un equip de quatre desenvolupadors web remots, amb metodologies Agile i eines Kanban (Slack, Trello, Infinity, Notion). Responsable de contractació i coordinació d'equip.",
        ),
        ul([
          "Lideratge end-to-end d'un equip de quatre desenvolupadors web remots",
          'Cerimònies Agile amb Kanban via Slack, Trello, Infinity i Notion',
          "Responsable de contractació i coordinació de l'equip",
          "Col·laboració estreta amb stakeholders, el CEO i agents d'operacions turístiques",
          "Adaptació dels fluxos d'usuari i l'experiència de compra al mercat neerlandès",
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma de Viaxes Sunliner',
      description:
        'Enxeñeiro de Software Senior para un destacado tour operator dos Países Baixos. Resolución de problemas de rendemento na aplicación PHP legacy e, a continuación, arquitectura e lideranza do desenvolvemento dun front-end en React.js con server-side rendering mediante Next.js. Xestión dun equipo de catro desenvolvedores remotos usando Agile e Kanban (Slack, Trello, Infinity, Notion) e adaptación dos fluxos de usuario e a experiencia de compra ao mercado neerlandés.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Sunliner é un destacado tour operator nos Países Baixos, con paquetes vacacionais e experiencias de viaxe. A plataforma precisaba tanto melloras inmediatas de rendemento sobre a súa base PHP legacy como unha arquitectura front-end moderna que soportase unha base de usuarios en crecemento e cumprise coas expectativas actuais de performance.',
        ),
        p(
          'Como Enxeñeiro de Software Senior, Rowin liderou o traballo técnico nos dous frontes: primeiro estabilizando o sitio existente e despois deseñando e entregando o novo front-end en React.js + Next.js con server-side rendering.',
        ),
        h2('Contribucións Clave'),
        h3('Optimización de Rendemento sobre o Legacy PHP'),
        p(
          'Resolución de problemas de rendemento na aplicación PHP existente dun destacado tour operator nos Países Baixos — mellorando a carga de imaxes e a velocidade xeral do sitio para unha mellor experiencia de usuario.',
        ),
        h3('Arquitectura Front-End Moderna'),
        p(
          'Arquitectura, lideranza e desenvolvemento dun front-end en React.js con server-side rendering mediante Next.js e técnicas modernas para soportar unha gran base de usuarios de forma escalable e performante.',
        ),
        h3('Xestión de Equipo e Stakeholders'),
        p(
          'Xestión dun equipo de catro desenvolvedores web remotos, con metodoloxías Agile e ferramentas Kanban (Slack, Trello, Infinity, Notion). Responsable de contratación e coordinación de equipo.',
        ),
        ul([
          'Lideranza end-to-end dun equipo de catro desenvolvedores web remotos',
          'Cerimonias Agile con Kanban vía Slack, Trello, Infinity e Notion',
          'Responsable de contratación e coordinación do equipo',
          'Colaboración estreita con stakeholders, o CEO e axentes de operacións turísticas',
          'Adaptación dos fluxos de usuario e a experiencia de compra ao mercado neerlandés',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma de Viagens Sunliner',
      description:
        'Engenheiro de Software Senior para um destacado tour operator dos Países Baixos. Resolução de problemas de desempenho na aplicação PHP legacy e, de seguida, arquitetura e liderança do desenvolvimento de um front-end em React.js com server-side rendering via Next.js. Gestão de uma equipa de quatro programadores remotos em Agile e Kanban (Slack, Trello, Infinity, Notion) e adaptação dos fluxos de utilizador e da experiência de compra ao mercado neerlandês.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'A Sunliner é um destacado tour operator nos Países Baixos, com pacotes de férias e experiências de viagem. A plataforma precisava tanto de ganhos imediatos de desempenho sobre a sua base PHP legacy como de uma arquitetura front-end moderna para suportar uma base de utilizadores em crescimento e cumprir com as expectativas atuais de performance.',
        ),
        p(
          'Enquanto Engenheiro de Software Senior, Rowin liderou o trabalho técnico em ambas as frentes: primeiro estabilizando o site existente e depois arquitetando e entregando o novo front-end em React.js + Next.js com server-side rendering.',
        ),
        h2('Contribuições Chave'),
        h3('Otimização de Desempenho sobre o Legacy PHP'),
        p(
          'Resolução de problemas de desempenho na aplicação PHP existente de um destacado tour operator nos Países Baixos — melhorando o carregamento de imagens e a velocidade geral do site para uma melhor experiência de utilizador.',
        ),
        h3('Arquitetura Front-End Moderna'),
        p(
          'Arquitetura, liderança e desenvolvimento de um front-end em React.js com server-side rendering via Next.js e técnicas modernas para suportar uma grande base de utilizadores de forma escalável e performante.',
        ),
        h3('Gestão de Equipa e Stakeholders'),
        p(
          'Gestão de uma equipa de quatro programadores web remotos, com metodologias Agile e ferramentas Kanban (Slack, Trello, Infinity, Notion). Responsável pela contratação e coordenação da equipa.',
        ),
        ul([
          'Liderança end-to-end de uma equipa de quatro programadores web remotos',
          'Cerimónias Agile com Kanban via Slack, Trello, Infinity e Notion',
          'Responsável pela contratação e coordenação da equipa',
          'Colaboração próxima com stakeholders, o CEO e agentes de operações turísticas',
          'Adaptação dos fluxos de utilizador e da experiência de compra ao mercado neerlandês',
        ]),
      ]),
    },
  },
};
