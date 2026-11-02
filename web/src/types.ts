export type Category = {
  id: string
  name: string
  icon: string
}

export type ProductDocument = {
  title: string
  url: string
}

export type Product = {
  id: string
  name: string
  slug: string
  brand: string
  model: string
  category: string
  shortDescription: string
  description: string
  images: string[]
  specifications: Record<string, string>
  features: string[]
  documents: ProductDocument[]
  tags: string[]
  featured: boolean
  relatedProducts: string[]
}