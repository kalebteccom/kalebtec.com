import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TeamSection from '@/components/sections/TeamSection'
import ContactSection from '@/components/sections/ContactSection'
import JsonLd from '@/components/seo/JsonLd'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalebtec.com'

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Kalebtec',
          url: SITE_URL,
          description:
            'Expert technology consulting by Rowin and Mari Hernandez. We build digital solutions that matter.',
          founders: [
            {
              '@type': 'Person',
              name: 'Rowin Hernandez',
              jobTitle: 'Co-Founder & CTO',
            },
            {
              '@type': 'Person',
              name: 'Mari Hernandez',
              jobTitle: 'Co-Founder & CEO',
            },
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@kalebtec.com',
            contactType: 'customer service',
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Kalebtec',
          url: SITE_URL,
          description:
            'Expert technology consulting by Rowin and Mari Hernandez.',
        }}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
    </>
  )
}
