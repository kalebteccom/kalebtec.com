import { buildRichText, h2, h3, p } from '../lexical';
import type { ProjectSeedData } from '../types';

export const palmaAlquileres: ProjectSeedData = {
  title: 'Palma Alquileres Real Estate Platform',
  slug: 'palma-alquileres-real-estate',
  client: 'Palma Alquileres',
  description:
    'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, with Redis for persistence and caching. A sales-focused, client-facing website integrated with the Ruby on Rails API to drive conversions and optimize property listings.',
  industries: ['Real Estate'],
  technologies: ['Ruby on Rails', 'PostgreSQL', 'Redis'],
  status: 'draft',
  publishedDate: '2016-11-01T00:00:00.000Z',
  order: 13,
  featuredImageUrl: null,
  featuredImageAlt: 'Palma Alquileres real estate listings',
  content: buildRichText([
    h2('Overview'),
    p(
      'Palma Alquileres is a real estate company in Colombia. As Web Engineer, Rowin built a performant property listing and sales platform from the ground up, optimizing both the backend for data access patterns and the client-facing website for sales conversion.',
    ),

    h2('Key Contributions'),

    h3('Backend Architecture'),
    p(
      'Architected and developed a high-performance real estate platform using Ruby on Rails and PostgreSQL, utilizing Redis for persistence and caching to optimize the client-facing website.',
    ),

    h3('Sales-Focused Frontend'),
    p(
      'Developed a sales-focused, client-facing website seamlessly integrated with the Ruby on Rails API to enhance user experience and drive property sales.',
    ),
  ]),
  translations: {
    es: {
      title: 'Plataforma Inmobiliaria Palma Alquileres',
      description:
        'Arquitectura y desarrollo de una plataforma inmobiliaria de alto rendimiento con Ruby on Rails y PostgreSQL, usando Redis para persistencia y caching. Un sitio web orientado a ventas integrado con la API de Ruby on Rails para impulsar las conversiones y optimizar los listados de propiedades.',
      content: buildRichText([
        h2('Descripción General'),
        p(
          'Palma Alquileres es una empresa inmobiliaria en Colombia. Como Ingeniero Web, Rowin construyó desde cero una plataforma de listado y venta de propiedades de alto rendimiento, optimizando tanto el backend para los patrones de acceso a datos como el sitio orientado al cliente para la conversión de ventas.',
        ),
        h2('Contribuciones Clave'),
        h3('Arquitectura Backend'),
        p(
          'Arquitectura y desarrollo de una plataforma inmobiliaria de alto rendimiento con Ruby on Rails y PostgreSQL, usando Redis para persistencia y caching para optimizar el sitio orientado al cliente.',
        ),
        h3('Frontend Orientado a Ventas'),
        p(
          'Desarrollo de un sitio web orientado a ventas integrado de forma fluida con la API de Ruby on Rails para mejorar la experiencia de usuario e impulsar las ventas de propiedades.',
        ),
      ]),
    },
    fr: {
      title: 'Plateforme Immobilière Palma Alquileres',
      description:
        "Architecture et développement d'une plateforme immobilière haute performance avec Ruby on Rails et PostgreSQL, utilisant Redis pour la persistance et le caching. Un site web orienté vente intégré à l'API Ruby on Rails pour augmenter les conversions et optimiser les annonces immobilières.",
      content: buildRichText([
        h2("Vue d'ensemble"),
        p(
          "Palma Alquileres est une société immobilière en Colombie. En tant qu'Ingénieur Web, Rowin a construit de zéro une plateforme d'annonces et de vente de biens haute performance, optimisant à la fois le backend pour les schémas d'accès aux données et le site client pour la conversion commerciale.",
        ),
        h2('Contributions Clés'),
        h3('Architecture Backend'),
        p(
          "Architecture et développement d'une plateforme immobilière haute performance avec Ruby on Rails et PostgreSQL, utilisant Redis pour la persistance et le caching afin d'optimiser le site client.",
        ),
        h3('Frontend Orienté Vente'),
        p(
          "Développement d'un site web orienté vente intégré de manière fluide à l'API Ruby on Rails pour améliorer l'expérience utilisateur et stimuler les ventes immobilières.",
        ),
      ]),
    },
    ca: {
      title: 'Plataforma Immobiliària Palma Alquileres',
      description:
        "Arquitectura i desenvolupament d'una plataforma immobiliària d'alt rendiment amb Ruby on Rails i PostgreSQL, usant Redis per a persistència i caching. Un lloc web orientat a vendes integrat amb l'API de Ruby on Rails per impulsar les conversions i optimitzar els llistats de propietats.",
      content: buildRichText([
        h2('Descripció General'),
        p(
          "Palma Alquileres és una empresa immobiliària a Colòmbia. Com a Enginyer Web, Rowin va construir des de zero una plataforma de llistat i venda de propietats d'alt rendiment, optimitzant tant el backend per als patrons d'accés a dades com el lloc orientat al client per a la conversió de vendes.",
        ),
        h2('Contribucions Clau'),
        h3('Arquitectura Backend'),
        p(
          "Arquitectura i desenvolupament d'una plataforma immobiliària d'alt rendiment amb Ruby on Rails i PostgreSQL, usant Redis per a persistència i caching per optimitzar el lloc orientat al client.",
        ),
        h3('Frontend Orientat a Vendes'),
        p(
          "Desenvolupament d'un lloc web orientat a vendes integrat de forma fluida amb l'API de Ruby on Rails per millorar l'experiència d'usuari i impulsar les vendes de propietats.",
        ),
      ]),
    },
    gl: {
      title: 'Plataforma Inmobiliaria Palma Alquileres',
      description:
        'Arquitectura e desenvolvemento dunha plataforma inmobiliaria de alto rendemento con Ruby on Rails e PostgreSQL, usando Redis para persistencia e caching. Un sitio web orientado a vendas integrado coa API de Ruby on Rails para impulsar as conversións e optimizar os listados de propiedades.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p(
          'Palma Alquileres é unha empresa inmobiliaria en Colombia. Como Enxeñeiro Web, Rowin construíu dende cero unha plataforma de listado e venda de propiedades de alto rendemento, optimizando tanto o backend para os patróns de acceso a datos como o sitio orientado ao cliente para a conversión de vendas.',
        ),
        h2('Contribucións Clave'),
        h3('Arquitectura Backend'),
        p(
          'Arquitectura e desenvolvemento dunha plataforma inmobiliaria de alto rendemento con Ruby on Rails e PostgreSQL, usando Redis para persistencia e caching para optimizar o sitio orientado ao cliente.',
        ),
        h3('Frontend Orientado a Vendas'),
        p(
          'Desenvolvemento dun sitio web orientado a vendas integrado de forma fluída coa API de Ruby on Rails para mellorar a experiencia de usuario e impulsar as vendas de propiedades.',
        ),
      ]),
    },
    pt: {
      title: 'Plataforma Imobiliária Palma Alquileres',
      description:
        'Arquitetura e desenvolvimento de uma plataforma imobiliária de alto desempenho com Ruby on Rails e PostgreSQL, usando Redis para persistência e caching. Um site orientado a vendas integrado com a API Ruby on Rails para impulsionar as conversões e otimizar os anúncios de imóveis.',
      content: buildRichText([
        h2('Visão Geral'),
        p(
          'Palma Alquileres é uma empresa imobiliária na Colômbia. Como Engenheiro Web, Rowin construiu de raiz uma plataforma de listagem e venda de imóveis de alto desempenho, otimizando tanto o backend para os padrões de acesso a dados como o site orientado ao cliente para a conversão de vendas.',
        ),
        h2('Contribuições Chave'),
        h3('Arquitetura Backend'),
        p(
          'Arquitetura e desenvolvimento de uma plataforma imobiliária de alto desempenho com Ruby on Rails e PostgreSQL, usando Redis para persistência e caching para otimizar o site orientado ao cliente.',
        ),
        h3('Frontend Orientado a Vendas'),
        p(
          'Desenvolvimento de um site orientado a vendas integrado de forma fluida com a API Ruby on Rails para melhorar a experiência do utilizador e impulsionar as vendas de imóveis.',
        ),
      ]),
    },
  },
};
