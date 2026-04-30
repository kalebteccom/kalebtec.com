'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const HACK_TRIGGERS = ['hack', 'sudo'];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactSection() {
  const t = useTranslations('contact');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [hackFlash, setHackFlash] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hackTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().trim();
    const triggered = HACK_TRIGGERS.some((trigger) => value === trigger);

    if (triggered) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) return;

      setHackFlash(true);
      setAccessDenied(true);

      if (hackTimeoutRef.current) clearTimeout(hackTimeoutRef.current);
      hackTimeoutRef.current = setTimeout(() => setHackFlash(false), 800);
      setTimeout(() => setAccessDenied(false), 1500);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-label={t('ariaLabel')}
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-surface"
    >
      <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-faint mb-4">
            {t('sectionNumber')} — {t('sectionLabel')}
          </p>
          <h2 className="text-display-lg text-heading mb-6 max-w-[16ch]">
            {t('heading')}{' '}
            <span className="text-muted">{t('headingHighlight')}</span>
          </h2>
          <p className="editorial-lead text-body max-w-2xl">{t('subtitle')}</p>
        </motion.div>

        <AnimatedReveal delay={0.15}>
          <a
            href="mailto:hello@kalebtec.com"
            className="inline-block text-2xl font-display font-semibold tracking-tight text-heading mb-12 underline underline-offset-4 hover:no-underline transition-all duration-200"
          >
            hello@kalebtec.com
          </a>
        </AnimatedReveal>

        <AnimatedReveal delay={0.25}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-8"
            aria-label={t('formAriaLabel')}
            aria-busy={formStatus === 'submitting'}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium uppercase tracking-wider text-muted mb-2"
              >
                {t('nameLabel')}
              </label>
              <div className="relative">
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={formStatus === 'submitting'}
                  onChange={handleNameChange}
                  className={cn(
                    'w-full px-4 py-3 text-base',
                    'bg-bg border border-border text-heading placeholder:text-faint',
                    'focus:outline-none focus:border-ink',
                    'transition-colors duration-200',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    hackFlash && 'contact-hack-flash',
                  )}
                  placeholder={t('namePlaceholder')}
                />
                {accessDenied && (
                  <span
                    aria-hidden="true"
                    className="access-denied-msg absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-wider text-heading"
                  >
                    {t('accessDenied')}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wider text-muted mb-2"
              >
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                disabled={formStatus === 'submitting'}
                className={cn(
                  'w-full px-4 py-3 text-base',
                  'bg-bg border border-border text-heading placeholder:text-faint',
                  'focus:outline-none focus:border-ink',
                  'transition-colors duration-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-wider text-muted mb-2"
              >
                {t('messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                autoComplete="off"
                disabled={formStatus === 'submitting'}
                className={cn(
                  'w-full px-4 py-3 text-base resize-none',
                  'bg-bg border border-border text-heading placeholder:text-faint',
                  'focus:outline-none focus:border-ink',
                  'transition-colors duration-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
                placeholder={t('messagePlaceholder')}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? t('submitting') : t('submit')}
            </Button>

            <div aria-live="polite" aria-atomic="true" className="min-h-[2rem]">
              {formStatus === 'success' && (
                <p className="text-sm text-heading">{t('successMessage')}</p>
              )}
              {formStatus === 'error' && (
                <p className="text-sm text-heading">{t('errorMessage')}</p>
              )}
            </div>
          </form>
        </AnimatedReveal>
      </div>
    </section>
  );
}
