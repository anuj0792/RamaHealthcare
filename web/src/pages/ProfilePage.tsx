import { Bookmark, Building2, CircleHelp, GitCompareArrows, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCatalogue } from '../hooks/CatalogueContext'

export default function ProfilePage() {
  const { savedIds, compareIds } = useCatalogue()
  return <div className="page profile-page">
    <div className="page-heading"><div><span className="section-kicker">About this catalogue</span><h1>Rama Medicine Company</h1><p>Medical equipment and healthcare products.</p></div></div>
    <section className="profile-intro"><span className="profile-mark">R<span>+</span></span><div><span className="section-kicker">Rama Medicine Company</span><h2>Equipment for better-informed care.</h2><p>Browse the catalogue, review product information and create a shortlist for your team.</p></div></section>
    <div className="profile-links">
      <Link to="/saved"><span className="profile-link-icon"><Bookmark size={19} /></span><span><strong>Saved products</strong><small>Your catalogue shortlist</small></span><b>{savedIds.length}</b></Link>
      <Link to="/compare"><span className="profile-link-icon"><GitCompareArrows size={19} /></span><span><strong>Product comparison</strong><small>Compare up to three products</small></span><b>{compareIds.length}</b></Link>
      <div className="profile-link-static"><span className="profile-link-icon"><Building2 size={19} /></span><span><strong>About Rama Medicine Company</strong><small>Healthcare products catalogue</small></span></div>
      <div className="profile-link-static"><span className="profile-link-icon"><CircleHelp size={19} /></span><span><strong>Product enquiries</strong><small>Contact details can be configured by your team.</small></span></div>
    </div>
    <div className="privacy-note"><ShieldCheck size={19} /><span>Your saved products are stored locally on this device. No account or personal information is required.</span></div>
    <p className="profile-disclaimer">Product names, manufacturer labels and technical specifications in this initial catalogue are demonstration content and do not imply real product availability, certifications or clinical claims.</p>
  </div>
}