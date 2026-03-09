import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section
      aria-label={t('ariaLabel')}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden cyber-grid-bg"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(128, 0, 255, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Decorative HUD elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-left system marker */}
        <div className="absolute top-8 left-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          SYS.STATUS: FAULT
        </div>
        {/* Top-right coordinates */}
        <div className="absolute top-8 right-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          ERR_CODE: 0x194
        </div>
        {/* Bottom-left marker */}
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          SECTOR: UNKNOWN
        </div>
        {/* Bottom-right marker */}
        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          NODE: DISCONNECTED
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Error label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-sm text-cyber-faint tracking-wider">{t('label')}</span>
          <span className="font-mono text-sm text-cyber-faint/50">//</span>
          <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
            {t('sublabel')}
          </span>
        </div>

        {/* Big 404 number */}
        <h1 className="font-display text-8xl sm:text-9xl md:text-[12rem] font-bold tracking-wider text-cyber-heading neon-glow leading-none">
          {t('heading')}
        </h1>

        {/* Accent line */}
        <div className="mt-6 flex items-center gap-0" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand/40" />
          <div className="w-2 h-2 bg-brand" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand/40" />
        </div>

        {/* Terminal-style message */}
        <div className="mt-8 space-y-2">
          <p className="font-mono text-sm sm:text-base text-cyber-cyan tracking-wider">
            {t('terminalMessage')}
          </p>
          <p className="font-mono text-sm text-cyber-muted">{t('description')}</p>
        </div>

        {/* System log block */}
        <div className="mt-8 w-full max-w-md border border-cyber-border bg-cyber-surface p-4 text-left cyber-corners">
          <div className="font-mono text-[11px] text-cyber-faint space-y-1.5">
            <p>
              <span className="text-cyber-muted">[TRACE]</span> {t('trace1')}
            </p>
            <p>
              <span className="text-cyber-muted">[TRACE]</span> {t('trace2')}
            </p>
            <p>
              <span className="text-brand-light">[WARN]</span> {t('trace3')}
            </p>
            <p>
              <span className="text-red-400">[FAIL]</span> {t('trace4')}
            </p>
            <p className="text-cyber-faint/60 typing-cursor">{t('awaiting')}</p>
          </div>
        </div>

        {/* Navigation link */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2 border border-cyber-muted/30 bg-transparent px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-cyber-heading transition-all duration-300 hover:border-cyber-heading/50"
        >
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span>{t('returnHome')}</span>
        </Link>
      </div>
    </section>
  );
}
