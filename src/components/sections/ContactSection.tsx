'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedReveal from '@/components/ui/AnimatedReveal'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden cyber-grid-bg"
    >
      {/* Gradient top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      {/* Subtle radial cyan-tinted glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(128, 0, 255, 0.04) 30%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Section prefix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="font-mono text-sm text-brand tracking-wider">
              [04]
            </span>
            <span className="font-mono text-sm text-cyber-cyan/50">//</span>
            <span className="font-mono text-sm text-neutral-500 tracking-wider uppercase">
              CONTACT
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white neon-glow"
          >
            LET&apos;S BUILD{' '}
            <span className="text-cyber-cyan neon-glow-cyan">SOMETHING</span>
          </motion.h2>

          {/* Accent line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: EASE,
            }}
            className="mt-6 flex justify-center"
          >
            <div className="flex items-center gap-0">
              <div className="w-2 h-2 bg-brand shadow-[0_0_8px_rgba(128,0,255,0.6)]" />
              <div className="h-px w-16 bg-gradient-to-r from-brand to-cyber-cyan" />
            </div>
          </motion.div>

          <AnimatedReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-neutral-400 font-mono">
              // Ready to transform your technology? Let&apos;s talk.
            </p>
          </AnimatedReveal>

          {/* Email CTA */}
          <AnimatedReveal delay={0.3}>
            <a
              href="mailto:hello@kalebtec.com"
              className="group inline-block mt-8 font-mono text-xl md:text-2xl text-cyber-cyan transition-colors duration-300 hover:neon-glow-cyan"
            >
              hello@kalebtec.com
              <span className="block h-px w-0 bg-cyber-cyan transition-all duration-500 group-hover:w-full" />
            </a>
          </AnimatedReveal>

          {/* Contact Form */}
          <AnimatedReveal delay={0.4}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-16 mx-auto max-w-lg space-y-5 text-left"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wider text-brand/50 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={cn(
                    'w-full px-4 py-3 text-sm font-mono',
                    'bg-cyber-surface border border-cyber-border text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                    'transition-all duration-300'
                  )}
                  placeholder="> your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-brand/50 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={cn(
                    'w-full px-4 py-3 text-sm font-mono',
                    'bg-cyber-surface border border-cyber-border text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                    'transition-all duration-300'
                  )}
                  placeholder="> you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-brand/50 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={cn(
                    'w-full px-4 py-3 text-sm resize-none font-mono',
                    'bg-cyber-surface border border-cyber-border text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/30',
                    'transition-all duration-300'
                  )}
                  placeholder="> describe your project..."
                />
              </div>

              <button
                type="submit"
                className={cn(
                  'w-full py-3 px-6 font-mono text-sm font-semibold uppercase tracking-wider',
                  'border border-brand bg-brand/10 text-white',
                  'hover:bg-brand hover:shadow-[0_0_30px_rgba(128,0,255,0.2)]',
                  'focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-cyber-bg',
                  'transition-all duration-300',
                  'cursor-pointer'
                )}
              >
                [TRANSMIT]
              </button>
            </form>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
