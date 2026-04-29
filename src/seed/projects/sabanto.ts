import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const sabanto: ProjectSeedData = {
  title: 'Sabanto Mission Control',
  slug: 'sabanto-mission-control',
  client: 'Sabanto',
  description:
    'Mission Control is the operator interface for Sabanto\'s autonomous farming equipment. We built map-based views using React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS, and Storybook; designed a map-layering system backed by React context, portals, and event buses; and delivered the Mission Control mobile MVP in React Native.',
  industries: ['AgTech & IoT'],
  technologies: [
    'React',
    'React Native',
    'TypeScript',
    'GeoJSON',
    'deck.gl',
    'Mapbox',
    'Turf.js',
    'TailwindCSS',
    'Storybook',
  ],
  status: 'draft',
  publishedDate: '2023-02-01T00:00:00.000Z',
  order: 8,
  featuredImageUrl: null,
  featuredImageAlt: 'Sabanto Mission Control autonomous farming interface',
  content: buildRichText([
    h2('Overview'),
    p(
      'Sabanto builds autonomous farming technology, enabling tractors and equipment to operate without drivers. Mission Control is the central interface operators use to monitor and manage fleets of autonomous machines across vast agricultural fields.',
    ),
    p(
      'As Mission Control Software Engineer, Kalebtec contributed to the web operator console and shipped the mobile MVP that took fleet visibility off the desktop and into the field.',
    ),

    h2('Key Contributions'),

    h3('Map-Based Mission Views'),
    p(
      'Researched and developed components to enhance the user experience of map-based views using React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS, and Storybook — giving operators a clear, performant view of equipment, fields, and active missions.',
    ),

    h3('Map Layering Architecture'),
    p(
      "Designed and implemented a map layering system that treats map objects and features as individual components, enabling communication between layers through React's context, portals, and event buses. The result was a composable architecture for adding new visualizations without entangling layer logic.",
    ),

    h3('Mobile MVP'),
    p(
      'Developed the Mission Control mobile MVP using React Native, Mapbox, and TypeScript, showcasing app performance and on-the-go mission management for farm operators.',
    ),
    ul([
      'Real-time field monitoring and equipment tracking on mobile',
      'Mapbox-backed map views matching the web experience',
      'TypeScript end-to-end for shared models with the web client',
    ]),
  ]),
  translations: {
    es: {
      title: 'Sabanto Mission Control',
      description:
        'Desarrollo de Mission Control, la interfaz de operador para los equipos de agricultura autónoma de Sabanto. Investigación y desarrollo de vistas basadas en mapas con React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS y Storybook, diseño de un sistema de capas de mapa apoyado en context, portals y event buses de React, y entrega del MVP móvil de Mission Control en React Native.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Sabanto desarrolla tecnología de agricultura autónoma, permitiendo que tractores y equipos operen sin conductor. Mission Control es la interfaz central que los operadores utilizan para monitorizar y gestionar flotas de máquinas autónomas en extensos campos agrícolas.',
        ),
        p(
          'Como Mission Control Software Engineer, Kalebtec contribuyó a la consola web del operador y entregó el MVP móvil que llevó la visibilidad de la flota fuera del escritorio y al terreno.',
        ),
        h2('Contribuciones Clave'),
        h3('Vistas de Misiones Basadas en Mapas'),
        p(
          'Investigación y desarrollo de componentes para mejorar la experiencia de usuario en vistas basadas en mapas usando React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS y Storybook — ofreciendo a los operadores una visión clara y performante de los equipos, campos y misiones activas.',
        ),
        h3('Arquitectura de Capas de Mapa'),
        p(
          'Diseño e implementación de un sistema de capas de mapa que trata los objetos y features del mapa como componentes individuales, habilitando la comunicación entre capas mediante context, portals y event buses de React. El resultado fue una arquitectura composable para añadir nuevas visualizaciones sin enredar la lógica de cada capa.',
        ),
        h3('MVP Móvil'),
        p(
          'Desarrollo del MVP móvil de Mission Control con React Native, Mapbox y TypeScript, demostrando el rendimiento de la aplicación y la gestión de misiones sobre el terreno para operadores agrícolas.',
        ),
        ul([
          'Monitorización de campo y tracking de equipos en tiempo real en móvil',
          'Vistas de mapa con Mapbox alineadas con la experiencia web',
          'TypeScript end-to-end para compartir modelos con el cliente web',
        ]),
      ]),
    },
    fr: {
      title: 'Sabanto Mission Control',
      description:
        "Développement de Mission Control, l'interface opérateur des équipements agricoles autonomes de Sabanto. Recherche et développement de vues cartographiques avec React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS et Storybook, conception d'un système de couches cartographiques reposant sur les context, portals et event buses de React, et livraison du MVP mobile de Mission Control en React Native.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Sabanto conçoit des technologies agricoles autonomes permettant aux tracteurs et aux équipements d'opérer sans conducteur. Mission Control est l'interface centrale par laquelle les opérateurs supervisent et gèrent des flottes de machines autonomes sur de vastes parcelles agricoles.",
        ),
        p(
          "En tant que Mission Control Software Engineer, Kalebtec a contribué à la console web opérateur et livré le MVP mobile qui a sorti la visibilité de la flotte du bureau pour l'amener sur le terrain.",
        ),
        h2('Contributions Clés'),
        h3('Vues de Mission Cartographiques'),
        p(
          "Recherche et développement de composants pour améliorer l'expérience utilisateur des vues cartographiques avec React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS et Storybook — offrant aux opérateurs une vision claire et performante des équipements, parcelles et missions actives.",
        ),
        h3('Architecture des Couches Cartographiques'),
        p(
          "Conception et implémentation d'un système de couches cartographiques traitant les objets et features de la carte comme des composants individuels, la communication entre couches reposant sur les context, portals et event buses de React. Le résultat : une architecture composable permettant d'ajouter de nouvelles visualisations sans enchevêtrer la logique des couches.",
        ),
        h3('MVP Mobile'),
        p(
          'Développement du MVP mobile de Mission Control avec React Native, Mapbox et TypeScript, démontrant la performance applicative et la gestion de missions en mobilité pour les opérateurs agricoles.',
        ),
        ul([
          "Monitoring des parcelles et tracking d'équipements en temps réel sur mobile",
          "Vues cartographiques Mapbox alignées sur l'expérience web",
          'TypeScript de bout en bout pour partager les modèles avec le client web',
        ]),
      ]),
    },
    ca: {
      title: 'Sabanto Mission Control',
      description:
        "Desenvolupament de Mission Control, la interfície d'operador per als equips d'agricultura autònoma de Sabanto. Recerca i desenvolupament de vistes basades en mapes amb React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS i Storybook, disseny d'un sistema de capes de mapa recolzat en context, portals i event buses de React, i lliurament del MVP mòbil de Mission Control en React Native.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          "Sabanto desenvolupa tecnologia d'agricultura autònoma, permetent que tractors i equips operin sense conductor. Mission Control és la interfície central que els operadors utilitzen per monitoritzar i gestionar flotes de màquines autònomes en extensos camps agrícoles.",
        ),
        p(
          "Com a Mission Control Software Engineer, Kalebtec va contribuir a la consola web de l'operador i va lliurar el MVP mòbil que va portar la visibilitat de la flota fora de l'escriptori i al terreny.",
        ),
        h2('Contribucions Clau'),
        h3('Vistes de Missions Basades en Mapes'),
        p(
          "Recerca i desenvolupament de components per millorar l'experiència d'usuari en vistes basades en mapes utilitzant React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS i Storybook — oferint als operadors una visió clara i performant dels equips, camps i missions actives.",
        ),
        h3('Arquitectura de Capes de Mapa'),
        p(
          "Disseny i implementació d'un sistema de capes de mapa que tracta els objectes i features del mapa com a components individuals, habilitant la comunicació entre capes mitjançant context, portals i event buses de React. El resultat fou una arquitectura composable per afegir noves visualitzacions sense embolicar la lògica de cada capa.",
        ),
        h3('MVP Mòbil'),
        p(
          'Desenvolupament del MVP mòbil de Mission Control amb React Native, Mapbox i TypeScript, demostrant el rendiment de l\'aplicació i la gestió de missions sobre el terreny per a operadors agrícoles.',
        ),
        ul([
          'Monitorització de camp i tracking d\'equips en temps real en mòbil',
          "Vistes de mapa amb Mapbox alineades amb l'experiència web",
          'TypeScript end-to-end per compartir models amb el client web',
        ]),
      ]),
    },
    gl: {
      title: 'Sabanto Mission Control',
      description:
        'Desenvolvemento de Mission Control, a interface de operador para os equipos de agricultura autónoma de Sabanto. Investigación e desenvolvemento de vistas baseadas en mapas con React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS e Storybook, deseño dun sistema de capas de mapa apoiado en context, portals e event buses de React, e entrega do MVP móbil de Mission Control en React Native.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Sabanto desenvolve tecnoloxía de agricultura autónoma, permitindo que tractores e equipos operen sen condutor. Mission Control é a interface central que os operadores utilizan para monitorizar e xestionar frotas de máquinas autónomas en extensos campos agrícolas.',
        ),
        p(
          'Como Mission Control Software Engineer, Kalebtec contribuíu á consola web do operador e entregou o MVP móbil que levou a visibilidade da frota fóra do escritorio e ao terreo.',
        ),
        h2('Contribucións Clave'),
        h3('Vistas de Misións Baseadas en Mapas'),
        p(
          'Investigación e desenvolvemento de compoñentes para mellorar a experiencia de usuario en vistas baseadas en mapas usando React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS e Storybook — ofrecendo aos operadores unha visión clara e performante dos equipos, campos e misións activas.',
        ),
        h3('Arquitectura de Capas de Mapa'),
        p(
          'Deseño e implementación dun sistema de capas de mapa que trata os obxectos e features do mapa como compoñentes individuais, habilitando a comunicación entre capas mediante context, portals e event buses de React. O resultado foi unha arquitectura composable para engadir novas visualizacións sen enredar a lóxica de cada capa.',
        ),
        h3('MVP Móbil'),
        p(
          'Desenvolvemento do MVP móbil de Mission Control con React Native, Mapbox e TypeScript, demostrando o rendemento da aplicación e a xestión de misións sobre o terreo para operadores agrícolas.',
        ),
        ul([
          'Monitorización de campo e tracking de equipos en tempo real en móbil',
          'Vistas de mapa con Mapbox aliñadas coa experiencia web',
          'TypeScript end-to-end para compartir modelos co cliente web',
        ]),
      ]),
    },
    pt: {
      title: 'Sabanto Mission Control',
      description:
        'Desenvolvimento de Mission Control, a interface de operador para os equipamentos de agricultura autónoma da Sabanto. Investigação e desenvolvimento de vistas baseadas em mapas com React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS e Storybook, desenho de um sistema de camadas de mapa apoiado em context, portals e event buses do React, e entrega do MVP mobile de Mission Control em React Native.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'A Sabanto desenvolve tecnologia de agricultura autónoma, permitindo que tratores e equipamentos operem sem condutor. O Mission Control é a interface central que os operadores utilizam para monitorizar e gerir frotas de máquinas autónomas em vastos campos agrícolas.',
        ),
        p(
          'Enquanto Mission Control Software Engineer, Kalebtec contribuiu para a consola web do operador e entregou o MVP mobile que levou a visibilidade da frota para fora do desktop e para o terreno.',
        ),
        h2('Contribuições Chave'),
        h3('Vistas de Missões Baseadas em Mapas'),
        p(
          'Investigação e desenvolvimento de componentes para melhorar a experiência de utilizador em vistas baseadas em mapas com React, GeoJSON, deck.gl, Mapbox, Turf.js, TailwindCSS e Storybook — dando aos operadores uma visão clara e performante dos equipamentos, campos e missões ativas.',
        ),
        h3('Arquitetura de Camadas de Mapa'),
        p(
          'Desenho e implementação de um sistema de camadas de mapa que trata os objetos e features do mapa como componentes individuais, permitindo a comunicação entre camadas através de context, portals e event buses do React. O resultado foi uma arquitetura composable para adicionar novas visualizações sem emaranhar a lógica de cada camada.',
        ),
        h3('MVP Mobile'),
        p(
          'Desenvolvimento do MVP mobile de Mission Control com React Native, Mapbox e TypeScript, demonstrando o desempenho da aplicação e a gestão de missões em mobilidade para operadores agrícolas.',
        ),
        ul([
          'Monitorização de campo e tracking de equipamentos em tempo real em mobile',
          'Vistas de mapa com Mapbox alinhadas com a experiência web',
          'TypeScript end-to-end para partilhar modelos com o cliente web',
        ]),
      ]),
    },
  },
};
