import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as productService from '../../services/productService'
import ProductCard from '../../components/ProductCard'
import CustomerLayout from '../../components/CustomerLayout'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    productService.getProducts().then((products) => setFeatured(products.slice(0, 6)))
  }, [])

  return (
    <CustomerLayout>
      <section className="bg-wine-500 text-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <p className="uppercase tracking-[0.2em] text-gold-300 text-xs mb-4">Two celebrations, one destination</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
            Everything for the Bride & Groom,<br /> beautifully in one place.
          </h1>
          <div className="gold-rule mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4">
            <Link to="/categories/bride" className="btn-gold">Shop Bride Collection</Link>
            <Link to="/categories/groom" className="bg-transparent border border-ivory-50 text-ivory-50 font-semibold px-5 py-2.5 rounded-md hover:bg-ivory-50 hover:text-wine-500 transition-colors">
              Shop Groom Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-ink-900">Featured Pieces</h2>
          <Link to="/categories/bride" className="text-sm text-wine-500 font-medium">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </CustomerLayout>
  )
}
