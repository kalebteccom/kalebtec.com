import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const learapido: ProjectSeedData = {
  title: 'Lea Rapido Speed-Reading Platform',
  slug: 'lea-rapido-speed-reading-platform',
  client: 'Lea Rapido',
  description:
    'Helping Lea Rapido — a Medellin-based speed-reading academy — take its in-person course cross-platform with Flutter, Flare (Rive), Figma, and Sketch. We led a team of five mobile developers and copywriters under Agile, and architected a Ruby on Rails + Redis + PostgreSQL backend on AWS EC2/S3 that supports thousands of monthly users.',
  industries: ['EdTech'],
  technologies: [
    'Flutter',
    'Rive (Flare)',
    'Ruby on Rails',
    'Redis',
    'PostgreSQL',
    'AWS EC2',
    'AWS S3',
    'Figma',
    'Sketch',
  ],
  status: 'published',
  publishedDate: '2021-01-01T00:00:00.000Z',
  order: 10,
  featuredImageUrl: 'learapido.png',
  featuredImageAlt: 'Lea Rapido speed-reading academy logo',
  content: buildRichText([
    h2('Overview'),
    p(
      'Lea Rapido is a speed-reading academy based in Medellin, Colombia, that teaches students to read 200 pages in 60 minutes with full comprehension. The project converted their formal in-person course into an engaging cross-platform mobile format — and the infrastructure to support it at scale.',
    ),
    p(
      'Our team led both the mobile product and the backend platform, and drove the team that shipped them.',
    ),

    h2('Key Contributions'),

    h3('Mobile Learning Experience'),
    p(
      'Researched and developed a rich visual experience to enhance reading skills in a cross-platform mobile application using Flutter, Flare (Rive), Figma, and Sketch — pairing motion-driven exercises with a production-ready component library.',
    ),

    h3('Scalable Backend Platform'),
    p(
      'Architected a scalable platform solution to support thousands of monthly users, using Ruby on Rails, Redis, PostgreSQL, AWS EC2, and AWS S3.',
    ),

    h3('Team Leadership'),
    p(
      'Managed a team of five mobile developers and copywriters, overseeing hiring and employing Agile methodologies with daily in-office stand-ups, planning sessions, team-building activities, and coaching on mobile development.',
    ),
    ul([
      'Led a team of five — mobile developers and copywriters',
      'Owned hiring and onboarding',
      'Daily in-office stand-ups, planning sessions, and coaching on mobile development',
      'Team-building activities to keep the group cohesive',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Lectura Rápida Lea Rapido',
      description:
        'Tech Lead del proyecto Lea Rapido — una academia de lectura rápida en Medellín que llevó su curso presencial a un formato móvil multiplataforma con Flutter, Flare (Rive), Figma y Sketch. Gestión de un equipo de cinco desarrolladores móviles y copywriters bajo Agile, y arquitectura de un backend escalable en Ruby on Rails + Redis + PostgreSQL sobre AWS EC2/S3 para miles de usuarios mensuales.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Lea Rapido es una academia de lectura rápida con sede en Medellín, Colombia, que enseña a los estudiantes a leer 200 páginas en 60 minutos con comprensión total. El proyecto convirtió su curso formal presencial en un formato móvil multiplataforma atractivo — junto con la infraestructura para soportarlo a escala.',
        ),
        p(
          'Como equipo, lideramos tanto el producto móvil como la plataforma backend, e impulsó el equipo que los entregó.',
        ),
        h2('Contribuciones Clave'),
        h3('Experiencia de Aprendizaje Móvil'),
        p(
          'Investigación y desarrollo de una experiencia visual rica para potenciar las habilidades de lectura en una aplicación móvil multiplataforma con Flutter, Flare (Rive), Figma y Sketch — combinando ejercicios basados en animación con una librería de componentes lista para producción.',
        ),
        h3('Plataforma Backend Escalable'),
        p(
          'Arquitectura de una plataforma escalable para soportar miles de usuarios mensuales, utilizando Ruby on Rails, Redis, PostgreSQL, AWS EC2 y AWS S3.',
        ),
        h3('Liderazgo de Equipo'),
        p(
          'Gestión de un equipo de cinco desarrolladores móviles y copywriters, supervisando contratación y aplicando metodologías Agile con stand-ups diarios presenciales, sesiones de planificación, actividades de team-building y coaching en desarrollo móvil.',
        ),
        ul([
          'Liderazgo de un equipo de cinco — desarrolladores móviles y copywriters',
          'Responsable de contratación e incorporación',
          'Stand-ups diarios presenciales, sesiones de planificación y coaching en desarrollo móvil',
          'Actividades de team-building para mantener la cohesión del equipo',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme de Lecture Rapide Lea Rapido',
      description:
        "Tech Lead du projet Lea Rapido — une académie de lecture rapide à Medellin qui a porté son cours présentiel sur un format mobile cross-platform avec Flutter, Flare (Rive), Figma et Sketch. Gestion d'une équipe de cinq développeurs mobiles et copywriters en Agile, et architecture d'un backend scalable en Ruby on Rails + Redis + PostgreSQL sur AWS EC2/S3 pour des milliers d'utilisateurs mensuels.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Lea Rapido est une académie de lecture rapide basée à Medellin, en Colombie, qui apprend à ses étudiants à lire 200 pages en 60 minutes avec une compréhension complète. Le projet a porté leur cours formel présentiel sur un format mobile cross-platform immersif — ainsi que l'infrastructure nécessaire pour le soutenir à grande échelle.",
        ),
        p(
          "Notre équipe a piloté à la fois le produit mobile et la plateforme backend, et a mené l'équipe qui les a livrés.",
        ),
        h2('Contributions Clés'),
        h3("Expérience d'Apprentissage Mobile"),
        p(
          "Recherche et développement d'une expérience visuelle riche pour améliorer les compétences de lecture dans une application mobile cross-platform avec Flutter, Flare (Rive), Figma et Sketch — associant des exercices animés à une bibliothèque de composants prête pour la production.",
        ),
        h3('Plateforme Backend Scalable'),
        p(
          "Architecture d'une plateforme scalable pour supporter des milliers d'utilisateurs mensuels avec Ruby on Rails, Redis, PostgreSQL, AWS EC2 et AWS S3.",
        ),
        h3("Leadership d'Équipe"),
        p(
          "Gestion d'une équipe de cinq développeurs mobiles et copywriters, supervision du recrutement et méthodologies Agile avec stand-ups quotidiens en présentiel, sessions de planification, activités de team-building et coaching en développement mobile.",
        ),
        ul([
          "Direction d'une équipe de cinq — développeurs mobiles et copywriters",
          "Responsable du recrutement et de l'onboarding",
          'Stand-ups quotidiens en présentiel, planifications et coaching en développement mobile',
          "Activités de team-building pour préserver la cohésion de l'équipe",
        ]),
      ]),
    },
    ca: {
      title: 'Plataforma de Lectura Ràpida Lea Rapido',
      description:
        "Tech Lead del projecte Lea Rapido — una acadèmia de lectura ràpida a Medellín que va portar el seu curs presencial a un format mòbil multiplataforma amb Flutter, Flare (Rive), Figma i Sketch. Gestió d'un equip de cinc desenvolupadors mòbils i copywriters sota Agile, i arquitectura d'un backend escalable en Ruby on Rails + Redis + PostgreSQL sobre AWS EC2/S3 per a milers d'usuaris mensuals.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          "Lea Rapido és una acadèmia de lectura ràpida amb seu a Medellín, Colòmbia, que ensenya els seus alumnes a llegir 200 pàgines en 60 minuts amb comprensió total. El projecte va convertir el seu curs formal presencial en un format mòbil multiplataforma atractiu — juntament amb la infraestructura per sostenir-lo a escala.",
        ),
        p(
          "Com a equip, vam liderar tant el producte mòbil com la plataforma backend, i va impulsar l'equip que els va lliurar.",
        ),
        h2('Contribucions Clau'),
        h3("Experiència d'Aprenentatge Mòbil"),
        p(
          "Recerca i desenvolupament d'una experiència visual rica per potenciar les habilitats de lectura en una aplicació mòbil multiplataforma amb Flutter, Flare (Rive), Figma i Sketch — combinant exercicis basats en animació amb una llibreria de components llesta per a producció.",
        ),
        h3('Plataforma Backend Escalable'),
        p(
          "Arquitectura d'una plataforma escalable per suportar milers d'usuaris mensuals utilitzant Ruby on Rails, Redis, PostgreSQL, AWS EC2 i AWS S3.",
        ),
        h3("Lideratge d'Equip"),
        p(
          "Gestió d'un equip de cinc desenvolupadors mòbils i copywriters, supervisant la contractació i aplicant metodologies Agile amb stand-ups diaris presencials, sessions de planificació, activitats de team-building i coaching en desenvolupament mòbil.",
        ),
        ul([
          "Lideratge d'un equip de cinc — desenvolupadors mòbils i copywriters",
          "Responsable de contractació i onboarding",
          'Stand-ups diaris presencials, sessions de planificació i coaching en desenvolupament mòbil',
          "Activitats de team-building per mantenir la cohesió de l'equip",
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma de Lectura Rápida Lea Rapido',
      description:
        'Tech Lead do proxecto Lea Rapido — unha academia de lectura rápida en Medellín que levou o seu curso presencial a un formato móbil multiplataforma con Flutter, Flare (Rive), Figma e Sketch. Xestión dun equipo de cinco desenvolvedores móbiles e copywriters baixo Agile, e arquitectura dun backend escalable en Ruby on Rails + Redis + PostgreSQL sobre AWS EC2/S3 para miles de usuarios mensuais.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Lea Rapido é unha academia de lectura rápida con sede en Medellín, Colombia, que ensina aos estudantes a ler 200 páxinas en 60 minutos con comprensión total. O proxecto converteu o seu curso formal presencial nun formato móbil multiplataforma atractivo — xunto coa infraestrutura para soportalo a escala.',
        ),
        p(
          'Como equipo, lideramos tanto o produto móbil como a plataforma backend, e impulsou o equipo que os entregou.',
        ),
        h2('Contribucións Clave'),
        h3('Experiencia de Aprendizaxe Móbil'),
        p(
          'Investigación e desenvolvemento dunha experiencia visual rica para potenciar as habilidades de lectura nunha aplicación móbil multiplataforma con Flutter, Flare (Rive), Figma e Sketch — combinando exercicios baseados en animación cunha librería de compoñentes lista para produción.',
        ),
        h3('Plataforma Backend Escalable'),
        p(
          'Arquitectura dunha plataforma escalable para soportar miles de usuarios mensuais, utilizando Ruby on Rails, Redis, PostgreSQL, AWS EC2 e AWS S3.',
        ),
        h3('Lideranza de Equipo'),
        p(
          'Xestión dun equipo de cinco desenvolvedores móbiles e copywriters, supervisando contratación e aplicando metodoloxías Agile con stand-ups diarios presenciais, sesións de planificación, actividades de team-building e coaching en desenvolvemento móbil.',
        ),
        ul([
          'Lideranza dun equipo de cinco — desenvolvedores móbiles e copywriters',
          'Responsable de contratación e incorporación',
          'Stand-ups diarios presenciais, sesións de planificación e coaching en desenvolvemento móbil',
          'Actividades de team-building para manter a cohesión do equipo',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma de Leitura Rápida Lea Rapido',
      description:
        'Tech Lead do projeto Lea Rapido — uma academia de leitura rápida em Medellín que passou o seu curso presencial para um formato mobile cross-platform com Flutter, Flare (Rive), Figma e Sketch. Gestão de uma equipa de cinco programadores mobile e copywriters em Agile, e arquitetura de um backend escalável em Ruby on Rails + Redis + PostgreSQL sobre AWS EC2/S3 para milhares de utilizadores mensais.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'A Lea Rapido é uma academia de leitura rápida sediada em Medellín, Colômbia, que ensina os seus alunos a ler 200 páginas em 60 minutos com compreensão total. O projeto passou o seu curso formal presencial para um formato mobile cross-platform apelativo — juntamente com a infraestrutura para o sustentar à escala.',
        ),
        p(
          'Enquanto Tech Lead e programador, Kalebtec liderou tanto o produto mobile como a plataforma backend, e impulsionou a equipa que os entregou.',
        ),
        h2('Contribuições Chave'),
        h3('Experiência de Aprendizagem Mobile'),
        p(
          'Investigação e desenvolvimento de uma experiência visual rica para potenciar as competências de leitura numa aplicação mobile cross-platform com Flutter, Flare (Rive), Figma e Sketch — combinando exercícios baseados em animação com uma biblioteca de componentes pronta para produção.',
        ),
        h3('Plataforma Backend Escalável'),
        p(
          'Arquitetura de uma plataforma escalável para suportar milhares de utilizadores mensais, com Ruby on Rails, Redis, PostgreSQL, AWS EC2 e AWS S3.',
        ),
        h3('Liderança de Equipa'),
        p(
          'Gestão de uma equipa de cinco programadores mobile e copywriters, supervisionando a contratação e aplicando metodologias Agile com stand-ups diários presenciais, sessões de planeamento, atividades de team-building e coaching em desenvolvimento mobile.',
        ),
        ul([
          'Liderança de uma equipa de cinco — programadores mobile e copywriters',
          'Responsável pela contratação e onboarding',
          'Stand-ups diários presenciais, sessões de planeamento e coaching em desenvolvimento mobile',
          'Atividades de team-building para manter a coesão da equipa',
        ]),
      ]),
    },
  },
};
