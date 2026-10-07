import { ArrowLeft, Clock3 } from 'lucide-react'
import { PageLayout } from '../components/layout/PageLayout'
import { useLanguage } from '../i18n/LanguageProvider'
import { useTranslations } from '../i18n/translations'
import { getLocalizedPost } from './blogData'

export function ArticlePage({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const t = useTranslations(language)
  const post = getLocalizedPost(slug, language)

  if (!post) {
    return (
      <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
        <PageLayout>
          <main className="mx-auto max-w-3xl px-5 py-28 md:px-8">
            <p className="font-mono text-xs tracking-[0.2em] text-brand-primary">{t.notFoundKicker}</p>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em]">{t.notFoundTitle}</h1>
            <a className="mt-10 inline-flex min-h-11 items-center gap-2 text-brand-primary hover:text-text-primary" href="/blog"><ArrowLeft size={18} /> {t.backToBlog}</a>
          </main>
        </PageLayout>
      </div>
    )
  }

  return (
    <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
      <PageLayout>
        <main>
          <header className="border-b border-border-secondary">
            <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
              <a className="inline-flex min-h-11 items-center gap-2 font-medium text-text-secondary hover:text-brand-primary" href="/blog"><ArrowLeft size={18} /> {t.backToBlog}</a>
              <p className="mt-12 font-mono text-xs tracking-[0.2em] text-brand-primary">{post.category}</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-5xl md:text-7xl">{post.title}</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-text-secondary md:text-xl">{post.lede}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs text-text-tertiary">
                <time dateTime={post.date}>{post.displayDate}</time>
                <span className="inline-flex items-center gap-2"><Clock3 size={14} />{post.readTime}</span>
              </div>
            </div>
          </header>

          <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
            {post.sections.map(section => (
              <section key={section.title} className="mb-14 last:mb-0">
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-4xl">{section.title}</h2>
                <div className="mt-6 space-y-6 text-[17px] leading-8 text-text-secondary md:text-lg">
                  {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="space-y-3 border-l border-brand-primary/50 pl-6">
                      {section.bullets.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {section.code && (
                    <pre className="overflow-x-auto border border-border-primary bg-surface-dark p-5 font-mono text-sm leading-7 text-brand-primary"><code>{section.code}</code></pre>
                  )}
                </div>
              </section>
            ))}
          </article>

          <aside className="border-t border-border-primary bg-surface-bg">
            <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8">
              <div><p className="font-mono text-xs tracking-[0.18em] text-brand-primary">{t.continueExploring}</p><p className="mt-2 text-text-secondary">{t.moreNotes}</p></div>
              <a className="inline-flex min-h-11 items-center gap-2 border border-border-selected px-5 font-medium text-brand-primary hover:bg-brand-secondary" href="/blog">{t.viewAllArticles}</a>
            </div>
          </aside>
        </main>
      </PageLayout>
    </div>
  )
}
