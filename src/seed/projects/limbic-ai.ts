import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const limbicAi: ProjectSeedData = {
  title: 'Limbic AI Therapy Platform',
  slug: 'limbic-ai-therapy-platform',
  client: 'Limbic AI',
  description:
    'Contributed to a complex chatbot platform that improves mental health screening times in the UK. Designed time-traveling conversation features, emergency service notification queues, and automated test suites for chat branches.',
  industries: ['Healthcare & MedTech', 'AI & Machine Learning'],
  technologies: ['Node.js', 'React.js', 'TypeScript'],
  status: 'draft',
  publishedDate: '2024-01-01T00:00:00.000Z',
  order: 3,
  featuredImageUrl:
    'https://cdn.prod.website-files.com/667422dda15ffb3c3198a488/66bdb759417f66a31d340340_limbic-conversation.webp',
  featuredImageAlt: 'Limbic AI therapy chatbot conversation interface',
  content: buildRichText([
    h2('Overview'),
    p(
      "Limbic AI builds clinically validated AI tools that help mental health services in the UK's NHS reduce screening times and connect patients to therapy faster. The platform serves hundreds of thousands of patients across the country.",
    ),

    h2('Key Contributions'),

    h3('Time-Traveling Conversation Engine'),
    p(
      'Designed time-traveling features for the chatbot to allow users to edit their answers and return to the happy path — involving rollbacks of side-effects like UK emergency services de-alerting and overall system state management.',
    ),

    h3('Emergency Services Notification Queue'),
    p(
      'Implemented a queuing system with retries for emergency services notifications to ensure critical patients always received the care they needed, with guaranteed delivery and audit trails.',
    ),

    h3('Automated Conversation Testing'),
    p(
      'Designed and developed automated test cases for different chat conversation branches to ensure optimal quality UX across hundreds of possible patient pathways.',
    ),

    h3('Healthcare Integrations'),
    ul([
      'Integrated with UK healthcare management tools for seamless B2B customer experience',
      'Ensured compliance with NHS data handling and patient privacy standards',
      "Integrated Limbic's tools into existing care suites used by NHS providers",
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Terapia Limbic AI',
      description:
        'Herramientas de IA clínicamente validadas que ayudan a los servicios de salud mental del NHS del Reino Unido a reducir los tiempos de cribado y conectar a los pacientes con la terapia más rápidamente.',
      content: buildRichText([
        h2('Descripción General'),
        p('Limbic AI desarrolla herramientas de IA clínicamente validadas que ayudan a los servicios de salud mental del NHS del Reino Unido a reducir los tiempos de cribado y conectar a los pacientes con la terapia más rápidamente. La plataforma atiende a cientos de miles de pacientes en todo el país.'),
        h2('Contribuciones Clave'),
        h3('Motor de Conversación con Viaje en el Tiempo'),
        p('Diseño de funcionalidades de viaje en el tiempo para el chatbot que permiten a los usuarios editar sus respuestas y volver al camino óptimo — involucrando rollbacks de efectos secundarios como la desalerta de servicios de emergencia del Reino Unido y la gestión del estado general del sistema.'),
        h3('Cola de Notificaciones a Servicios de Emergencia'),
        p('Implementación de un sistema de colas con reintentos para notificaciones a servicios de emergencia, asegurando que los pacientes críticos siempre recibieran la atención necesaria, con entrega garantizada y registros de auditoría.'),
        h3('Pruebas Automatizadas de Conversaciones'),
        p('Diseño y desarrollo de casos de prueba automatizados para diferentes ramas de conversación del chat, asegurando una calidad óptima de UX a través de cientos de posibles recorridos de pacientes.'),
        h3('Integraciones Sanitarias'),
        ul([
          'Integración con herramientas de gestión sanitaria del Reino Unido para una experiencia B2B fluida',
          'Cumplimiento con los estándares de manejo de datos y privacidad de pacientes del NHS',
          'Integración de las herramientas de Limbic en los sistemas de atención existentes utilizados por proveedores del NHS',
        ]),
      ]),
    },
    fr: {
      title: 'Plateforme de Thérapie Limbic AI',
      description:
        "Outils d'IA cliniquement validés aidant les services de santé mentale du NHS britannique à réduire les temps de dépistage et à connecter les patients à la thérapie plus rapidement.",
      content: buildRichText([
        h2('Vue d\'ensemble'),
        p("Limbic AI développe des outils d'IA cliniquement validés qui aident les services de santé mentale du NHS britannique à réduire les temps de dépistage et à connecter les patients à la thérapie plus rapidement. La plateforme dessert des centaines de milliers de patients à travers le pays."),
        h2('Contributions Clés'),
        h3('Moteur de Conversation avec Voyage dans le Temps'),
        p("Conception de fonctionnalités de voyage dans le temps pour le chatbot permettant aux utilisateurs de modifier leurs réponses et de revenir au parcours optimal — impliquant des rollbacks d'effets secondaires comme la désalerte des services d'urgence britanniques et la gestion de l'état global du système."),
        h3("File d'Attente de Notifications aux Services d'Urgence"),
        p("Implémentation d'un système de files d'attente avec réessais pour les notifications aux services d'urgence, garantissant que les patients critiques reçoivent toujours les soins nécessaires, avec livraison garantie et pistes d'audit."),
        h3('Tests Automatisés de Conversations'),
        p("Conception et développement de cas de tests automatisés pour différentes branches de conversation du chat, assurant une qualité UX optimale à travers des centaines de parcours patients possibles."),
        h3('Intégrations Santé'),
        ul([
          "Intégration avec les outils de gestion sanitaire du Royaume-Uni pour une expérience B2B fluide",
          'Conformité aux normes de traitement des données et de confidentialité des patients du NHS',
          "Intégration des outils de Limbic dans les suites de soins existantes utilisées par les prestataires du NHS",
        ]),
      ]),
    },
    ca: {
      title: 'Plataforma de Teràpia Limbic AI',
      description:
        "Eines d'IA clínicament validades que ajuden els serveis de salut mental del NHS del Regne Unit a reduir els temps de cribratge i connectar els pacients amb la teràpia més ràpidament.",
      content: buildRichText([
        h2('Descripció General'),
        p("Limbic AI desenvolupa eines d'IA clínicament validades que ajuden els serveis de salut mental del NHS del Regne Unit a reduir els temps de cribratge i connectar els pacients amb la teràpia més ràpidament. La plataforma atén centenars de milers de pacients a tot el país."),
        h2('Contribucions Clau'),
        h3('Motor de Conversa amb Viatge en el Temps'),
        p("Disseny de funcionalitats de viatge en el temps per al chatbot que permeten als usuaris editar les seves respostes i tornar al camí òptim — involucrant rollbacks d'efectes secundaris com la desalerta de serveis d'emergència del Regne Unit i la gestió de l'estat general del sistema."),
        h3("Cua de Notificacions a Serveis d'Emergència"),
        p("Implementació d'un sistema de cues amb reintents per a notificacions a serveis d'emergència, assegurant que els pacients crítics sempre rebessin l'atenció necessària, amb lliurament garantit i registres d'auditoria."),
        h3('Proves Automatitzades de Converses'),
        p("Disseny i desenvolupament de casos de prova automatitzats per a diferents branques de conversa del xat, assegurant una qualitat òptima d'UX a través de centenars de possibles recorreguts de pacients."),
        h3('Integracions Sanitàries'),
        ul([
          "Integració amb eines de gestió sanitària del Regne Unit per a una experiència B2B fluida",
          'Compliment amb els estàndards de maneig de dades i privacitat de pacients del NHS',
          "Integració de les eines de Limbic en els sistemes d'atenció existents utilitzats per proveïdors del NHS",
        ]),
      ]),
    },
    gl: {
      title: 'Plataforma de Terapia Limbic AI',
      description:
        'Ferramentas de IA clinicamente validadas que axudan os servizos de saúde mental do NHS do Reino Unido a reducir os tempos de cribado e conectar os pacientes coa terapia máis rapidamente.',
      content: buildRichText([
        h2('Descrición Xeral'),
        p('Limbic AI desenvolve ferramentas de IA clinicamente validadas que axudan os servizos de saúde mental do NHS do Reino Unido a reducir os tempos de cribado e conectar os pacientes coa terapia máis rapidamente. A plataforma atende a centos de miles de pacientes en todo o país.'),
        h2('Contribucións Clave'),
        h3('Motor de Conversa con Viaxe no Tempo'),
        p('Deseño de funcionalidades de viaxe no tempo para o chatbot que permiten aos usuarios editar as súas respostas e volver ao camiño óptimo — involucrando rollbacks de efectos secundarios como a desalerta de servizos de emerxencia do Reino Unido e a xestión do estado xeral do sistema.'),
        h3('Cola de Notificacións a Servizos de Emerxencia'),
        p('Implementación dun sistema de colas con reintentos para notificacións a servizos de emerxencia, asegurando que os pacientes críticos sempre recibiran a atención necesaria, con entrega garantida e rexistros de auditoría.'),
        h3('Probas Automatizadas de Conversas'),
        p('Deseño e desenvolvemento de casos de proba automatizados para diferentes ramas de conversa do chat, asegurando unha calidade óptima de UX a través de centos de posibles percorridos de pacientes.'),
        h3('Integracións Sanitarias'),
        ul([
          'Integración con ferramentas de xestión sanitaria do Reino Unido para unha experiencia B2B fluída',
          'Cumprimento cos estándares de manexo de datos e privacidade de pacientes do NHS',
          'Integración das ferramentas de Limbic nos sistemas de atención existentes utilizados por provedores do NHS',
        ]),
      ]),
    },
    pt: {
      title: 'Plataforma de Terapia Limbic AI',
      description:
        'Ferramentas de IA clinicamente validadas que ajudam os serviços de saúde mental do NHS do Reino Unido a reduzir os tempos de rastreio e conectar os pacientes à terapia mais rapidamente.',
      content: buildRichText([
        h2('Visão Geral'),
        p('Limbic AI desenvolve ferramentas de IA clinicamente validadas que ajudam os serviços de saúde mental do NHS do Reino Unido a reduzir os tempos de rastreio e conectar os pacientes à terapia mais rapidamente. A plataforma serve centenas de milhares de pacientes em todo o país.'),
        h2('Contribuições Chave'),
        h3('Motor de Conversa com Viagem no Tempo'),
        p('Desenho de funcionalidades de viagem no tempo para o chatbot que permitem aos utilizadores editar as suas respostas e voltar ao caminho ótimo — envolvendo rollbacks de efeitos secundários como a desalerta de serviços de emergência do Reino Unido e a gestão do estado geral do sistema.'),
        h3('Fila de Notificações a Serviços de Emergência'),
        p('Implementação de um sistema de filas com retentativas para notificações a serviços de emergência, garantindo que os pacientes críticos sempre recebessem os cuidados necessários, com entrega garantida e registos de auditoria.'),
        h3('Testes Automatizados de Conversas'),
        p('Desenho e desenvolvimento de casos de teste automatizados para diferentes ramos de conversa do chat, garantindo uma qualidade ótima de UX através de centenas de possíveis percursos de pacientes.'),
        h3('Integrações de Saúde'),
        ul([
          'Integração com ferramentas de gestão de saúde do Reino Unido para uma experiência B2B fluida',
          'Conformidade com os padrões de tratamento de dados e privacidade de pacientes do NHS',
          'Integração das ferramentas da Limbic nos sistemas de cuidados existentes utilizados por prestadores do NHS',
        ]),
      ]),
    },
  },
};
