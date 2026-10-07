import { useLanguage } from '../../i18n/LanguageProvider'
import { legalUi } from '../../legal/legalContent'

export function SiteFooter() {
  const { language } = useLanguage()
  const t = legalUi[language]

  return (
    <footer className="border-t border-border-primary bg-surface-dark/40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-9 text-sm text-text-tertiary md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <p>© 2026 Erni Tabash Sequeira · Costa Rica</p>
          <nav aria-label={t.legal} className="flex flex-wrap gap-x-6 gap-y-3">
            <a className="min-h-11 content-center hover:text-brand-primary" href="/legal/terms">{t.terms}</a>
            <a className="min-h-11 content-center hover:text-brand-primary" href="/legal/privacy">{t.privacy}</a>
            <a className="min-h-11 content-center hover:text-brand-primary" href="/legal/cookies">{t.cookies}</a>
            <a className="min-h-11 content-center hover:text-brand-primary" href="mailto:ernitabash01@gmail.com">{t.contact}</a>
          </nav>
        </div>
        <p className="border-t border-border-secondary pt-5 font-mono text-[11px] leading-5">
          {language === 'es'
            ? 'Sin analítica, publicidad ni cookies de seguimiento.'
            : 'No analytics, advertising, or tracking cookies.'}
        </p>
      </div>
    </footer>
  )
}
