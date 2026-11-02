import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type CatalogueContextValue = {
  savedIds: string[]
  compareIds: string[]
  recentlyViewedIds: string[]
  toggleSaved: (id: string) => void
  toggleCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  addRecentlyViewed: (id: string) => void
}

const CatalogueContext = createContext<CatalogueContextValue | null>(null)

function readStoredIds(key: string) {
  try {
    const stored = localStorage.getItem(key)
    const value: unknown = stored ? JSON.parse(stored) : []
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function CatalogueProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState(() => readStoredIds('rama-saved-products'))
  const [compareIds, setCompareIds] = useState(() => readStoredIds('rama-compare-products').slice(0, 3))
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => readStoredIds('rama-recently-viewed').slice(0, 4))

  const toggleSaved = useCallback((id: string) => setSavedIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]), [])
  const toggleCompare = useCallback((id: string) => setCompareIds((current) => {
    if (current.includes(id)) return current.filter((compareId) => compareId !== id)
    return current.length < 3 ? [...current, id] : current
  }), [])
  const removeFromCompare = useCallback((id: string) => setCompareIds((current) => current.filter((compareId) => compareId !== id)), [])
  const addRecentlyViewed = useCallback((id: string) => setRecentlyViewedIds((current) => current[0] === id ? current : [id, ...current.filter((viewedId) => viewedId !== id)].slice(0, 4)), [])

  useEffect(() => localStorage.setItem('rama-saved-products', JSON.stringify(savedIds)), [savedIds])
  useEffect(() => localStorage.setItem('rama-compare-products', JSON.stringify(compareIds)), [compareIds])
  useEffect(() => localStorage.setItem('rama-recently-viewed', JSON.stringify(recentlyViewedIds)), [recentlyViewedIds])

  const value = useMemo<CatalogueContextValue>(() => ({
    savedIds,
    compareIds,
    recentlyViewedIds,
    toggleSaved,
    toggleCompare,
    removeFromCompare,
    addRecentlyViewed,
  }), [savedIds, compareIds, recentlyViewedIds, toggleSaved, toggleCompare, removeFromCompare, addRecentlyViewed])

  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>
}

export function useCatalogue() {
  const context = useContext(CatalogueContext)
  if (!context) throw new Error('useCatalogue must be used within CatalogueProvider')
  return context
}