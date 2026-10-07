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

  return (
    <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
      <PageLayout>
        <HeroSection />
        <AboutSection />
        <ImpactSection />
        <SystemsSection />
        <PhilosophySection />
        <ContactSection />
      </PageLayout>
    </div>
  )
}
