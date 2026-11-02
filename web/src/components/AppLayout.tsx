import { Activity, Bookmark, GitCompareArrows, HeartPulse, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

const navigation = [
  { to: '/', label: 'Home', Icon: HeartPulse, end: true },
  { to: '/explore', label: 'Explore', Icon: Activity },
  { to: '/compare', label: 'Compare', Icon: GitCompareArrows, badge: true },
  { to: '/saved', label: 'Saved', Icon: Bookmark, badge: true },
  { to: '/profile', label: 'Profile', Icon: UserRound },
]

export function AppLayout({ counts, children }: { counts: { saved: number; compare: number }; children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <NavLink className="brand-lockup" to="/" aria-label="Rama Medicine Company home">
            <span className="brand-symbol">R<span>+</span></span>
            <span className="brand-name">rama<span>medicine company</span></span>
          </NavLink>
          <div className="header-caption"><span className="status-dot" />Medical equipment catalogue</div>
          <NavLink className="header-saved" to="/saved" aria-label={`Saved products: ${counts.saved}`}><Bookmark size={18} /><span>{counts.saved}</span></NavLink>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <nav className="bottom-navigation" aria-label="Main navigation">
        {navigation.map(({ to, label, Icon, end, badge }) => {
          const count = label === 'Saved' ? counts.saved : counts.compare
          return <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <span className="nav-icon-wrap"><Icon size={20} strokeWidth={1.9} />{badge && count > 0 && <span className="nav-badge">{count}</span>}</span>
            <span>{label}</span>
          </NavLink>
        })}
      </nav>
      <footer className="app-footer"><span>Rama Medicine Company</span><span>Product information for demonstration purposes.</span></footer>
    </div>
  )
}