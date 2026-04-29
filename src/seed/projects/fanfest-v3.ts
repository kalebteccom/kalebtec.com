import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const fanfestV3: ProjectSeedData = {
  title: 'FanFest 3.0 Platform',
  slug: 'fanfest-v3-platform',
  client: 'FanFest',
  description:
    "A real-time fan engagement platform serving Paris Saint-Germain FC, Comcast, the Premier League, and Real Madrid. Our team architected v3.0 from the ground up — leading six engineers to ship AI-powered moderation, Chiliz wallet gating, Low Latency HLS live streaming, and WebRTC live shows on AWS Chime Web SDK.",
  industries: ['Sports & Entertainment', 'Streaming & Media'],
  technologies: [
    'TypeScript',
    'Vue.js',
    'Node.js',
    'WebSockets',
    'AWS Chime SDK',
    'AWS Elemental',
    'OpenAI',
    'Viem',
    'WalletConnect',
  ],
  status: 'published',
  publishedDate: '2024-06-01T00:00:00.000Z',
  order: 1,
  featuredImageUrl: 'fanfest-v3.png',
  featuredImageAlt: 'FanFest 3.0 platform — Off The Pitch live show with leaderboard and real-time chat',
  content: buildRichText([
    h2('Overview'),
    p(
      "FanFest is a real-time fan engagement platform that connects sports fans with live events, interactive shows, and exclusive content from the world's biggest sports organizations.",
    ),
    p(
      'Our team planned and architected the roadmap for version 3.0, meeting technical requirements from business partners including Paris Saint-Germain FC, Comcast, the Premier League, and Real Madrid.',
    ),

    h2('Key Contributions'),

    h3('AI-Powered Content Moderation'),
    p(
      'Developed AI-based moderation and translation pipelines for user-authored content across real-time event live chats and static content, using OpenAI and a queue management system with real-time updates via WebSockets on targeted channels.',
    ),

    h3('Crypto Wallet Integration'),
    p(
      "Integrated Chiliz crypto-wallets into the platform's identity and gating mechanisms using Viem, Reown's WalletConnect, and AppKit — enabling token-gated access to exclusive fan experiences.",
    ),

    h3('Live Streaming Infrastructure'),
    p(
      'Developed a media pipeline distribution system to manage live-streaming capabilities for fans, integrating with AWS Elemental Media Services to support Low Latency HLS delivery.',
    ),

    h3('Identity & Access Architecture'),
    p(
      'Designed a layered identity system for seamless authentication and membership management (RBAC), integrating with partners to allow users to share a single profile and merge external profiles across different channels (tenants).',
    ),

    h3('Real-Time Communication'),
    p(
      "Architected the app's layered service architecture, including tracking, live-show tile coordination, real-time communication, and WebRTC capabilities using AWS Chime Web SDK.",
    ),

    h2('Team Leadership'),
    ul([
      'Led a team of six engineers using Agile practices',
      'Designed the technical hiring process and conducted interviews',
      'Established coding standards and code review workflows',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma FanFest 3.0',
      description:
        'Planificación y arquitectura de la versión 3.0 de la plataforma FanFest como Ingeniero de Software Principal — un sistema de engagement de fans en tiempo real para Paris Saint-Germain FC, Comcast, la Premier League y el Real Madrid. Liderazgo de un equipo de seis ingenieros y entrega de moderación con IA, gating con wallets de Chiliz, streaming en directo Low Latency HLS y shows con WebRTC sobre AWS Chime Web SDK.',
      content: buildRichText([
        h2('Descripción General'),
        p('FanFest es una plataforma de engagement de fans en tiempo real que conecta a los aficionados deportivos con eventos en directo, shows interactivos y contenido exclusivo de las mayores organizaciones deportivas del mundo.'),
        p('Como equipo, planificamos y diseñamos la hoja de ruta para la versión 3.0, cumpliendo los requisitos técnicos de socios comerciales como Paris Saint-Germain FC, Comcast, la Premier League y el Real Madrid.'),
        h2('Contribuciones Clave'),
        h3('Moderación de Contenido con IA'),
        p('Desarrollo de pipelines de moderación y traducción basados en IA para contenido generado por usuarios en chats en directo y contenido estático, utilizando OpenAI y un sistema de gestión de colas con actualizaciones en tiempo real via WebSockets en canales específicos.'),
        h3('Integración de Wallets Crypto'),
        p('Integración de crypto-wallets de Chiliz en los mecanismos de identidad y acceso de la plataforma usando Viem, WalletConnect de Reown y AppKit — habilitando acceso con tokens a experiencias exclusivas para fans.'),
        h3('Infraestructura de Streaming en Directo'),
        p('Desarrollo de un sistema de distribución de pipelines de medios para gestionar capacidades de streaming en directo, integrándose con AWS Elemental Media Services para soportar entrega Low Latency HLS.'),
        h3('Arquitectura de Identidad y Acceso'),
        p('Diseño de un sistema de identidad por capas para autenticación y gestión de membresías (RBAC), integrándose con socios para permitir a los usuarios compartir un único perfil y fusionar perfiles externos entre diferentes canales (tenants).'),
        h3('Comunicación en Tiempo Real'),
        p('Arquitectura de la estructura de servicios por capas de la aplicación, incluyendo tracking, coordinación de tiles de shows en directo, comunicación en tiempo real y capacidades WebRTC usando AWS Chime Web SDK.'),
        h2('Liderazgo de Equipo'),
        ul([
          'Liderazgo de un equipo de seis ingenieros usando prácticas Agile',
          'Diseño del proceso de contratación técnica y realización de entrevistas',
          'Establecimiento de estándares de código y flujos de revisión de código',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme FanFest 3.0',
      description:
        "Planification et architecture de la version 3.0 de la plateforme FanFest en tant qu'Ingénieur Logiciel Principal — un système d'engagement des fans en temps réel pour le Paris Saint-Germain FC, Comcast, la Premier League et le Real Madrid. Direction d'une équipe de six ingénieurs et livraison de la modération par IA, du gating via wallets Chiliz, du streaming en direct Low Latency HLS et des shows WebRTC sur AWS Chime Web SDK.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("FanFest est une plateforme d'engagement des fans en temps réel qui connecte les supporters sportifs aux événements en direct, aux shows interactifs et au contenu exclusif des plus grandes organisations sportives mondiales."),
        p("Notre équipe a planifié et conçu la feuille de route de la version 3.0, répondant aux exigences techniques de partenaires commerciaux comme le Paris Saint-Germain FC, Comcast, la Premier League et le Real Madrid."),
        h2('Contributions Clés'),
        h3('Modération de Contenu par IA'),
        p("Développement de pipelines de modération et de traduction basés sur l'IA pour le contenu généré par les utilisateurs dans les chats en direct et le contenu statique, utilisant OpenAI et un système de gestion de files d'attente avec des mises à jour en temps réel via WebSockets."),
        h3('Intégration de Portefeuilles Crypto'),
        p("Intégration des crypto-wallets Chiliz dans les mécanismes d'identité et d'accès de la plateforme en utilisant Viem, WalletConnect de Reown et AppKit — permettant l'accès par tokens à des expériences exclusives pour les fans."),
        h3('Infrastructure de Streaming en Direct'),
        p("Développement d'un système de distribution de pipelines média pour gérer les capacités de streaming en direct, s'intégrant avec AWS Elemental Media Services pour prendre en charge la diffusion Low Latency HLS."),
        h3('Architecture d\'Identité et d\'Accès'),
        p("Conception d'un système d'identité multicouche pour l'authentification et la gestion des adhésions (RBAC), s'intégrant avec les partenaires pour permettre aux utilisateurs de partager un profil unique et fusionner des profils externes entre différents canaux (tenants)."),
        h3('Communication en Temps Réel'),
        p("Architecture de la structure de services multicouche de l'application, incluant le suivi, la coordination des tuiles de shows en direct, la communication en temps réel et les capacités WebRTC utilisant AWS Chime Web SDK."),
        h2('Leadership d\'Équipe'),
        ul([
          "Direction d'une équipe de six ingénieurs avec des pratiques Agile",
          "Conception du processus de recrutement technique et conduite d'entretiens",
          'Établissement de standards de code et de workflows de revue de code',
        ]),
      ]),
    },
    ca: {
      title: 'Plataforma FanFest 3.0',
      description:
        "Planificació i arquitectura de la versió 3.0 de la plataforma FanFest com a Enginyer de Software Principal — un sistema d'engagement de fans en temps real per al Paris Saint-Germain FC, Comcast, la Premier League i el Real Madrid. Lideratge d'un equip de sis enginyers i entrega de moderació amb IA, gating amb wallets de Chiliz, streaming en directe Low Latency HLS i shows amb WebRTC sobre AWS Chime Web SDK.",
      content: buildRichText([
        h2('Descripció General'),
        p("FanFest és una plataforma d'engagement de fans en temps real que connecta els aficionats esportius amb esdeveniments en directe, shows interactius i contingut exclusiu de les organitzacions esportives més grans del món."),
        p("Com a equip, vam planificar i dissenyar el full de ruta per a la versió 3.0, complint els requisits tècnics de socis comercials com el Paris Saint-Germain FC, Comcast, la Premier League i el Real Madrid."),
        h2('Contribucions Clau'),
        h3('Moderació de Contingut amb IA'),
        p("Desenvolupament de pipelines de moderació i traducció basats en IA per a contingut generat per usuaris en xats en directe i contingut estàtic, utilitzant OpenAI i un sistema de gestió de cues amb actualitzacions en temps real via WebSockets."),
        h3('Integració de Wallets Crypto'),
        p("Integració de crypto-wallets de Chiliz en els mecanismes d'identitat i accés de la plataforma usant Viem, WalletConnect de Reown i AppKit — habilitant accés amb tokens a experiències exclusives per a fans."),
        h3('Infraestructura de Streaming en Directe'),
        p("Desenvolupament d'un sistema de distribució de pipelines de mitjans per gestionar capacitats de streaming en directe, integrant-se amb AWS Elemental Media Services per suportar lliurament Low Latency HLS."),
        h3("Arquitectura d'Identitat i Accés"),
        p("Disseny d'un sistema d'identitat per capes per a autenticació i gestió de membresies (RBAC), integrant-se amb socis per permetre als usuaris compartir un únic perfil i fusionar perfils externs entre diferents canals (tenants)."),
        h3('Comunicació en Temps Real'),
        p("Arquitectura de l'estructura de serveis per capes de l'aplicació, incloent tracking, coordinació de tiles de shows en directe, comunicació en temps real i capacitats WebRTC usant AWS Chime Web SDK."),
        h2("Lideratge d'Equip"),
        ul([
          "Lideratge d'un equip de sis enginyers usant pràctiques Agile",
          "Disseny del procés de contractació tècnica i realització d'entrevistes",
          "Establiment d'estàndards de codi i fluxos de revisió de codi",
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma FanFest 3.0',
      description:
        'Planificación e arquitectura da versión 3.0 da plataforma FanFest como Enxeñeiro de Software Principal — un sistema de engagement de fans en tempo real para o Paris Saint-Germain FC, Comcast, a Premier League e o Real Madrid. Liderado dun equipo de seis enxeñeiros e entrega de moderación con IA, gating con wallets de Chiliz, streaming en directo Low Latency HLS e shows con WebRTC sobre AWS Chime Web SDK.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('FanFest é unha plataforma de engagement de fans en tempo real que conecta os afeccionados deportivos con eventos en directo, shows interactivos e contido exclusivo das maiores organizacións deportivas do mundo.'),
        p('Como equipo, planificamos e deseñamos a folla de ruta para a versión 3.0, cumprindo os requisitos técnicos de socios comerciais como o Paris Saint-Germain FC, Comcast, a Premier League e o Real Madrid.'),
        h2('Contribucións Clave'),
        h3('Moderación de Contido con IA'),
        p('Desenvolvemento de pipelines de moderación e tradución baseados en IA para contido xerado por usuarios en chats en directo e contido estático, utilizando OpenAI e un sistema de xestión de colas con actualizacións en tempo real via WebSockets.'),
        h3('Integración de Wallets Crypto'),
        p('Integración de crypto-wallets de Chiliz nos mecanismos de identidade e acceso da plataforma usando Viem, WalletConnect de Reown e AppKit — habilitando acceso con tokens a experiencias exclusivas para fans.'),
        h3('Infraestrutura de Streaming en Directo'),
        p('Desenvolvemento dun sistema de distribución de pipelines de medios para xestionar capacidades de streaming en directo, integrándose con AWS Elemental Media Services para soportar entrega Low Latency HLS.'),
        h3('Arquitectura de Identidade e Acceso'),
        p('Deseño dun sistema de identidade por capas para autenticación e xestión de membresías (RBAC), integrándose con socios para permitir aos usuarios compartir un único perfil e fusionar perfís externos entre diferentes canais (tenants).'),
        h3('Comunicación en Tempo Real'),
        p('Arquitectura da estrutura de servizos por capas da aplicación, incluíndo tracking, coordinación de tiles de shows en directo, comunicación en tempo real e capacidades WebRTC usando AWS Chime Web SDK.'),
        h2('Liderado de Equipo'),
        ul([
          'Liderado dun equipo de seis enxeñeiros usando prácticas Agile',
          'Deseño do proceso de contratación técnica e realización de entrevistas',
          'Establecemento de estándares de código e fluxos de revisión de código',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma FanFest 3.0',
      description:
        'Planeamento e arquitetura da versão 3.0 da plataforma FanFest como Engenheiro de Software Principal — um sistema de engagement de fãs em tempo real para o Paris Saint-Germain FC, Comcast, a Premier League e o Real Madrid. Liderança de uma equipa de seis engenheiros e entrega de moderação com IA, gating com wallets da Chiliz, streaming ao vivo Low Latency HLS e shows com WebRTC sobre AWS Chime Web SDK.',
      content: buildRichText([
        h2('Visão Geral'),
        p('FanFest é uma plataforma de engagement de fãs em tempo real que conecta adeptos desportivos a eventos ao vivo, shows interativos e conteúdo exclusivo das maiores organizações desportivas do mundo.'),
        p('Como equipa, planeámos e arquitetámos o roadmap para a versão 3.0, cumprindo os requisitos técnicos de parceiros comerciais como o Paris Saint-Germain FC, Comcast, a Premier League e o Real Madrid.'),
        h2('Contribuições Chave'),
        h3('Moderação de Conteúdo com IA'),
        p('Desenvolvimento de pipelines de moderação e tradução baseados em IA para conteúdo gerado por utilizadores em chats ao vivo e conteúdo estático, utilizando OpenAI e um sistema de gestão de filas com atualizações em tempo real via WebSockets.'),
        h3('Integração de Wallets Crypto'),
        p('Integração de crypto-wallets da Chiliz nos mecanismos de identidade e acesso da plataforma usando Viem, WalletConnect da Reown e AppKit — habilitando acesso com tokens a experiências exclusivas para fãs.'),
        h3('Infraestrutura de Streaming ao Vivo'),
        p('Desenvolvimento de um sistema de distribuição de pipelines de média para gerir capacidades de streaming ao vivo, integrando com AWS Elemental Media Services para suportar entrega Low Latency HLS.'),
        h3('Arquitetura de Identidade e Acesso'),
        p('Desenho de um sistema de identidade em camadas para autenticação e gestão de membros (RBAC), integrando com parceiros para permitir aos utilizadores partilhar um único perfil e fundir perfis externos entre diferentes canais (tenants).'),
        h3('Comunicação em Tempo Real'),
        p('Arquitetura da estrutura de serviços em camadas da aplicação, incluindo tracking, coordenação de tiles de shows ao vivo, comunicação em tempo real e capacidades WebRTC usando AWS Chime Web SDK.'),
        h2('Liderança de Equipa'),
        ul([
          'Liderança de uma equipa de seis engenheiros usando práticas Agile',
          'Desenho do processo de contratação técnica e condução de entrevistas',
          'Estabelecimento de padrões de código e fluxos de revisão de código',
        ]),
      ]),
    },
  },
};
