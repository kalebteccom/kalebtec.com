'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedReveal from '@/components/ui/AnimatedReveal'
import { cn } from '@/lib/utils'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-neutral-800" />
      </div>

      {/* Subtle radial purple glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(128, 0, 255, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white"
          >
            LET&apos;S BUILD{' '}
            <span className="text-brand">SOMETHING</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-6 flex justify-center"
          >
            <div className="h-0.5 w-16 bg-brand" />
          </motion.div>

          <AnimatedReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-neutral-400">
              Ready to transform your technology? Let&apos;s talk.
            </p>
          </AnimatedReveal>

          {/* Email CTA */}
          <AnimatedReveal delay={0.3}>
            <a
              href="mailto:hello@kalebtec.com"
              className="group inline-block mt-8 text-xl md:text-2xl font-display font-medium text-white transition-colors duration-300 hover:text-brand"
            >
              hello@kalebtec.com
              <span className="block h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
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
                  className="block text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-lg text-sm',
                    'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30',
                    'transition-all duration-300'
                  )}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-lg text-sm',
                    'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30',
                    'transition-all duration-300'
                  )}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-neutral-500 mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-lg text-sm resize-none',
                    'bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600',
                    'focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30',
                    'transition-all duration-300'
                  )}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className={cn(
                  'w-full py-3 px-6 rounded-lg text-sm font-display font-semibold uppercase tracking-wider',
                  'bg-brand text-white',
                  'hover:bg-brand-light',
                  'focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-neutral-950',
                  'transition-all duration-300',
                  'cursor-pointer'
                )}
              >
                Send Message
              </button>
            </form>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
