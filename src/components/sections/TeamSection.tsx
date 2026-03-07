'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedReveal from '@/components/ui/AnimatedReveal'
import { cn } from '@/lib/utils'

const team = [
  {
    name: 'Rowin Hernandez',
    role: 'Co-Founder & Lead Engineer',
    initials: 'RH',
    id: 'RH-001',
    roleCode: 'LEAD_ENGINEER',
    description:
      'Full-stack engineer and systems architect with a passion for building elegant solutions to complex problems. Rowin leads technical strategy and development.',
  },
  {
    name: 'Mari Hernandez',
    role: 'Co-Founder & Operations Lead',
    initials: 'MH',
    id: 'MH-002',
    roleCode: 'OPS_LEAD',
    description:
      'Operations strategist and project manager who ensures every engagement delivers exceptional results. Mari drives client relationships and business operations.',
  },
]

export default function TeamSection() {
  return (
    <section id="team" aria-label="Our Team" className="relative py-32">
      {/* Gradient top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="THE TEAM"
          sectionNumber="03"
        />

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <AnimatedReveal key={member.name} delay={0.15 * index}>
              <div
                className={cn(
                  'group p-6 md:p-8 border border-cyber-border',
                  'bg-cyber-surface',
                  'cyber-corners cyber-border-glow',
                  'transition-all duration-500',
                  'hover:border-brand/50',
                  'h-full'
                )}
              >
                {/* Avatar with initials — square, no rounding */}
                <div className="mb-6 flex items-center gap-5">
                  <div className="flex items-center justify-center w-16 h-16 bg-brand/10 border border-brand/30" role="img" aria-label={`${member.name} initials`}>
                    <span className="font-display text-lg font-bold tracking-wider text-brand" aria-hidden="true">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-wide text-cyber-heading">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs text-cyber-cyan tracking-wide mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Data-like metadata — decorative flavor text */}
                <div className="mb-4 flex items-center gap-4" aria-hidden="true">
                  <span className="font-mono text-[10px] text-brand/30 tracking-wider">
                    ID: {member.id}
                  </span>
                  <span className="font-mono text-[10px] text-brand/30 tracking-wider">
                    ROLE: {member.roleCode}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-cyber-muted">
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
