'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#09090f', color: '#fff', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>[SYSTEM_ERROR]</h2>
          <p style={{ color: '#8000FF' }}>{error.message || 'Something went wrong'}</p>
          <button
            onClick={reset}
            style={{ padding: '0.5rem 1.5rem', border: '1px solid #8000FF', background: 'transparent', color: '#fff', cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            [RETRY]
          </button>
        </div>
      </body>
    </html>
  )
}
