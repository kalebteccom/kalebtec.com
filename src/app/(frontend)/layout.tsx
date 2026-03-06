import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Kalebtec | Tech Consulting',
  description: 'Expert technology consulting by Rowin and Mari Hernandez. We build digital solutions that matter.',
  openGraph: {
    title: 'Kalebtec | Tech Consulting',
    description: 'Expert technology consulting by Rowin and Mari Hernandez.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-neutral-950 text-white antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
