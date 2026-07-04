import { PageLayout } from './components/layout/PageLayout'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ImpactSection } from './components/sections/ImpactSection'
import { SystemsSection } from './components/sections/SystemsSection'
import { PhilosophySection } from './components/sections/PhilosophySection'
import { ContactSection } from './components/sections/ContactSection'

export default function App() {
  return (
    <PageLayout>
        <HeroSection />
        <AboutSection />
        <ImpactSection />
        <SystemsSection />
        <PhilosophySection />
        <ContactSection />
    </PageLayout>
  )
}

