import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const parrolabs: ProjectSeedData = {
  title: 'Parrolabs News & Maps Platform',
  slug: 'parrolabs-news-maps-platform',
  client: 'Parrolabs',
  description:
    "Two React.js engagements delivered through Parrolabs, a software consultancy in Medellin. We optimized image loading and SEO via server-side rendering for a prominent news company, and developed a map-intensive React.js application for boot camps in Medellin, Colombia.",
  industries: ['Media & News', 'SaaS'],
  technologies: ['React.js', 'SSR', 'Mapbox'],
  status: 'published',
  publishedDate: '2018-03-01T00:00:00.000Z',
  order: 11,
  featuredImageUrl: 'parrolabs.webp',
  featuredImageAlt: 'Parrolabs logo',
  content: buildRichText([
    h2('Overview'),
    p(
      'At Parrolabs, a software consultancy in Medellin, our team delivered two distinct front-end client engagements: a React.js news platform requiring performance and SEO optimization, and a map-intensive React.js application for boot camps in Medellin.',
    ),

    h2('News Platform'),

    h3('Performance & SEO'),
    p(
      'Fixed issues and improved the codebase of an existing React.js app for a prominent news company — optimizing image loading and enhancing SEO through server-side rendering so pages ranked and rendered the way the editorial team expected.',
    ),

    h2('Boot Camps Maps Application'),

    h3('Interactive Mapping'),
    p(
      'Further developed a map-intensive React.js application for boot camps in Medellin, Colombia — enhancing functionality, location discovery, and overall user experience.',
    ),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Noticias y Mapas Parrolabs',
      description:
        'Front End Engineer en Parrolabs, consultora de software de Medellín, contribuyendo a dos proyectos React.js distintos: mejora del código de una aplicación para una destacada empresa de noticias con foco en la carga de imágenes y el SEO mediante server-side rendering, y desarrollo adicional de una aplicación React.js intensiva en mapas para boot camps en Medellín, Colombia.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'En Parrolabs, una consultora de software en Medellín, Kalebtec trabajó como Front End Engineer en dos proyectos distintos de clientes: una plataforma React.js de noticias que requería optimización de rendimiento y SEO, y una aplicación React.js intensiva en mapas para boot camps en Medellín.',
        ),
        h2('Plataforma de Noticias'),
        h3('Rendimiento y SEO'),
        p(
          'Corrección de incidencias y mejora del código de una aplicación React.js existente para una destacada empresa de noticias — optimizando la carga de imágenes y mejorando el SEO mediante server-side rendering para que las páginas posicionaran y renderizaran como el equipo editorial esperaba.',
        ),
        h2('Aplicación de Mapas para Boot Camps'),
        h3('Mapeo Interactivo'),
        p(
          'Desarrollo adicional de una aplicación React.js intensiva en mapas para boot camps en Medellín, Colombia — mejorando la funcionalidad, el descubrimiento de ubicaciones y la experiencia general del usuario.',
        ),
      ]),
    },
    fr: {
      title: 'Plateforme News et Maps Parrolabs',
      description:
        "Front End Engineer chez Parrolabs, cabinet de conseil en logiciel à Medellin, contribuant à deux projets React.js distincts : amélioration du code d'une application pour une entreprise de presse de premier plan avec un accent sur le chargement d'images et le SEO via server-side rendering, et développement d'une application React.js cartographique pour les boot camps de Medellin, en Colombie.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Chez Parrolabs, cabinet de conseil en logiciel à Medellin, Kalebtec a travaillé comme Front End Engineer sur deux projets clients distincts : une plateforme React.js de presse nécessitant une optimisation de performance et de SEO, et une application React.js cartographique pour les boot camps de Medellin.",
        ),
        h2('Plateforme de Presse'),
        h3('Performance et SEO'),
        p(
          "Correction d'incidents et amélioration du code d'une application React.js existante pour une entreprise de presse de premier plan — optimisation du chargement des images et amélioration du SEO via server-side rendering pour que les pages soient référencées et rendues comme l'équipe éditoriale l'attendait.",
        ),
        h2('Application Cartographique Boot Camps'),
        h3('Cartographie Interactive'),
        p(
          "Développement avancé d'une application React.js cartographique pour les boot camps de Medellin, en Colombie — amélioration des fonctionnalités, de la découverte de lieux et de l'expérience utilisateur globale.",
        ),
      ]),
    },
    ca: {
      title: 'Plataforma de Notícies i Mapes Parrolabs',
      description:
        'Front End Engineer a Parrolabs, consultora de software de Medellín, contribuint a dos projectes React.js diferents: millora del codi d\'una aplicació per a una destacada empresa de notícies amb focus en la càrrega d\'imatges i el SEO mitjançant server-side rendering, i desenvolupament addicional d\'una aplicació React.js intensiva en mapes per a boot camps a Medellín, Colòmbia.',
      content: buildRichText([
        h2('Descripció General'),
        p(
          "A Parrolabs, una consultora de software a Medellín, Kalebtec va treballar com a Front End Engineer en dos projectes diferents de clients: una plataforma React.js de notícies que requeria optimització de rendiment i SEO, i una aplicació React.js intensiva en mapes per a boot camps a Medellín.",
        ),
        h2('Plataforma de Notícies'),
        h3('Rendiment i SEO'),
        p(
          "Correcció d'incidències i millora del codi d'una aplicació React.js existent per a una destacada empresa de notícies — optimitzant la càrrega d'imatges i millorant el SEO mitjançant server-side rendering perquè les pàgines es posicionessin i es rendereguessin tal com l'equip editorial esperava.",
        ),
        h2('Aplicació de Mapes per a Boot Camps'),
        h3('Cartografia Interactiva'),
        p(
          "Desenvolupament addicional d'una aplicació React.js intensiva en mapes per a boot camps a Medellín, Colòmbia — millorant la funcionalitat, el descobriment d'ubicacions i l'experiència general d'usuari.",
        ),
      ]),
    },
    gl: {
      title: 'Plataforma de Noticias e Mapas Parrolabs',
      description:
        'Front End Engineer en Parrolabs, consultora de software de Medellín, contribuíndo a dous proxectos React.js distintos: mellora do código dunha aplicación para unha destacada empresa de noticias con foco na carga de imaxes e o SEO mediante server-side rendering, e desenvolvemento adicional dunha aplicación React.js intensiva en mapas para boot camps en Medellín, Colombia.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'En Parrolabs, unha consultora de software en Medellín, Kalebtec traballou como Front End Engineer en dous proxectos distintos de clientes: unha plataforma React.js de noticias que requiría optimización de rendemento e SEO, e unha aplicación React.js intensiva en mapas para boot camps en Medellín.',
        ),
        h2('Plataforma de Noticias'),
        h3('Rendemento e SEO'),
        p(
          'Corrección de incidencias e mellora do código dunha aplicación React.js existente para unha destacada empresa de noticias — optimizando a carga de imaxes e mellorando o SEO mediante server-side rendering para que as páxinas posicionasen e renderizasen como o equipo editorial esperaba.',
        ),
        h2('Aplicación de Mapas para Boot Camps'),
        h3('Mapeo Interactivo'),
        p(
          'Desenvolvemento adicional dunha aplicación React.js intensiva en mapas para boot camps en Medellín, Colombia — mellorando a funcionalidade, o descubrimento de localizacións e a experiencia xeral do usuario.',
        ),
      ]),
    },
    pt: {
      title: 'Plataforma de Notícias e Mapas Parrolabs',
      description:
        'Front End Engineer na Parrolabs, consultora de software em Medellín, a contribuir para dois projetos React.js distintos: melhoria do código de uma aplicação para uma destacada empresa de notícias com foco no carregamento de imagens e no SEO via server-side rendering, e desenvolvimento adicional de uma aplicação React.js intensiva em mapas para boot camps em Medellín, Colômbia.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'Na Parrolabs, uma consultora de software em Medellín, Kalebtec trabalhou como Front End Engineer em dois projetos distintos de clientes: uma plataforma React.js de notícias que exigia otimização de desempenho e SEO, e uma aplicação React.js intensiva em mapas para boot camps em Medellín.',
        ),
        h2('Plataforma de Notícias'),
        h3('Desempenho e SEO'),
        p(
          'Correção de incidentes e melhoria do código de uma aplicação React.js existente para uma destacada empresa de notícias — otimizando o carregamento de imagens e melhorando o SEO via server-side rendering para que as páginas fossem indexadas e renderizadas como a equipa editorial esperava.',
        ),
        h2('Aplicação de Mapas para Boot Camps'),
        h3('Cartografia Interativa'),
        p(
          'Desenvolvimento adicional de uma aplicação React.js intensiva em mapas para boot camps em Medellín, Colômbia — melhorando a funcionalidade, a descoberta de localizações e a experiência geral do utilizador.',
        ),
      ]),
    },
  },
};
