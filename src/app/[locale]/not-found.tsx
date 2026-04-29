import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-label="Page not found"
      className="relative min-h-[80vh] flex items-center justify-center bg-bg"
    >
      <div className="relative flex flex-col items-start text-left px-6 max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-faint mb-6">
          Error — Page not found
        </p>

        <h1 className="text-[clamp(5rem,15vw+1rem,12rem)] font-display font-bold tracking-tight text-heading leading-none mb-6">
          404
        </h1>

        <p className="editorial-lead text-body mb-4">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <p className="text-base text-muted mb-10">
          The requested path was not found in this system.
        </p>

        <Link href="/" className="btn-pill btn-primary">
          Return home
        </Link>
      </div>
    </section>
  );
}
