'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[KALEBTEC_ERROR]', error);
  }, [error]);

  return (
    <section
      aria-label="Application error"
      className="relative min-h-[80vh] flex items-center justify-center bg-bg"
    >
      <div className="relative flex flex-col items-start text-left px-6 max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-faint mb-6">
          System fault — Runtime exception
        </p>

        <h1 className="text-display-xl text-heading mb-6">Error</h1>

        <p className="editorial-lead text-body mb-4">
          An unexpected system failure occurred.
        </p>
        <p className="text-base text-muted mb-10">
          An unhandled exception has disrupted normal operations.
        </p>

        <div className="w-full max-w-md p-5 border border-border bg-surface mb-10">
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="text-faint font-mono text-xs uppercase tracking-wider shrink-0 w-20 mt-0.5">
                Detail
              </dt>
              <dd className="text-body">{error.message || 'Unknown error encountered'}</dd>
            </div>
            {error.digest && (
              <div className="flex gap-3">
                <dt className="text-faint font-mono text-xs uppercase tracking-wider shrink-0 w-20 mt-0.5">
                  Hash
                </dt>
                <dd className="text-faint font-mono text-xs">{error.digest}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button onClick={reset} className="btn-pill btn-primary">
            Retry
          </button>
          <Link href="/" className="btn-pill btn-secondary">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
