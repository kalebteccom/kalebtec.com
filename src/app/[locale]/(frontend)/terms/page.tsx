import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

interface SectionProps {
  num: string;
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ num, label, title, children, delay = 0.1 }: SectionProps) {
  return (
    <AnimatedReveal delay={delay}>
      <article className="border-t border-border pt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-faint mb-3">
          {num} — {label}
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-heading mb-5">
          {title}
        </h2>
        <div className="text-base text-body leading-relaxed space-y-4 max-w-2xl">{children}</div>
      </article>
    </AnimatedReveal>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-faint mt-1 shrink-0" aria-hidden="true">·</span>
      <span>{children}</span>
    </li>
  );
}

export default async function TermsOfServicePage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('terms');

  return (
    <section className="min-h-screen pt-32 pb-24 bg-bg" aria-label={t('pageTitle')}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-faint mb-4">
            Terms of service
          </p>
          <h1 className="text-display-xl text-heading mb-6">{t('pageTitle')}</h1>
          <p className="text-sm text-muted">{t('effectiveDate')}</p>
        </header>

        <div className="space-y-12">
          <Section num="01" label={t('section1.label')} title={t('section1.title')} delay={0.1}>
            <p>{t('section1.content')}</p>
          </Section>

          <Section num="02" label={t('section2.label')} title={t('section2.title')} delay={0.12}>
            <p>{t('section2.content')}</p>
            <ul className="space-y-2">
              <Bullet>{t('section2.item1')}</Bullet>
              <Bullet>{t('section2.item2')}</Bullet>
              <Bullet>{t('section2.item3')}</Bullet>
              <Bullet>{t('section2.item4')}</Bullet>
              <Bullet>{t('section2.item5')}</Bullet>
              <Bullet>{t('section2.item6')}</Bullet>
            </ul>
            <p>{t('section2.contentAfter')}</p>
          </Section>

          <Section num="03" label={t('section3.label')} title={t('section3.title')} delay={0.14}>
            <p>{t('section3.content')}</p>
            <ul className="space-y-2">
              <Bullet>{t('section3.item1')}</Bullet>
              <Bullet>{t('section3.item2')}</Bullet>
              <Bullet>{t('section3.item3')}</Bullet>
              <Bullet>{t('section3.item4')}</Bullet>
              <Bullet>{t('section3.item5')}</Bullet>
            </ul>
          </Section>

          <Section num="04" label={t('section4.label')} title={t('section4.title')} delay={0.16}>
            <p>{t('section4.content1')}</p>
            <p>{t('section4.content2')}</p>
          </Section>

          <Section num="05" label={t('section5.label')} title={t('section5.title')} delay={0.18}>
            <p>{t('section5.content')}</p>
          </Section>

          <Section num="06" label={t('section6.label')} title={t('section6.title')} delay={0.2}>
            <p>{t('section6.content')}</p>
          </Section>

          <Section num="07" label={t('section7.label')} title={t('section7.title')} delay={0.22}>
            <p>{t('section7.content')}</p>
            <ul className="space-y-2">
              <Bullet>{t('section7.item1')}</Bullet>
              <Bullet>{t('section7.item2')}</Bullet>
              <Bullet>{t('section7.item3')}</Bullet>
              <Bullet>{t('section7.item4')}</Bullet>
            </ul>
            <p>{t('section7.contentAfter')}</p>
          </Section>

          <Section num="08" label={t('section8.label')} title={t('section8.title')} delay={0.24}>
            <p>{t('section8.content')}</p>
          </Section>

          <Section num="09" label={t('section9.label')} title={t('section9.title')} delay={0.26}>
            <p>{t('section9.content')}</p>
          </Section>

          <Section num="10" label={t('section10.label')} title={t('section10.title')} delay={0.28}>
            <p>{t('section10.content')}</p>
          </Section>

          <Section num="11" label={t('section11.label')} title={t('section11.title')} delay={0.3}>
            <p>{t('section11.content')}</p>
          </Section>

          <Section num="—" label={t('contact.label')} title={t('contact.title')} delay={0.32}>
            <p>{t('contact.content')}</p>
            <p>
              <a
                href="mailto:hello@kalebtec.com"
                className="text-heading underline underline-offset-4 hover:no-underline"
              >
                hello@kalebtec.com
              </a>
            </p>
          </Section>

          <AnimatedReveal delay={0.34}>
            <div className="flex items-center gap-6 pt-8 mt-12 border-t border-border text-sm">
              <Link href="/" className="text-muted hover:text-heading transition-colors duration-200">
                ← {t('backToHome')}
              </Link>
              <Link
                href="/privacy"
                className="text-muted hover:text-heading transition-colors duration-200"
              >
                {t('privacyPolicyLink')} →
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
