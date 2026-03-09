'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
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
      // Check reduced motion
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) return;

      setHackFlash(true);
      setAccessDenied(true);

      // Clear any existing timeout
      if (hackTimeoutRef.current) clearTimeout(hackTimeoutRef.current);

      hackTimeoutRef.current = setTimeout(() => {
        setHackFlash(false);
      }, 800);

      // Access denied fades after 1.5s (via CSS animation)
      setTimeout(() => {
        setAccessDenied(false);
      }, 1500);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission with a delay
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      setFormStatus('success');
      // Reset form fields
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
      className="relative py-32 overflow-hidden cyber-grid-bg"
    >
      {/* Gradient top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      {/* Subtle radial cyan-tinted glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(128, 0, 255, 0.04) 30%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Section prefix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="font-mono text-sm text-cyber-faint tracking-wider">
              [{t('sectionNumber')}]
            </span>
            <span className="font-mono text-sm text-cyber-faint/50">//</span>
            <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
              {t('sectionLabel')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-cyber-heading neon-glow"
          >
            {t('heading')}{' '}
            <span className="text-cyber-cyan neon-glow-cyan">{t('headingHighlight')}</span>
          </motion.h2>

          {/* Accent line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: EASE,
            }}
            className="mt-6 flex justify-center"
            aria-hidden="true"
          >
            <div className="flex items-center gap-0">
              <div className="w-2 h-2 bg-brand" />
              <div className="h-px w-16 bg-gradient-to-r from-brand/40 to-transparent" />
            </div>
          </motion.div>

          <AnimatedReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-cyber-muted font-mono">{t('subtitle')}</p>
          </AnimatedReveal>

          {/* Email CTA */}
          <AnimatedReveal delay={0.3}>
            <a
              href="mailto:hello@kalebtec.com"
              className="group inline-block mt-8 font-mono text-xl md:text-2xl text-cyber-cyan transition-colors duration-300 hover:neon-glow-cyan"
            >
              hello@kalebtec.com
              <span className="block h-px w-0 bg-cyber-cyan transition-all duration-500 group-hover:w-full" />
            </a>
          </AnimatedReveal>

          {/* Contact Form */}
          <AnimatedReveal delay={0.4}>
            <form
              onSubmit={handleSubmit}
              className="mt-16 mx-auto max-w-lg space-y-5 text-left"
              aria-label={t('formAriaLabel')}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wider text-cyber-muted mb-2"
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
                      'w-full px-4 py-3 text-sm font-mono',
                      'bg-cyber-surface border border-cyber-faint/40 text-cyber-heading placeholder-cyber-faint',
                      'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                      'transition-all duration-300',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      hackFlash && 'contact-hack-flash',
                    )}
                    placeholder={t('namePlaceholder')}
                  />
                  {accessDenied && (
                    <span
                      aria-hidden="true"
                      className="access-denied-msg absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-cyber-cyan tracking-wider"
                    >
                      [ACCESS_DENIED]
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-cyber-muted mb-2"
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
                    'w-full px-4 py-3 text-sm font-mono',
                    'bg-cyber-surface border border-cyber-faint/40 text-cyber-heading placeholder-cyber-faint',
                    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                    'transition-all duration-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                  )}
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-cyber-muted mb-2"
                >
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  autoComplete="off"
                  disabled={formStatus === 'submitting'}
                  className={cn(
                    'w-full px-4 py-3 text-sm resize-none font-mono',
                    'bg-cyber-surface border border-cyber-faint/40 text-cyber-heading placeholder-cyber-faint',
                    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                    'transition-all duration-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                  )}
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={cn(
                  'w-full py-3 px-6 font-mono text-sm font-semibold uppercase tracking-wider',
                  'border border-brand bg-brand/10 text-cyber-heading',
                  'hover:bg-brand hover:text-white hover:shadow-[0_0_30px_rgba(128,0,255,0.2)]',
                  'focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-cyber-bg',
                  'transition-all duration-300',
                  'cursor-pointer',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
              >
                {formStatus === 'submitting' ? t('submitting') : t('submit')}
              </button>

              {/* Status feedback region */}
              <div aria-live="polite" aria-atomic="true" className="min-h-[2rem]">
                {formStatus === 'success' && (
                  <p className="font-mono text-sm text-cyber-cyan text-center">
                    {t('successMessage')}
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="font-mono text-sm text-cyber-magenta text-center">
                    {t('errorMessage')}
                  </p>
                )}
              </div>
            </form>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
