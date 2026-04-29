import { ImageResponse } from 'next/og';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import {
  getOGFont,
  getOGLogoDataUri,
  OG_COLORS,
  pickHeadlineSize,
} from '@/lib/og-image-utils';
import type { Locale } from '@/i18n/routing';
import type { Industry } from '@/payload-types';

export const runtime = 'nodejs';

const SIZE = { width: 1200, height: 630 };

interface RouteContext {
  params: Promise<{ slug: string; locale: string }>;
}

export async function GET(_req: Request, { params }: RouteContext) {
  const { slug, locale } = await params;

  const [fontHeavy, fontMedium] = await Promise.all([getOGFont(800), getOGFont(500)]);
  const logoDataUri = getOGLogoDataUri();

  let title = slug.replace(/-/g, ' ');
  let client: string | null = null;
  let industries: string[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'projects',
      locale: locale as Locale,
      fallbackLocale: 'en',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
      depth: 1,
    });
    const project = docs[0];
    if (project) {
      title = project.title || title;
      client = project.client ?? null;
      industries = (project.industries ?? [])
        .filter((ind): ind is Industry => typeof ind !== 'string')
        .map((ind) => ind.name)
        .filter(Boolean);
    }
  } catch {
    // Fall back to slug-derived title
  }

  const fontSize = pickHeadlineSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: OG_COLORS.paper,
          padding: 72,
          justifyContent: 'space-between',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* Brand-purple accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 120,
            bottom: 120,
            width: 6,
            backgroundColor: OG_COLORS.brand,
          }}
        />

        {/* Top row: logo + wordmark + client tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} alt="" width={44} height={44} />
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: OG_COLORS.ink,
            }}
          >
            Kalebtec
          </div>
          {client && (
            <div
              style={{
                marginLeft: 12,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: OG_COLORS.muted,
                border: `1px solid ${OG_COLORS.border}`,
                borderRadius: 999,
              }}
            >
              {client}
            </div>
          )}
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1040 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: OG_COLORS.muted,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: OG_COLORS.brand,
              }}
            />
            <span style={{ display: 'flex' }}>Project</span>
          </div>
          <div
            style={{
              fontSize,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: OG_COLORS.ink,
              maxWidth: 1040,
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row: industry tags + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            {industries.slice(0, 3).map((name) => (
              <div
                key={name}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${OG_COLORS.border}`,
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  color: OG_COLORS.ink,
                  letterSpacing: '-0.005em',
                }}
              >
                {name}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: OG_COLORS.muted,
            }}
          >
            kalebtec.com
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: 'Inter', data: fontHeavy, weight: 800, style: 'normal' },
        { name: 'Inter', data: fontMedium, weight: 500, style: 'normal' },
      ],
    },
  );
}
