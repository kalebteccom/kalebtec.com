'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedReveal from '@/components/ui/AnimatedReveal'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="WHO WE ARE" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <AnimatedReveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-neutral-300">
                Kalebtec is a technology consulting firm founded by Rowin and
                Mari Hernandez. We partner with businesses to architect, build,
                and scale digital solutions.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-neutral-400">
                From strategy to execution, we bring technical expertise and
                creative vision to every project.
              </p>
            </div>
          </AnimatedReveal>

          {/* Geometric Decorative Element */}
          <AnimatedReveal delay={0.3}>
            <div className="relative flex items-center justify-center h-80 lg:h-96">
              {/* Large rotated square */}
              <div className="absolute w-48 h-48 md:w-56 md:h-56 border border-brand/30 rotate-45 transition-transform duration-700" />
              {/* Medium square */}
              <div className="absolute w-36 h-36 md:w-44 md:h-44 border border-neutral-800 rotate-12 transition-transform duration-700" />
              {/* Small filled square */}
              <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-brand/10 border border-brand/40 -rotate-12" />
              {/* Circle overlay */}
              <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-neutral-700/50" />
              {/* Accent dot */}
              <div className="absolute top-8 right-12 md:right-16 w-3 h-3 rounded-full bg-brand" />
              {/* Thin horizontal line */}
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
              {/* Thin vertical line */}
              <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent left-1/2" />
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
