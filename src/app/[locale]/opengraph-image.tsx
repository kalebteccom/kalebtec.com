import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { getOGFont, getOGLogoDataUri, OG_COLORS } from '@/lib/og-image-utils';

export const runtime = 'nodejs';
export const alt = 'Kalebtec — Tech consulting';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OGProps {
  params: Promise<{ locale: string }>;
}

export default async function SiteOGImage({ params }: OGProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const [fontHeavy, fontMedium] = await Promise.all([getOGFont(800), getOGFont(500)]);
  const logoDataUri = getOGLogoDataUri();

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

        {/* Top row: logo + wordmark */}
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
            Tech consulting
          </div>
        </div>

        {/* Massive editorial headline */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
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
            <span style={{ display: 'flex' }}>{t('eyebrow')}</span>
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: OG_COLORS.ink,
              maxWidth: 1000,
            }}
          >
            {t('headline')}
          </div>
        </div>

        {/* Bottom row: CTA + domain */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '14px 28px',
              backgroundColor: OG_COLORS.brand,
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              borderRadius: 999,
            }}
          >
            {t('primaryCta')}
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
      ...size,
      fonts: [
        { name: 'Inter', data: fontHeavy, weight: 800, style: 'normal' },
        { name: 'Inter', data: fontMedium, weight: 500, style: 'normal' },
      ],
    },
  );
}
