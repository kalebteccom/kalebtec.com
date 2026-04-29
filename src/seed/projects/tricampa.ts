import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const tricampa: ProjectSeedData = {
  title: 'Tricampa Smart Parking Platform',
  slug: 'tricampa-smart-parking',
  client: 'Tricampa',
  description:
    'A smart-parking platform that uses geolocation to help drivers find their cars and QR codes to digitize ticketing. We architected the Ruby on Rails + Vue.js stack and shipped a companion Android native app that streams geolocation, prints QR tickets via BLE, and scans QR codes at the gate.',
  industries: ['Smart Cities & Mobility'],
  technologies: ['Ruby on Rails', 'Vue.js', 'Android', 'BLE', 'QR'],
  status: 'draft',
  publishedDate: '2016-07-01T00:00:00.000Z',
  order: 14,
  featuredImageUrl: null,
  featuredImageAlt: 'Tricampa smart parking platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Tricampa is a smart parking solution that uses geolocation and QR codes to help drivers find their cars in parking lots and to manage ticketing digitally. Our team architected and delivered both the web platform and a companion Android native app.',
    ),

    h2('Key Contributions'),

    h3('Web Platform'),
    p(
      'Architected and developed the parking platform using Ruby on Rails and Vue.js, leveraging geolocation information to locate cars in parking lots and implementing QR codes for the ticketing system.',
    ),

    h3('Android Native App'),
    p(
      'Developed an Android native mobile application integrated with the platform to extend the operator workflow into the parking lot itself.',
    ),
    ul([
      'Shared geolocation data to save each car\'s location in the lot',
      'Printed QR codes using BLE devices for on-the-spot ticketing',
      'Scanned QR codes for identification and ticketing purposes',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Estacionamiento Inteligente Tricampa',
      description:
        'Arquitectura y desarrollo de una plataforma de estacionamiento inteligente con Ruby on Rails y Vue.js, aprovechando la geolocalización para localizar coches en estacionamientos y los códigos QR para el sistema de ticketing. Una app Android nativa complementaria compartía datos de geolocalización, imprimía códigos QR mediante BLE y escaneaba códigos QR para el ticketing.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Tricampa es una solución de estacionamiento inteligente que usa geolocalización y códigos QR para ayudar a los conductores a encontrar sus coches en los estacionamientos y gestionar el ticketing de forma digital. Como equipo, diseñamos la arquitectura y entregó tanto la plataforma web como una app Android nativa complementaria.',
        ),
        h2('Contribuciones Clave'),
        h3('Plataforma Web'),
        p(
          'Arquitectura y desarrollo de la plataforma de estacionamiento con Ruby on Rails y Vue.js, aprovechando información de geolocalización para localizar coches en estacionamientos e implementando códigos QR para el sistema de ticketing.',
        ),
        h3('App Nativa Android'),
        p(
          'Desarrollo de una aplicación móvil Android nativa integrada con la plataforma para extender el flujo del operario al propio estacionamiento.',
        ),
        ul([
          'Compartición de datos de geolocalización para guardar la ubicación de cada coche en el estacionamiento',
          'Impresión de códigos QR mediante dispositivos BLE para el ticketing en el momento',
          'Escaneo de códigos QR para identificación y ticketing',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme de Stationnement Intelligent Tricampa',
      description:
        "Architecture et développement d'une plateforme de stationnement intelligent avec Ruby on Rails et Vue.js, utilisant la géolocalisation pour localiser les voitures dans les parkings et les QR codes pour le système de ticketing. Une application Android native complémentaire partageait les données de géolocalisation, imprimait les QR codes via BLE et scannait les QR codes pour le ticketing.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Tricampa est une solution de stationnement intelligent qui utilise la géolocalisation et les QR codes pour aider les conducteurs à retrouver leur voiture dans les parkings et à gérer le ticketing de manière numérique. Notre équipe a conçu l'architecture et livré à la fois la plateforme web et une application Android native complémentaire.",
        ),
        h2('Contributions Clés'),
        h3('Plateforme Web'),
        p(
          'Architecture et développement de la plateforme de stationnement avec Ruby on Rails et Vue.js, utilisant les informations de géolocalisation pour localiser les voitures dans les parkings et mettant en œuvre les QR codes pour le système de ticketing.',
        ),
        h3('Application Android Native'),
        p(
          "Développement d'une application mobile Android native intégrée à la plateforme pour étendre le flux de travail de l'opérateur directement dans le parking.",
        ),
        ul([
          "Partage de données de géolocalisation pour enregistrer l'emplacement de chaque voiture dans le parking",
          "Impression de QR codes via des périphériques BLE pour le ticketing sur place",
          'Scan de QR codes pour identification et ticketing',
        ]),
      ]),
    },
    ca: {
      title: "Plataforma d'Aparcament Intel·ligent Tricampa",
      description:
        "Arquitectura i desenvolupament d'una plataforma d'aparcament intel·ligent amb Ruby on Rails i Vue.js, aprofitant la geolocalització per localitzar cotxes als aparcaments i els codis QR per al sistema de ticketing. Una app Android nativa complementària compartia dades de geolocalització, imprimia codis QR mitjançant BLE i escanejava codis QR per al ticketing.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          "Tricampa és una solució d'aparcament intel·ligent que fa servir la geolocalització i els codis QR per ajudar els conductors a trobar el seu cotxe als aparcaments i gestionar el ticketing de manera digital. Com a equip, vam dissenyar l'arquitectura i va lliurar tant la plataforma web com una app Android nativa complementària.",
        ),
        h2('Contribucions Clau'),
        h3('Plataforma Web'),
        p(
          "Arquitectura i desenvolupament de la plataforma d'aparcament amb Ruby on Rails i Vue.js, aprofitant informació de geolocalització per localitzar cotxes als aparcaments i implementant codis QR per al sistema de ticketing.",
        ),
        h3('App Nativa Android'),
        p(
          "Desenvolupament d'una aplicació mòbil Android nativa integrada amb la plataforma per estendre el flux de l'operari al mateix aparcament.",
        ),
        ul([
          'Compartició de dades de geolocalització per guardar la ubicació de cada cotxe a l\'aparcament',
          'Impressió de codis QR mitjançant dispositius BLE per al ticketing al moment',
          'Escaneig de codis QR per a identificació i ticketing',
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma de Aparcamento Intelixente Tricampa',
      description:
        'Arquitectura e desenvolvemento dunha plataforma de aparcamento intelixente con Ruby on Rails e Vue.js, aproveitando a xeolocalización para localizar coches nos aparcamentos e os códigos QR para o sistema de ticketing. Unha app Android nativa complementaria compartía datos de xeolocalización, imprimía códigos QR mediante BLE e escaneaba códigos QR para o ticketing.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Tricampa é unha solución de aparcamento intelixente que usa xeolocalización e códigos QR para axudar aos condutores a atopar os seus coches nos aparcamentos e xestionar o ticketing de forma dixital. Como equipo, deseñamos a arquitectura e entregou tanto a plataforma web como unha app Android nativa complementaria.',
        ),
        h2('Contribucións Clave'),
        h3('Plataforma Web'),
        p(
          'Arquitectura e desenvolvemento da plataforma de aparcamento con Ruby on Rails e Vue.js, aproveitando información de xeolocalización para localizar coches nos aparcamentos e implementando códigos QR para o sistema de ticketing.',
        ),
        h3('App Nativa Android'),
        p(
          'Desenvolvemento dunha aplicación móbil Android nativa integrada coa plataforma para estender o fluxo do operario ao propio aparcamento.',
        ),
        ul([
          'Compartición de datos de xeolocalización para gardar a localización de cada coche no aparcamento',
          'Impresión de códigos QR mediante dispositivos BLE para o ticketing no momento',
          'Escaneo de códigos QR para identificación e ticketing',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma de Estacionamento Inteligente Tricampa',
      description:
        'Arquitetura e desenvolvimento de uma plataforma de estacionamento inteligente com Ruby on Rails e Vue.js, aproveitando a geolocalização para localizar carros nos parques de estacionamento e os QR codes para o sistema de ticketing. Uma app Android nativa complementar partilhava dados de geolocalização, imprimia QR codes através de BLE e lia QR codes para o ticketing.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'Tricampa é uma solução de estacionamento inteligente que usa geolocalização e QR codes para ajudar os condutores a encontrar os seus carros nos parques e a gerir o ticketing de forma digital. Como equipa, desenhou a arquitetura e entregou tanto a plataforma web como uma app Android nativa complementar.',
        ),
        h2('Contribuições Chave'),
        h3('Plataforma Web'),
        p(
          'Arquitetura e desenvolvimento da plataforma de estacionamento com Ruby on Rails e Vue.js, aproveitando informação de geolocalização para localizar carros nos parques e implementando QR codes para o sistema de ticketing.',
        ),
        h3('App Nativa Android'),
        p(
          'Desenvolvimento de uma aplicação móvel Android nativa integrada com a plataforma para estender o fluxo de trabalho do operador ao próprio parque de estacionamento.',
        ),
        ul([
          'Partilha de dados de geolocalização para guardar a localização de cada carro no parque',
          'Impressão de QR codes através de dispositivos BLE para ticketing no momento',
          'Leitura de QR codes para identificação e ticketing',
        ]),
      ]),
    },
  },
};
