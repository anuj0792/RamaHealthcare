import {
  Activity, Bed, Bandage, Check, ChevronRight, Cross, FlaskConical, Heart, HeartPulse,
  ScanLine, Search, Stethoscope, Syringe, Wind, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { findCategoryName } from '../data/products'
import { useCatalogue } from '../hooks/CatalogueContext'
import type { Category, Product } from '../types'

const categoryIcons = { heart: HeartPulse, stethoscope: Stethoscope, activity: Activity, scan: ScanLine, cross: Cross, wind: Wind, syringe: Syringe, bed: Bed, flask: FlaskConical, bandage: Bandage }

export function SearchBar({ value, onChange, onSubmit, placeholder = 'Search equipment, brand or model' }: {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
}) {
  return (
    <form className="search-bar" role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(value) }}>
      <Search size={19} aria-hidden="true" />
      <input aria-label="Search products" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {value && <button className="search-clear" type="button" aria-label="Clear search" onClick={() => onChange('')}><X size={17} /></button>}
      {onSubmit && <button className="search-submit" type="submit" aria-label="Submit search"><ChevronRight size={19} /></button>}
    </form>
  )
}

export function CategoryTile({ category, count }: { category: Category; count: number }) {
  const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] ?? HeartPulse
  return (
    <Link className="category-tile" to={`/explore?category=${category.id}`}>
      <span className="category-icon"><Icon size={21} strokeWidth={1.8} /></span>
      <span className="category-name">{category.name}</span>
      <span className="category-count">{count} {count === 1 ? 'item' : 'items'}</span>
    </Link>
  )
}

export function WishlistButton({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { savedIds, toggleSaved } = useCatalogue()
  const saved = savedIds.includes(product.id)
  return (
    <button className={`icon-button wishlist-button ${saved ? 'is-saved' : ''} ${compact ? 'is-compact' : ''}`} type="button" aria-label={saved ? `Remove ${product.name} from saved products` : `Save ${product.name}`} aria-pressed={saved} onClick={() => toggleSaved(product.id)}>
      <Heart size={compact ? 17 : 19} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}

export function CompareButton({ product }: { product: Product }) {
  const { compareIds, toggleCompare } = useCatalogue()
  const selected = compareIds.includes(product.id)
  const atLimit = compareIds.length >= 3 && !selected
  return (
    <button className={`compare-button ${selected ? 'is-selected' : ''}`} type="button" disabled={atLimit} aria-pressed={selected} title={atLimit ? 'Remove a product from comparison first' : undefined} onClick={() => toggleCompare(product.id)}>
      {selected ? <Check size={15} /> : <span className="compare-plus">+</span>}
      {selected ? 'Added to compare' : 'Compare'}
    </button>
  )
}

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article className={`product-card ${featured ? 'product-card-featured' : ''}`}>
      <div className="product-image-wrap">
        <Link to={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <img className="product-image" src={product.images[0]} alt="" loading="lazy" />
        </Link>
        <WishlistButton product={product} compact />
        {product.featured && <span className="product-tag">Featured</span>}
      </div>
      <div className="product-card-body">
        <span className="product-category">{findCategoryName(product.category)}</span>
        <Link className="product-title-link" to={`/products/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-brand">{product.brand} <span>-</span> {product.model}</p>
        <p className="product-description">{product.shortDescription}</p>
        <div className="product-card-footer"><CompareButton product={product} /><Link className="text-link" to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>Details <ChevronRight size={15} /></Link></div>
      </div>
    </article>
  )
}

export function ProductGrid({ items, emptyTitle = 'No products found', emptyText = 'Try a different search or category.' }: {
  items: Product[]
  emptyTitle?: string
  emptyText?: string
}) {
  if (items.length === 0) return <EmptyState title={emptyTitle} description={emptyText} />
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span className="empty-icon"><Heart size={22} /></span><h2>{title}</h2><p>{description}</p>{action}</div>
}

export function ProductActions({ product }: { product: Product }) {
  return <div className="product-actions"><WishlistButton product={product} /><CompareButton product={product} /></div>
}

