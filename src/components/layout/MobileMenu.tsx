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
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const glitchVariants = {
  hidden: { opacity: 0, x: -10, skewX: -5 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, x: 10, skewX: 5, transition: { duration: 0.2 } },
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

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

  // Focus trap + keyboard handling
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
          // Shift+Tab: wrap from first to last
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab: wrap from last to first
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
      // Focus close button when menu opens
      // Use requestAnimationFrame to wait for Framer Motion render
      const raf = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // Return focus to the trigger (hamburger button) when menu closes
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
          className="fixed inset-0 z-50 bg-cyber-bg/98 backdrop-blur-xl scanlines"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            // Close when clicking the backdrop (not nav content)
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Corner accents (decorative) */}
          <div
            className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan/20"
            aria-hidden="true"
          />
          <div
            className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan/20"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan/20"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyber-cyan/20"
            aria-hidden="true"
          />

          {/* Vertical scan line */}
          <motion.div
            className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyber-cyan/30 to-transparent pointer-events-none"
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="group absolute top-5 right-5 inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 border border-cyber-border hover:border-brand/40 text-cyber-muted hover:text-cyber-heading transition-all duration-300 z-20 cyber-border-glow"
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
              className="transition-transform duration-300 group-hover:rotate-90"
            >
              <line x1="15" y1="5" x2="5" y2="15" />
              <line x1="5" y1="5" x2="15" y2="15" />
            </svg>
          </button>

          {/* Navigation links */}
          <nav
            className="flex flex-col items-center justify-center h-full gap-0 relative z-10"
            aria-label={t('mobileNav')}
          >
            {/* System label (decorative) */}
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-faint mb-10"
              variants={glitchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden="true"
            >
              {t('systemNav')}
            </motion.span>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xs"
              >
                {/* Separator line above each link (except first) */}
                {i > 0 && (
                  <div
                    className="w-full h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent mb-4"
                    aria-hidden="true"
                  />
                )}
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group/link relative block text-center font-mono text-xl sm:text-2xl uppercase tracking-[0.25em] text-cyber-body hover:text-brand-light transition-all duration-300 py-3"
                >
                  {/* Index number */}
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[10px] text-cyber-faint/30 tracking-wider"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-cyber-faint/50 group-hover/link:text-brand/50 transition-colors duration-300" aria-hidden="true">
                    [
                  </span>
                  <span className="group-hover/link:neon-glow transition-all duration-300">
                    {link.label}
                  </span>
                  <span className="text-cyber-faint/50 group-hover/link:text-brand/50 transition-colors duration-300" aria-hidden="true">
                    ]
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Language switcher for mobile */}
            <motion.div
              custom={navLinks.length}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-8"
            >
              <LanguageSwitcher />
            </motion.div>

            {/* Brand accent line (decorative) */}
            <motion.div
              className="w-12 h-px mt-10"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(90deg, transparent, #8000FF, #00ffff, transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
