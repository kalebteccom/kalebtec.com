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
  status: 'published',
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
};
