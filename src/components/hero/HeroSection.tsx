'use client'

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-neutral-950" />
  ),
})

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
}

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: EASE,
    },
  },
}

const glowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Center radial gradient for text area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,10,10,0.55) 0%, transparent 70%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 100%)',
          }}
        />
        {/* Top subtle vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Text Content Overlay */}
      <div className="relative z-[2] flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={glowVariants} className="mb-8">
            <Image
              src="/logo.svg"
              alt="Kalebtec"
              width={56}
              height={56}
              className="opacity-80"
              priority
            />
          </motion.div>

          {/* Company Name */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white"
          >
            KALEBTEC
          </motion.h1>

          {/* Animated separator line */}
          <motion.div
            variants={lineVariants}
            className="mt-5 mb-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-brand to-transparent"
          />

          {/* Tagline */}
          <motion.p
            variants={fadeUpVariants}
            className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-widest uppercase text-brand-light"
          >
            Technology Consulting
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl text-base sm:text-lg text-neutral-400 leading-relaxed font-light"
          >
            We architect digital solutions that transform businesses
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants} className="mt-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-sm border border-brand/40 bg-brand/10 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand/20 hover:border-brand/70 hover:shadow-[0_0_30px_rgba(128,0,255,0.2)] focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              <span>Get in Touch</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            Scroll
          </span>
          <svg
            className="h-4 w-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
