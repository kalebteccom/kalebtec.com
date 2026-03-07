import type { Metadata } from 'next'
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
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
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-cyber-bg text-white antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
