/**
 * Schema.org JSON-LD builders.
 *
 * The homepage and project pages were inlining ~80-line Schema objects
 * each. This module centralizes them so:
 *   - the structured data stays consistent across pages (Organization is
 *     the same @id everywhere it's referenced)
 *   - the source of truth for socials, founders, contact lives in one
 *     place
 *   - we can extend (e.g. add `aggregateRating`, `Service` items) without
 *     touching every page
 *
 * All builders return plain objects ready for `<JsonLd data={...} />`.
 */

import { SITE_URL, absoluteUrl } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/kalebtec',
  'https://x.com/kalebtec_com',
  'https://github.com/kalebteccom',
];

const FOUNDERS = [
  {
    '@type': 'Person',
    '@id': `${SITE_URL}/#rowin`,
    name: 'Rowin Hernandez',
    jobTitle: 'Co-Founder & Lead Engineer',
  },
  {
    '@type': 'Person',
    '@id': `${SITE_URL}/#mari`,
    name: 'Mari Hernandez',
    jobTitle: 'Co-Founder & Operations Lead',
  },
];

interface OrganizationOpts {
  /** Page-locale-aware description for the Organization. */
  description: string;
}

export function buildOrganizationLD(_locale: Locale, opts: OrganizationOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Kalebtec',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description: opts.description,
    founders: FOUNDERS,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@kalebtec.com',
      contactType: 'customer service',
      availableLanguage: ['en', 'es', 'ca', 'fr', 'gl', 'pt'],
    },
    sameAs: SOCIAL_LINKS,
  } as const;
}

interface WebSiteOpts {
  description: string;
}

export function buildWebSiteLD(locale: Locale, opts: WebSiteOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: 'Kalebtec',
    url: SITE_URL,
    description: opts.description,
    publisher: { '@id': ORG_ID },
    inLanguage: locale,
  } as const;
}

interface ServiceItem {
  name: string;
  description: string;
}

export function buildServiceListLD(
  _locale: Locale,
  services: ServiceItem[],
  sectionName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#services`,
    name: sectionName,
    itemListElement: services.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: { '@id': ORG_ID },
      },
    })),
  } as const;
}

interface BreadcrumbItem {
  name: string;
  /** Path relative to the locale root, e.g. '/projects/foo'. */
  path: string;
}

export function buildBreadcrumbLD(locale: Locale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  } as const;
}

interface CollectionPageOpts {
  /** Section path relative to locale root, e.g. '/projects'. */
  path: string;
  name: string;
  description: string;
  /** Item links inside the collection. */
  items: Array<{ name: string; path: string }>;
}

export function buildCollectionPageLD(locale: Locale, opts: CollectionPageOpts) {
  const url = absoluteUrl(locale, opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: locale,
    isPartOf: { '@id': SITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: opts.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: absoluteUrl(locale, item.path),
        name: item.name,
      })),
    },
  } as const;
}

interface CreativeWorkOpts {
  /** Project slug; used for the canonical URL + @id. */
  slug: string;
  name: string;
  description?: string | null;
  /** Optional ISO date string. */
  publishedDate?: string | null;
  /** Optional cover image URL — relative or absolute. */
  imageUrl?: string | null;
  /** Project client (rendered as schema:sponsor + schema:about). */
  client?: string | null;
  /** Industry + technology names, joined into a comma-separated keyword string. */
  keywords?: string[];
}

export function buildCreativeWorkLD(locale: Locale, opts: CreativeWorkOpts) {
  const url = absoluteUrl(locale, `/projects/${opts.slug}`);
  const imageAbsolute = opts.imageUrl
    ? opts.imageUrl.startsWith('http')
      ? opts.imageUrl
      : `${SITE_URL}${opts.imageUrl}`
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url,
    inLanguage: locale,
    ...(opts.publishedDate ? { datePublished: opts.publishedDate } : {}),
    ...(imageAbsolute ? { image: imageAbsolute } : {}),
    author: { '@id': ORG_ID },
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(opts.client ? { sponsor: opts.client, about: opts.client } : {}),
    ...(opts.keywords && opts.keywords.length > 0
      ? { keywords: opts.keywords.filter(Boolean).join(', ') }
      : {}),
  } as const;
}
