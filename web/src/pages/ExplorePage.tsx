import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid, SearchBar } from '../components/Catalogue'
import { categories, findCategoryName, manufacturers, products } from '../data/products'

export default function ExplorePage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const category = params.get('category') ?? ''
  const brand = params.get('brand') ?? ''
  const sort = params.get('sort') ?? 'recommended'
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    const results = products.filter((product) => {
      const matchesSearch = !search || [product.name, product.brand, product.model, findCategoryName(product.category), ...product.tags].join(' ').toLowerCase().includes(search)
      return matchesSearch && (!category || product.category === category) && (!brand || product.brand === brand)
    })
    if (sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'brand') results.sort((a, b) => a.brand.localeCompare(b.brand))
    if (sort === 'featured') results.sort((a, b) => Number(b.featured) - Number(a.featured))
    return results
  }, [query, category, brand, sort])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const resetFilters = () => {
    setQuery('')
    setParams({}, { replace: true })
  }

  return (
    <div className="page explore-page">
      <div className="page-heading"><div><span className="section-kicker">Find what you need</span><h1>Explore equipment</h1><p>Browse the catalogue by product, manufacturer or category.</p></div><button className={`filter-toggle ${filtersOpen ? 'active' : ''}`} type="button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filters <span>{Number(Boolean(category)) + Number(Boolean(brand))}</span></button></div>
      <SearchBar value={query} onChange={setQuery} placeholder="Search name, manufacturer or model" />
      <div className={`filter-panel ${filtersOpen ? 'filters-open' : ''}`}>
        <label className="select-filter"><span>Category</span><select value={category} onChange={(event) => updateParam('category', event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label className="select-filter"><span>Manufacturer</span><select value={brand} onChange={(event) => updateParam('brand', event.target.value)}><option value="">All manufacturers</option>{manufacturers.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-filter"><span>Sort by</span><select value={sort} onChange={(event) => updateParam('sort', event.target.value)}><option value="recommended">Recommended</option><option value="featured">Featured first</option><option value="name">Name A-Z</option><option value="brand">Manufacturer A-Z</option></select></label>
        {(category || brand || query) && <button className="clear-filters" type="button" onClick={resetFilters}><X size={15} /> Clear all</button>}
      </div>
      <div className="results-heading"><span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}</span>{category && <button className="active-filter" onClick={() => updateParam('category', '')}>{categories.find((item) => item.id === category)?.name}<X size={13} /></button>}{brand && <button className="active-filter" onClick={() => updateParam('brand', '')}>{brand}<X size={13} /></button>}</div>
      <ProductGrid items={filtered} emptyText="No products match these filters. Try broadening your search." />
    </div>
  )
}