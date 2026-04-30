'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const COOKIE_CONSENT_KEY = 'kalebtec-cookie-consent';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="region"
          aria-label={t('ariaLabel')}
          aria-describedby="cookie-banner-description"
        >
          <div className="mx-auto max-w-4xl bg-surface border border-border shadow-[0_12px_32px_rgba(8,15,17,0.12)]">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <p
                    id="cookie-banner-description"
                    className="text-sm text-body leading-relaxed"
                  >
                    {t('description')}{' '}
                    <Link
                      href="/privacy"
                      className="text-heading underline underline-offset-2 hover:no-underline transition-all duration-200"
                    >
                      {t('privacyPolicy')}
                    </Link>{' '}
                    {t('and')}{' '}
                    <Link
                      href="/terms"
                      className="text-heading underline underline-offset-2 hover:no-underline transition-all duration-200"
                    >
                      {t('termsOfService')}
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button variant="ghost" size="sm" onClick={handleDecline}>
                    {t('decline')}
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleAccept}>
                    {t('accept')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
