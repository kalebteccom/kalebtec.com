'use client'

import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedReveal from '@/components/ui/AnimatedReveal'
import { cn } from '@/lib/utils'

const team = [
  {
    name: 'Rowin Hernandez',
    role: 'Co-Founder & CTO',
    initials: 'RH',
    photo: '/team/rowin.jpg',
    id: 'RH-001',
    roleCode: 'CHIEF_TECHNICAL_OFFICER',
    description:
      'Full-stack engineer and systems architect with a passion for building elegant solutions to complex problems. Rowin leads technical strategy and development.',
  },
  {
    name: 'Mari Hernandez',
    role: 'Co-Founder & CEO',
    initials: 'MH',
    photo: '/team/mari.jpeg',
    id: 'MH-002',
    roleCode: 'CHIEF_EXECUTIVE_OFFICER',
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
          sectionNumber="04"
        />

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <AnimatedReveal key={member.name} delay={0.15 * index}>
              <div
                className={cn(
                  'group border border-cyber-border',
                  'bg-cyber-surface',
                  'cyber-corners cyber-border-glow',
                  'transition-all duration-500',
                  'hover:border-cyber-muted/30',
                  'h-full overflow-hidden'
                )}
              >
                {/* Photo with HUD overlay */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover team-photo transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient fade to card bg */}
                  <div className="absolute inset-0 team-photo-fade bg-gradient-to-t from-cyber-surface via-transparent to-transparent" aria-hidden="true" />
                  {/* Scanline overlay on photo */}
                  <div className="absolute inset-0 scanlines opacity-30" aria-hidden="true" />
                  {/* HUD metadata overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1" aria-hidden="true">
                    <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                      ID: {member.id}
                    </span>
                    <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                      ROLE: {member.roleCode}
                    </span>
                  </div>
                  {/* Corner brackets on photo */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyber-cyan/40" aria-hidden="true" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyber-cyan/40" aria-hidden="true" />
                </div>

                {/* Info below photo */}
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl font-semibold tracking-wide text-cyber-heading">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-cyber-cyan tracking-wide mt-1.5 mb-4">
                    [{member.role.toUpperCase()}]
                  </p>
                  <p className="text-sm leading-relaxed text-cyber-muted">
                    {member.description}
                  </p>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
