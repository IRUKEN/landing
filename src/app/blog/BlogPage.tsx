import { ArrowUpRight, Braces, Cloud, Clock3 } from 'lucide-react'
import { motion } from 'motion/react'
import { PageLayout } from '../components/layout/PageLayout'
import { useLanguage } from '../i18n/LanguageProvider'
import { useTranslations } from '../i18n/translations'
import { getLocalizedPosts } from './blogData'

const visualIcons = [Cloud, Braces]

export function BlogPage() {
  const { language } = useLanguage()
  const t = useTranslations(language)
  const [featured, ...posts] = getLocalizedPosts(language)

  return (
    <div className="dark min-h-screen bg-brand-tertiary text-text-primary">
      <PageLayout>
        <section className="relative overflow-hidden border-b border-border-secondary">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(96,165,250,0.15),transparent_34rem)]" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 font-mono text-xs tracking-[0.24em] text-brand-primary"
            >
              {t.heroKicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-8xl"
            >
              {t.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl"
            >
              {t.heroDescription}
            </motion.p>
          </div>
        </section>

        <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <article className="group grid overflow-hidden border border-brand-primary/35 bg-surface-bg md:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 sm:p-10 md:p-14">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-wider text-text-tertiary">
                <span className="border border-brand-primary/35 bg-brand-secondary px-3 py-1.5 text-brand-primary">{t.featured}</span>
                <span>{featured.category}</span>
              </div>
              <h2 className="mt-8 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl md:text-5xl">
                <a className="transition-colors hover:text-brand-primary" href={`/blog/${featured.slug}`}>{featured.title}</a>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">{featured.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs text-text-tertiary">
                <time dateTime={featured.date}>{featured.displayDate}</time>
                <span className="inline-flex items-center gap-2"><Clock3 size={14} />{featured.readTime}</span>
              </div>
              <a href={`/blog/${featured.slug}`} className="mt-10 inline-flex min-h-11 items-center gap-2 font-medium text-brand-primary hover:text-text-primary">
                {t.readFieldNote} <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="relative hidden min-h-[440px] place-items-center border-l border-border-primary bg-surface-dark md:grid" aria-hidden="true">
              <div className="absolute h-72 w-72 rounded-full border border-brand-primary/25" />
              <div className="absolute h-48 w-48 rounded-full border border-brand-primary/35" />
              <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-secondary text-brand-primary shadow-[0_0_70px_rgba(96,165,250,0.22)]">
                <Cloud size={38} strokeWidth={1.4} />
              </div>
            </div>
          </article>

          <section className="py-20 md:py-28" aria-labelledby="latest-notes">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-border-primary pb-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-brand-primary">{t.latestWriting}</p>
                <h2 id="latest-notes" className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{t.latestArticles}</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-text-tertiary">{t.latestDescription}</p>
            </div>
            <div className="grid gap-px bg-border-primary md:grid-cols-2">
              {posts.map((post, index) => {
                const Icon = visualIcons[index % visualIcons.length]
                return (
                  <article key={post.slug} className="group flex min-h-[360px] flex-col bg-brand-tertiary p-7 transition-colors hover:bg-surface-bg sm:p-10">
                    <div className="flex items-start justify-between gap-5">
                      <span className="font-mono text-[11px] tracking-wider text-brand-primary">{post.category}</span>
                      <Icon className="text-text-tertiary transition-colors group-hover:text-brand-primary" size={22} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="mt-9 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                      <a className="hover:text-brand-primary" href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className="mt-4 max-w-xl leading-7 text-text-secondary">{post.excerpt}</p>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-10">
                      <div className="font-mono text-[11px] leading-5 text-text-tertiary"><time dateTime={post.date}>{post.displayDate}</time><br />{post.readTime}</div>
                      <a className="inline-flex h-11 w-11 items-center justify-center border border-border-primary text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary" href={`/blog/${post.slug}`} aria-label={`${t.readArticle}: ${post.title}`}>
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </main>

        <footer className="border-t border-border-primary">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 text-sm text-text-tertiary md:flex-row md:items-center md:justify-between md:px-8">
            <p>© 2026 Erni Tabash Sequeira</p>
            <p className="font-mono text-xs">{t.footerTopics}</p>
          </div>
        </footer>
      </PageLayout>
    </div>
  )
}
