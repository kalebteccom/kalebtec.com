'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Kalebtec"
      className="relative py-32 overflow-hidden cyber-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="WHO WE ARE" sectionNumber="01" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Column */}
          <AnimatedReveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-cyber-body">
                <span className="text-cyber-faint font-mono">{'>'}</span> Kalebtec is a technology
                consulting firm founded by Rowin and Mari Hernandez. We partner with businesses to
                architect, build, and scale digital solutions.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-cyber-muted">
                <span className="text-cyber-faint font-mono">{'//'}</span> From strategy to
                execution, we bring technical expertise and creative vision to every project.
              </p>
            </div>
          </AnimatedReveal>

          {/* Cyberpunk Geometric Decorative Element */}
          <AnimatedReveal delay={0.3}>
            <div
              className="relative flex items-center justify-center h-80 lg:h-96"
              aria-hidden="true"
            >
              {/* Wireframe cube with 3D perspective */}
              <div
                className="absolute w-44 h-44 md:w-52 md:h-52 border border-cyber-border"
                style={{
                  transform: 'perspective(600px) rotateX(15deg) rotateY(-25deg)',
                }}
              />
              <div
                className="absolute w-44 h-44 md:w-52 md:h-52 border border-cyber-border"
                style={{
                  transform: 'perspective(600px) rotateX(15deg) rotateY(-25deg) translateZ(40px)',
                }}
              />
              {/* Connecting lines for cube depth */}
              <div
                className="absolute w-px h-10 bg-cyber-faint/15"
                style={{
                  transform:
                    'perspective(600px) rotateX(15deg) rotateY(-25deg) translate(-86px, -86px)',
                }}
              />
              <div
                className="absolute w-px h-10 bg-cyber-faint/15"
                style={{
                  transform:
                    'perspective(600px) rotateX(15deg) rotateY(-25deg) translate(86px, -86px)',
                }}
              />

              {/* Small grid pattern overlay */}
              <div
                className="absolute w-32 h-32 md:w-40 md:h-40 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(128,0,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,0,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />

              {/* Floating data points */}
              <span className="absolute top-6 left-10 font-mono text-[10px] text-cyber-faint/40">
                0x4F2A
              </span>
              <span className="absolute top-16 right-8 font-mono text-[10px] text-cyber-cyan/20">
                128.00
              </span>
              <span className="absolute bottom-20 left-16 font-mono text-[10px] text-cyber-faint/30">
                node_03
              </span>
              <span className="absolute bottom-8 right-12 font-mono text-[10px] text-cyber-cyan/25">
                0xFF00
              </span>
              <span className="absolute top-1/3 left-6 font-mono text-[10px] text-cyber-faint/20">
                ::01
              </span>

              {/* Accent square */}
              <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-cyber-faint/5 border border-cyber-border" />

              {/* Thin horizontal line */}
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
              {/* Thin vertical line */}
              <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent left-1/2" />

              {/* Accent dot — square, not round */}
              <div className="absolute top-8 right-12 md:right-16 w-2 h-2 bg-cyber-muted" />
            </div>
          </AnimatedReveal>
        </div>
      </div>

      {/* Section divider: gradient line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>
    </section>
  );
}
