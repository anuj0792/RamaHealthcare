import { GitCompareArrows, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { EmptyState } from '../components/Catalogue'
import { findCategoryName, products } from '../data/products'
import { useCatalogue } from '../hooks/CatalogueContext'

export default function ComparePage() {
  const { compareIds, removeFromCompare } = useCatalogue()
  const selected = compareIds.map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined)
  if (selected.length === 0) return <div className="page"><div className="page-heading"><div><span className="section-kicker">Make an informed choice</span><h1>Compare equipment</h1></div></div><EmptyState title="Your comparison is ready" description="Add up to three products from the catalogue to compare their details side by side." action={<Link className="button-primary" to="/explore">Explore equipment</Link>} /></div>

  const specLabels = [...new Set(selected.flatMap((product) => Object.keys(product.specifications).filter((label) => label !== 'Data status')))]
  return (
    <div className="page compare-page">
      <div className="page-heading"><div><span className="section-kicker">Make an informed choice</span><h1>Compare equipment</h1><p>{selected.length} of 3 products selected</p></div><Link className="text-link" to="/explore">Add products <GitCompareArrows size={16} /></Link></div>
      <div className="comparison-scroller"><div className="comparison-table" style={{ '--compare-columns': selected.length } as CSSProperties & { '--compare-columns': number }}>
        <div className="compare-label-column"><div className="compare-product-cell">Product</div><div className="compare-row-label">Manufacturer</div><div className="compare-row-label">Model</div><div className="compare-row-label">Category</div>{specLabels.map((label) => <div className="compare-row-label" key={label}>{label}</div>)}<div className="compare-row-label">Key features</div></div>
        {selected.map((product) => <div className="compare-product-column" key={product.id}>
          <div className="compare-product-cell"><button className="remove-compare" aria-label={`Remove ${product.name} from comparison`} onClick={() => removeFromCompare(product.id)}><X size={16} /></button><Link to={`/products/${product.slug}`}><img src={product.images[0]} alt="" /><h2>{product.name}</h2></Link></div>
          <div className="compare-value">{product.brand}</div><div className="compare-value">{product.model}</div><div className="compare-value">{findCategoryName(product.category)}</div>
          {specLabels.map((label) => <div className="compare-value" key={label}>{product.specifications[label] ?? '-'}</div>)}
          <div className="compare-value feature-value"><ul>{product.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        </div>)}
      </div></div>
      <p className="compare-disclaimer">Specifications are demonstration data. Confirm product details with Rama Medicine Company.</p>
    </div>
  )
}