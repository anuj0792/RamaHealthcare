import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { CatalogueProvider, useCatalogue } from './hooks/CatalogueContext'
import ComparePage from './pages/ComparePage'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import SavedPage from './pages/SavedPage'

function RoutedApp() {
  const { savedIds, compareIds } = useCatalogue()
  const location = useLocation()
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return <AppLayout counts={{ saved: savedIds.length, compare: compareIds.length }}>
    {!online && <div className="offline-banner" role="status">You are offline. Catalogue pages are available; product photos may need a connection.</div>}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/products/:slug" element={<ProductDetailsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </AppLayout>
}

export default function App() {
  return <CatalogueProvider><RoutedApp /></CatalogueProvider>
}