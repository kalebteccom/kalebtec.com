import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function TermsOfServicePage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('terms');

  return (
    <section className="min-h-screen pt-24 pb-32" aria-label={t('pageTitle')}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading title={t('pageTitle')} sectionNumber="TOS" />

        <AnimatedReveal delay={0.1}>
          <p className="text-sm text-cyber-faint font-mono mb-12">{t('effectiveDate')}</p>
        </AnimatedReveal>

        <div className="space-y-12">
          {/* Section 1 */}
          <AnimatedReveal delay={0.15}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[01]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section1.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section1.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section1.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 2 */}
          <AnimatedReveal delay={0.2}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[02]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section2.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section2.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed mb-4">
                  {t('section2.content')}
                </p>
                <ul className="space-y-2 text-sm text-cyber-body leading-relaxed list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item4')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item5')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section2.item6')}
                  </li>
                </ul>
                <p className="text-sm text-cyber-body leading-relaxed mt-4">
                  {t('section2.contentAfter')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 3 */}
          <AnimatedReveal delay={0.25}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[03]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section3.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section3.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed mb-4">
                  {t('section3.content')}
                </p>
                <ul className="space-y-2 text-sm text-cyber-body leading-relaxed list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section3.item1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section3.item2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section3.item3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section3.item4')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section3.item5')}
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 4 */}
          <AnimatedReveal delay={0.3}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[04]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section4.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section4.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed mb-4">
                  {t('section4.content1')}
                </p>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section4.content2')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 5 */}
          <AnimatedReveal delay={0.35}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[05]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section5.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section5.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section5.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 6 */}
          <AnimatedReveal delay={0.4}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[06]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section6.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section6.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section6.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 7 */}
          <AnimatedReveal delay={0.45}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[07]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section7.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section7.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed mb-4">
                  {t('section7.content')}
                </p>
                <ul className="space-y-2 text-sm text-cyber-body leading-relaxed list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section7.item1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section7.item2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section7.item3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand mt-1 shrink-0" aria-hidden="true">
                      &gt;
                    </span>
                    {t('section7.item4')}
                  </li>
                </ul>
                <p className="text-sm text-cyber-body leading-relaxed mt-4">
                  {t('section7.contentAfter')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 8 */}
          <AnimatedReveal delay={0.5}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[08]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section8.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section8.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section8.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 9 */}
          <AnimatedReveal delay={0.55}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[09]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section9.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section9.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section9.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 10 */}
          <AnimatedReveal delay={0.6}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[10]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section10.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section10.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section10.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Section 11 */}
          <AnimatedReveal delay={0.65}>
            <div className="border border-cyber-border bg-cyber-surface p-6 sm:p-8 cyber-corners relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-brand-light tracking-wider">[11]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('section11.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('section11.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed">
                  {t('section11.content')}
                </p>
              </div>
            </div>
          </AnimatedReveal>

          {/* Contact section */}
          <AnimatedReveal delay={0.7}>
            <div className="border border-brand/30 bg-cyber-surface p-6 sm:p-8 relative scanlines">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-cyber-cyan tracking-wider">[SYS]</span>
                  <span className="font-mono text-xs text-cyber-faint/50">//</span>
                  <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                    {t('contact.label')}
                  </span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider text-cyber-heading mb-4">
                  {t('contact.title')}
                </h3>
                <p className="text-sm text-cyber-body leading-relaxed mb-4">
                  {t('contact.content')}
                </p>
                <a
                  href="mailto:hello@kalebtec.com"
                  className="font-mono text-sm text-brand-light hover:text-cyber-cyan transition-colors duration-300"
                >
                  hello@kalebtec.com
                </a>
              </div>
            </div>
          </AnimatedReveal>

          {/* Back link */}
          <AnimatedReveal delay={0.75}>
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="/"
                className="font-mono text-sm text-cyber-muted hover:text-cyber-heading transition-colors duration-300"
              >
                &larr; {t('backToHome')}
              </Link>
              <span className="w-px h-4 bg-cyber-border" aria-hidden="true" />
              <Link
                href="/privacy"
                className="font-mono text-sm text-cyber-muted hover:text-cyber-heading transition-colors duration-300"
              >
                {t('privacyPolicyLink')} &rarr;
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
