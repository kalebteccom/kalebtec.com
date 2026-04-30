import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section
      aria-label={t('ariaLabel')}
      className="relative min-h-[80vh] flex items-center justify-center bg-bg"
    >
      <div className="relative flex flex-col items-start text-left px-6 max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-faint mb-6">
          {t('label')} — {t('sublabel')}
        </p>

        <h1 className="text-[clamp(5rem,15vw+1rem,12rem)] font-display font-bold tracking-tight text-heading leading-none mb-6">
          {t('heading')}
        </h1>

        <p className="editorial-lead text-body mb-4">{t('terminalMessage')}</p>
        <p className="text-base text-muted mb-10">{t('description')}</p>

        <ButtonLink href="/" variant="primary" size="md">
          {t('returnHome')}
        </ButtonLink>
      </div>
    </section>
  );
}
