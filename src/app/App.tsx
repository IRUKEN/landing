import { PageLayout } from './components/layout/PageLayout'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ImpactSection } from './components/sections/ImpactSection'
import { SystemsSection } from './components/sections/SystemsSection'
import { PhilosophySection } from './components/sections/PhilosophySection'
import { ContactSection } from './components/sections/ContactSection'
import { CronogramasPage } from './cronogramas/CronogramasPage'
import { BlogPage } from './blog/BlogPage'
import { ArticlePage } from './blog/ArticlePage'
import { LegalPage } from './legal/LegalPage'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path.startsWith('/cronogramas')) {
    return <CronogramasPage />
  }

  if (path === '/blog') {
    return <BlogPage />
  }

  if (path.startsWith('/blog/')) {
    return <ArticlePage slug={path.split('/').filter(Boolean)[1] ?? ''} />
  }

  if (path === '/legal/terms') return <LegalPage document="terms" />
  if (path === '/legal/privacy') return <LegalPage document="privacy" />
  if (path === '/legal/cookies') return <LegalPage document="cookies" />

  return (
    <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
      <PageLayout>
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ImpactSection />
          <SystemsSection />
          <PhilosophySection />
          <ContactSection />
        </main>
      </PageLayout>
    </div>
  )
}
