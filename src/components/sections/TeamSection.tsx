'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedReveal from '@/components/ui/AnimatedReveal'
import { cn } from '@/lib/utils'

const team = [
  {
    name: 'Rowin Hernandez',
    role: 'Co-Founder & Lead Engineer',
    initials: 'RH',
    description:
      'Full-stack engineer and systems architect with a passion for building elegant solutions to complex problems. Rowin leads technical strategy and development.',
  },
  {
    name: 'Mari Hernandez',
    role: 'Co-Founder & Operations Lead',
    initials: 'MH',
    description:
      'Operations strategist and project manager who ensures every engagement delivers exceptional results. Mari drives client relationships and business operations.',
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="relative py-32">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-neutral-800" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="THE TEAM" />

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <AnimatedReveal key={member.name} delay={0.15 * index}>
              <div
                className={cn(
                  'p-8 rounded-lg border border-neutral-800',
                  'bg-neutral-950',
                  'transition-all duration-500',
                  'hover:border-neutral-700',
                  'h-full'
                )}
              >
                {/* Avatar with initials */}
                <div className="mb-6 flex items-center gap-5">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand/15 border border-brand/30">
                    <span className="font-display text-lg font-bold tracking-wider text-brand">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-wide text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-brand/80 font-medium tracking-wide mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-neutral-400">
                  {member.description}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
