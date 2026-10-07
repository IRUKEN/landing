import { Navigation } from './Navigation'
import { PrivacyNotice } from './PrivacyNotice'
import { SiteFooter } from './SiteFooter'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-tertiary">
      <Navigation />

      {/* Main content with top padding for fixed nav */}
      <div className="pt-20">
        {children}
      </div>
      <SiteFooter />
      <PrivacyNotice />
    </div>
  )
}
