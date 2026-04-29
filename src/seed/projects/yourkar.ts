import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const yourkar: ProjectSeedData = {
  title: 'Yourkar Car Rental Platform',
  slug: 'yourkar-car-rental-platform',
  client: 'Yourkar',
  description:
    'Architected and developed a rent-a-car broker platform for the Canary Islands, combining a Vue.js web application with real-time WebSockets for contract, booking, and fleet management. A companion Android native app extended the platform into rental branches, enabling document printing through BLE devices.',
  industries: ['Automotive & Fleet', 'SaaS'],
  technologies: ['Vue.js', 'WebSockets', 'Android', 'BLE'],
  status: 'draft',
  publishedDate: '2017-09-01T00:00:00.000Z',
  order: 12,
  featuredImageUrl: null,
  featuredImageAlt: 'Yourkar car rental management platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Yourkar is a rent-a-car broker operating in the Canary Islands. As Software Engineer, Rowin architected, led, and delivered both the web platform and a companion Android native app to streamline fleet operations, contracts, and bookings across partner rental companies.',
    ),

    h2('Key Contributions'),

    h3('Web Platform'),
    p(
      'Architected and developed a comprehensive website using Vue.js and WebSockets to enhance the management of contracts, agreements, and fleet operations for the rent-a-car broker, with real-time updates across rental branches.',
    ),

    h3('Android Native App'),
    p(
      "Developed an Android native mobile application integrated with Yourkar's platform, enabling rent-a-car companies to manage contracts, handle bookings, and print documents on the spot using BLE devices.",
    ),
    ul([
      'Contract and agreement management from the rental desk',
      'Booking handling synchronized with the web platform',
      'Document printing via BLE-connected printers',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Alquiler de Coches Yourkar',
      description:
        'Arquitectura y desarrollo de una plataforma de rent-a-car broker para las Islas Canarias, combinando una aplicación web en Vue.js con WebSockets en tiempo real para la gestión de contratos, reservas y flota. Una app Android nativa complementaria extendió la plataforma a las oficinas de alquiler, permitiendo la impresión de documentos mediante dispositivos BLE.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Yourkar es un rent-a-car broker que opera en las Islas Canarias. Como Ingeniero de Software, Rowin lideró la arquitectura y el desarrollo tanto de la plataforma web como de una app Android nativa complementaria, para optimizar las operaciones de flota, los contratos y las reservas entre las empresas de alquiler asociadas.',
        ),
        h2('Contribuciones Clave'),
        h3('Plataforma Web'),
        p(
          'Arquitectura y desarrollo de un sitio web integral con Vue.js y WebSockets para mejorar la gestión de contratos, acuerdos y operaciones de flota del rent-a-car broker, con actualizaciones en tiempo real entre las distintas oficinas de alquiler.',
        ),
        h3('App Nativa Android'),
        p(
          'Desarrollo de una aplicación móvil Android nativa integrada con la plataforma de Yourkar, que permite a las empresas de alquiler gestionar contratos, gestionar reservas e imprimir documentos en el mostrador mediante dispositivos BLE.',
        ),
        ul([
          'Gestión de contratos y acuerdos desde el mostrador de alquiler',
          'Gestión de reservas sincronizada con la plataforma web',
          'Impresión de documentos mediante impresoras conectadas por BLE',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme de Location de Voitures Yourkar',
      description:
        "Architecture et développement d'une plateforme de rent-a-car broker pour les îles Canaries, combinant une application web Vue.js avec des WebSockets en temps réel pour la gestion des contrats, des réservations et de la flotte. Une application Android native complémentaire a étendu la plateforme aux agences de location, permettant l'impression de documents via des périphériques BLE.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Yourkar est un rent-a-car broker opérant dans les îles Canaries. En tant qu'Ingénieur Logiciel, Rowin a conçu, dirigé et livré à la fois la plateforme web et une application Android native complémentaire afin de rationaliser les opérations de flotte, les contrats et les réservations entre les sociétés de location partenaires.",
        ),
        h2('Contributions Clés'),
        h3('Plateforme Web'),
        p(
          "Architecture et développement d'un site web complet en Vue.js et WebSockets pour améliorer la gestion des contrats, des accords et des opérations de flotte du rent-a-car broker, avec des mises à jour en temps réel entre les différentes agences de location.",
        ),
        h3('Application Android Native'),
        p(
          "Développement d'une application mobile Android native intégrée à la plateforme Yourkar, permettant aux sociétés de location de gérer les contrats, de traiter les réservations et d'imprimer les documents directement au comptoir à l'aide de périphériques BLE.",
        ),
        ul([
          'Gestion des contrats et accords depuis le comptoir de location',
          'Traitement des réservations synchronisé avec la plateforme web',
          'Impression de documents via des imprimantes connectées en BLE',
        ]),
      ]),
    },
    ca: {
      title: "Plataforma de Lloguer de Cotxes Yourkar",
      description:
        "Arquitectura i desenvolupament d'una plataforma de rent-a-car broker per a les Illes Canàries, combinant una aplicació web en Vue.js amb WebSockets en temps real per a la gestió de contractes, reserves i flota. Una app Android nativa complementària va estendre la plataforma a les oficines de lloguer, permetent la impressió de documents mitjançant dispositius BLE.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          'Yourkar és un rent-a-car broker que opera a les Illes Canàries. Com a Enginyer de Software, Rowin va liderar l\'arquitectura i el desenvolupament tant de la plataforma web com d\'una app Android nativa complementària, per optimitzar les operacions de flota, els contractes i les reserves entre les empreses de lloguer associades.',
        ),
        h2('Contribucions Clau'),
        h3('Plataforma Web'),
        p(
          "Arquitectura i desenvolupament d'un lloc web integral amb Vue.js i WebSockets per millorar la gestió de contractes, acords i operacions de flota del rent-a-car broker, amb actualitzacions en temps real entre les diferents oficines de lloguer.",
        ),
        h3('App Nativa Android'),
        p(
          "Desenvolupament d'una aplicació mòbil Android nativa integrada amb la plataforma de Yourkar, que permet a les empreses de lloguer gestionar contractes, gestionar reserves i imprimir documents al mostrador mitjançant dispositius BLE.",
        ),
        ul([
          'Gestió de contractes i acords des del mostrador de lloguer',
          'Gestió de reserves sincronitzada amb la plataforma web',
          'Impressió de documents mitjançant impressores connectades per BLE',
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma de Aluguer de Coches Yourkar',
      description:
        'Arquitectura e desenvolvemento dunha plataforma de rent-a-car broker para as Illas Canarias, combinando unha aplicación web en Vue.js con WebSockets en tempo real para a xestión de contratos, reservas e frota. Unha app Android nativa complementaria estendeu a plataforma ás oficinas de aluguer, permitindo a impresión de documentos mediante dispositivos BLE.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Yourkar é un rent-a-car broker que opera nas Illas Canarias. Como Enxeñeiro de Software, Rowin liderou a arquitectura e o desenvolvemento tanto da plataforma web como dunha app Android nativa complementaria, para optimizar as operacións de frota, os contratos e as reservas entre as empresas de aluguer asociadas.',
        ),
        h2('Contribucións Clave'),
        h3('Plataforma Web'),
        p(
          'Arquitectura e desenvolvemento dun sitio web integral con Vue.js e WebSockets para mellorar a xestión de contratos, acordos e operacións de frota do rent-a-car broker, con actualizacións en tempo real entre as distintas oficinas de aluguer.',
        ),
        h3('App Nativa Android'),
        p(
          'Desenvolvemento dunha aplicación móbil Android nativa integrada coa plataforma de Yourkar, que permite ás empresas de aluguer xestionar contratos, xestionar reservas e imprimir documentos no mostrador mediante dispositivos BLE.',
        ),
        ul([
          'Xestión de contratos e acordos dende o mostrador de aluguer',
          'Xestión de reservas sincronizada coa plataforma web',
          'Impresión de documentos mediante impresoras conectadas por BLE',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma de Aluguer de Carros Yourkar',
      description:
        'Arquitetura e desenvolvimento de uma plataforma de rent-a-car broker para as Ilhas Canárias, combinando uma aplicação web em Vue.js com WebSockets em tempo real para a gestão de contratos, reservas e frota. Uma app Android nativa complementar estendeu a plataforma aos balcões de aluguer, permitindo a impressão de documentos através de dispositivos BLE.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'Yourkar é um rent-a-car broker que opera nas Ilhas Canárias. Como Engenheiro de Software, Rowin liderou a arquitetura e o desenvolvimento tanto da plataforma web como de uma app Android nativa complementar, para otimizar as operações de frota, os contratos e as reservas entre as empresas de aluguer parceiras.',
        ),
        h2('Contribuições Chave'),
        h3('Plataforma Web'),
        p(
          'Arquitetura e desenvolvimento de um site integral com Vue.js e WebSockets para melhorar a gestão de contratos, acordos e operações de frota do rent-a-car broker, com atualizações em tempo real entre os vários balcões de aluguer.',
        ),
        h3('App Nativa Android'),
        p(
          'Desenvolvimento de uma aplicação móvel Android nativa integrada com a plataforma da Yourkar, permitindo às empresas de aluguer gerir contratos, tratar de reservas e imprimir documentos no balcão através de dispositivos BLE.',
        ),
        ul([
          'Gestão de contratos e acordos a partir do balcão de aluguer',
          'Gestão de reservas sincronizada com a plataforma web',
          'Impressão de documentos através de impressoras ligadas por BLE',
        ]),
      ]),
    },
  },
};
