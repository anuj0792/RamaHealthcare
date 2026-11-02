import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState, ProductGrid } from '../components/Catalogue'
import { products } from '../data/products'
import { useCatalogue } from '../hooks/CatalogueContext'

export default function SavedPage() {
  const { savedIds } = useCatalogue()
  const saved = savedIds.map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined)
  return <div className="page saved-page">
    <div className="page-heading"><div><span className="section-kicker">Your shortlist</span><h1>Saved products</h1><p>{saved.length} {saved.length === 1 ? 'product' : 'products'} saved on this device</p></div></div>
    {saved.length ? <ProductGrid items={saved} emptyTitle="No saved products" /> : <EmptyState title="Nothing saved just yet" description="Save equipment you want to revisit. Your shortlist stays on this device." action={<Link className="button-primary" to="/explore"><Bookmark size={16} /> Explore equipment</Link>} />}
  </div>
}