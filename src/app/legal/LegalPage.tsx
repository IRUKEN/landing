import { ArrowLeft } from 'lucide-react'
import { PageLayout } from '../components/layout/PageLayout'
import { useLanguage } from '../i18n/LanguageProvider'
import { legalDocuments, type LegalDocument } from './legalContent'

export function LegalPage({ document }: { document: LegalDocument }) {
  const { language } = useLanguage()
  const content = legalDocuments[document][language]

  return (
    <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
      <PageLayout>
        <main id="main-content">
          <header className="border-b border-border-secondary">
            <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
              <a className="inline-flex min-h-11 items-center gap-2 font-medium text-text-secondary hover:text-brand-primary" href="/">
                <ArrowLeft size={18} aria-hidden="true" /> {language === 'es' ? 'Volver al inicio' : 'Back home'}
              </a>
              <p className="mt-12 font-mono text-xs tracking-[0.2em] text-brand-primary">{content.eyebrow}</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-5xl md:text-7xl">{content.title}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-text-secondary md:text-xl">{content.summary}</p>
              <p className="mt-7 font-mono text-xs text-text-tertiary">{content.updated}</p>
            </div>
          </header>

          <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
            {content.sections.map(section => (
              <section key={section.title} className="mb-14 last:mb-0">
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-text-secondary md:text-[17px]">
                  {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="space-y-3 border-l border-brand-primary/50 pl-6">
                      {section.bullets.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>
        </main>
      </PageLayout>
    </div>
  )
}
