import { Navigation } from './Navigation'

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-tertiary">
      <Navigation />

      {/* Main content with top padding for fixed nav */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}
