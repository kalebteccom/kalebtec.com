import type { SerializedEditorState } from 'lexical';

export interface LocalizedFields {
  title: string;
  description: string;
  content: SerializedEditorState;
}

export type TranslatableLocale = 'es' | 'fr' | 'ca' | 'gl' | 'pt';

export interface ProjectSeedData {
  title: string;
  slug: string;
  client: string;
  description: string;
  industries: string[]; // industry names — resolved to IDs at seed time
  technologies: string[];
  status: 'published' | 'draft';
  publishedDate: string; // ISO date
  order: number;
  /** URL to download as featuredImage, or null to skip */
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  /** Lexical rich text content */
  content: SerializedEditorState;
  /** Translations keyed by locale */
  translations?: Partial<Record<TranslatableLocale, LocalizedFields>>;
}
