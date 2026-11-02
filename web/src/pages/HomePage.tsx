import { ArrowUpRight, BadgeCheck, ChevronRight, MapPin, MoveRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CategoryTile, ProductGrid, SearchBar } from '../components/Catalogue'
import { categories, manufacturers, products } from '../data/products'
import { useCatalogue } from '../hooks/CatalogueContext'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { recentlyViewedIds } = useCatalogue()
  const featured = products.find((product) => product.featured)!
  const recent = useMemo(() => recentlyViewedIds.map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined), [recentlyViewedIds])

  return (
    <div className="page home-page">
      <section className="home-intro">
        <div className="home-intro-copy">
          <div className="eyebrow"><span className="eyebrow-line" />A clearer way to find the right equipment</div>
          <h1>Care starts with<br /><span>the right tools.</span></h1>
          <p>Explore medical equipment and healthcare essentials, thoughtfully brought together.</p>
          <SearchBar value={query} onChange={setQuery} onSubmit={(value) => navigate(`/explore?q=${encodeURIComponent(value)}`)} />
          <div className="trust-note"><BadgeCheck size={16} /> Product details shown for catalogue demonstration</div>
        </div>
        <a className="home-storefront" href="https://www.google.com/maps/place/Rama+Medicine+Company/@26.7507539,83.3690388" target="_blank" rel="noreferrer" aria-label="View Rama Medicine Company in Gorakhpur on Google Maps">
          <img src="/images/rama-storefront.jpg" alt="Rama Medicine Company storefront in Gorakhpur" />
          <span className="storefront-caption"><MapPin size={14} /> Rama Medicine Company <span>Gorakhpur</span><ArrowUpRight size={14} /></span>
        </a>
      </section>

      <section className="featured-banner">
        <div className="featured-copy"><span className="section-kicker">A closer look</span><p className="featured-brand">{featured.brand} <span>-</span> {featured.model}</p><h2>{featured.name}</h2><p>{featured.shortDescription}</p><Link className="featured-link" to={`/products/${featured.slug}`}>Explore product <ArrowUpRight size={16} /></Link></div>
        <Link to={`/products/${featured.slug}`} className="featured-image-link" aria-label={`Explore ${featured.name}`}><img src={featured.images[0]} alt={featured.name} /></Link>
        <span className="banner-index">01 <span>/</span> 04</span>
      </section>

      <section className="section-block company-photos">
        <div className="section-heading"><div><span className="section-kicker">A look at our range</span><h2>At Rama Medicine Company</h2></div><a className="text-link" href="https://www.google.com/maps/place/Rama+Medicine+Company/@26.7507539,83.3690388" target="_blank" rel="noreferrer">View Maps listing <ArrowUpRight size={15} /></a></div>
        <div className="company-photo-grid">
          <figure><img src="/images/rama-equipment.jpg" alt="Exercise and rehabilitation equipment displayed at Rama Medicine Company" loading="lazy" /><figcaption>Equipment display</figcaption></figure>
          <figure><img src="/images/rama-wheelchair.jpg" alt="Wheelchair available in the Rama Medicine Company listing" loading="lazy" /><figcaption>Mobility equipment</figcaption></figure>
        </div>
        <p className="photo-credit">Photos from the Rama Medicine Company Google Maps listing.</p>
      </section>

      <section className="section-block category-section">
        <div className="section-heading"><div><span className="section-kicker">Browse by need</span><h2>Equipment categories</h2></div><Link to="/explore" className="text-link">View catalogue <ChevronRight size={16} /></Link></div>
        <div className="category-grid">{categories.map((category) => <CategoryTile key={category.id} category={category} count={products.filter((product) => product.category === category.id).length} />)}</div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="section-kicker">Selected for you</span><h2>Featured equipment</h2></div><Link to="/explore?sort=featured" className="text-link">See all <MoveRight size={16} /></Link></div>
        <ProductGrid items={products.filter((product) => product.featured)} />
      </section>

      <section className="section-block brands-section">
        <div className="section-heading"><div><span className="section-kicker">Explore the catalogue</span><h2>Manufacturers</h2></div><Link to="/explore" className="text-link">Browse products <ChevronRight size={16} /></Link></div>
        <div className="brand-list">{manufacturers.map((brand, index) => <Link key={brand} to={`/explore?brand=${encodeURIComponent(brand)}`} className="brand-chip"><span className="brand-monogram">{brand.split(' ').map((word) => word[0]).join('').slice(0, 2)}</span><span>{brand}</span><span className="brand-count">{products.filter((product) => product.brand === brand).length} products</span><span className="brand-arrow"><ArrowUpRight size={16} /></span><span className="brand-number">0{index + 1}</span></Link>)}</div>
      </section>

      {recent.length > 0 && <section className="section-block"><div className="section-heading"><div><span className="section-kicker">Pick up where you left off</span><h2>Recently viewed</h2></div></div><ProductGrid items={recent} /></section>}
    </div>
  )
}