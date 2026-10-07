import { useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { legalUi } from '../../legal/legalContent'

const NOTICE_KEY = 'erni-tabash-privacy-notice'

export function PrivacyNotice() {
  const { language } = useLanguage()
  const t = legalUi[language]
  const [visible, setVisible] = useState(() => window.localStorage.getItem(NOTICE_KEY) !== 'acknowledged')

  const dismiss = () => {
    window.localStorage.setItem(NOTICE_KEY, 'acknowledged')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      aria-label={t.noticeTitle}
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-border-selected bg-surface-dark p-5 shadow-2xl sm:p-6"
    >
      <div className="flex items-start gap-4">
        <ShieldCheck className="mt-1 shrink-0 text-brand-primary" size={22} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-semibold text-text-primary">{t.noticeTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{t.noticeBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={dismiss} className="min-h-11 border border-brand-primary bg-brand-secondary px-5 text-sm font-medium text-brand-primary hover:bg-brand-primary hover:text-surface-dark">
              {t.understand}
            </button>
            <a className="inline-flex min-h-11 items-center px-2 text-sm text-text-secondary hover:text-brand-primary" href="/legal/cookies">{t.learnMore}</a>
          </div>
        </div>
        <button type="button" onClick={dismiss} className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-text-tertiary hover:text-text-primary" aria-label={t.understand}>
          <X size={19} aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}
