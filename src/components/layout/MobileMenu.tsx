'use client';

import { useEffect, useRef, useCallback, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

export default function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const t = useTranslations('nav');
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/#about', label: t('about') },
    { href: '/#services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/#team', label: t('team') },
    { href: '/#contact', label: t('contact') },
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const menu = menuRef.current;
        if (!menu) return;

        const focusable = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      triggerRef?.current?.focus();
    }
  }, [isOpen, handleKeyDown, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('mobileMenuDialog')}
          className="fixed inset-0 z-50 bg-bg"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-5 right-5 inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 text-muted hover:text-heading transition-colors duration-200 z-20"
            aria-label={t('closeMenu')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="15" y1="5" x2="5" y2="15" />
              <line x1="5" y1="5" x2="15" y2="15" />
            </svg>
          </button>

          <nav
            className="flex flex-col items-start justify-center h-full max-w-md mx-auto px-8 gap-2 relative z-10"
            aria-label={t('mobileNav')}
          >
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-faint mb-6"
              variants={linkVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {t('systemNav')}
            </motion.span>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i + 1}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-3xl sm:text-4xl font-semibold tracking-tight text-heading hover:text-muted transition-colors duration-200 py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              custom={navLinks.length + 1}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-8"
            >
              <LanguageSwitcher />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
