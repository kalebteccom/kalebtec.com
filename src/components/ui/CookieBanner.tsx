'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_CONSENT_KEY = 'kalebtec-cookie-consent';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so the banner doesn't flash on initial load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="region"
          aria-label={t('ariaLabel')}
          aria-describedby="cookie-banner-description"
        >
          <div className="mx-auto max-w-4xl bg-cyber-surface border border-cyber-border relative scanlines cyber-corners">
            {/* Top gradient accent line */}
            <div
              className="h-px w-full"
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #8000FF 30%, #00ffff 70%, transparent)',
              }}
            />

            <div className="p-5 sm:p-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Terminal-style prefix */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-cyber-cyan uppercase tracking-wider">
                      {t('sysLabel')}
                    </span>
                    <span className="font-mono text-xs text-cyber-faint/50">//</span>
                    <span className="font-mono text-xs text-cyber-faint uppercase tracking-wider">
                      {t('noticeLabel')}
                    </span>
                  </div>
                  <p
                    id="cookie-banner-description"
                    className="text-sm text-cyber-muted leading-relaxed"
                  >
                    {t('description')}{' '}
                    <Link
                      href="/privacy"
                      className="text-brand-light hover:text-cyber-cyan transition-colors duration-300 underline underline-offset-2"
                    >
                      {t('privacyPolicy')}
                    </Link>{' '}
                    {t('and')}{' '}
                    <Link
                      href="/terms"
                      className="text-brand-light hover:text-cyber-cyan transition-colors duration-300 underline underline-offset-2"
                    >
                      {t('termsOfService')}
                    </Link>
                    .
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-cyber-muted border border-cyber-border hover:border-cyber-muted hover:text-cyber-heading bg-transparent transition-all duration-300"
                  >
                    {t('decline')}
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-white bg-brand hover:bg-brand-light border border-brand hover:border-brand-light transition-all duration-300 cyber-border-glow"
                  >
                    {t('accept')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
