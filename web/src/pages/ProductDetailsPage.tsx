import { ArrowLeft, ArrowUpRight, ChevronDown, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState, ProductActions, ProductGrid } from '../components/Catalogue'
import { findCategoryName, findProductBySlug, products } from '../data/products'
import { useCatalogue } from '../hooks/CatalogueContext'

export default function ProductDetailsPage() {
  const { slug = '' } = useParams()
  const product = findProductBySlug(slug)
  const { addRecentlyViewed } = useCatalogue()
  const [activeImage, setActiveImage] = useState(0)
  useEffect(() => { if (product) addRecentlyViewed(product.id) }, [product, addRecentlyViewed])

  if (!product) return <div className="page"><EmptyState title="Product not found" description="This product may have been removed from the catalogue." action={<Link className="button-primary" to="/explore">Browse equipment</Link>} /></div>

  const related = product.relatedProducts.map((id) => products.find((item) => item.id === id)).filter((item) => item !== undefined)

  return (
    <div className="page detail-page">
      <Link to="/explore" className="back-link"><ArrowLeft size={17} /> Back to catalogue</Link>
      <div className="detail-topline"><span>{findCategoryName(product.category)}</span><span className="detail-dot" /> <span>{product.brand}</span></div>
      <div className="detail-layout">
        <section className="product-gallery" aria-label="Product images">
          <div className="gallery-main"><img src={product.images[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} /></div>
          {product.images.length > 1 && <div className="gallery-thumbnails">{product.images.map((image, index) => <button key={image} type="button" aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === index} className={`gallery-thumb ${activeImage === index ? 'selected' : ''}`} onClick={() => setActiveImage(index)}><img src={image} alt="" /></button>)}</div>}
        </section>
        <section className="detail-summary">
          <span className="section-kicker">{product.brand}</span><h1>{product.name}</h1><p className="detail-model">Model <strong>{product.model}</strong></p><p className="detail-description">{product.description}</p>
          <div className="detail-caution">Demonstration catalogue listing. Specifications are illustrative and must be confirmed before use.</div>
          <div className="detail-actions"><Link className="button-primary" to="/profile">About Rama Medicine Company <ArrowUpRight size={15} /></Link><ProductActions product={product} /></div>
          <div className="quick-specs">{Object.entries(product.specifications).slice(0, 3).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        </section>
      </div>

      <section className="detail-sections"><span className="section-kicker">Product information</span><h2>Details at a glance</h2>
        <details className="detail-accordion" open><summary><span>Key features</span><ChevronDown size={18} /></summary><ul className="feature-list">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></details>
        <details className="detail-accordion"><summary><span>Technical specifications <small>Demonstration data</small></span><ChevronDown size={18} /></summary><dl className="spec-list">{Object.entries(product.specifications).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></details>
        <details className="detail-accordion"><summary><span>Brochures and manuals</span><ChevronDown size={18} /></summary><div className="document-list">{product.documents.length ? product.documents.map((document) => <a key={document.title} href={document.url}><FileText size={17} />{document.title}</a>) : <p>No documents have been added to this demonstration listing.</p>}</div></details>
      </section>
      {related.length > 0 && <section className="section-block related-section"><div className="section-heading"><div><span className="section-kicker">Continue exploring</span><h2>Related equipment</h2></div></div><ProductGrid items={related} /></section>}
    </div>
  )
}