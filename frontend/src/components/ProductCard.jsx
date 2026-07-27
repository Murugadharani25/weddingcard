import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatters'

export default function ProductCard({ product }) {
  const ribbonColor = product.category === 'bride' ? 'bg-wine-500' : 'bg-groom-500'

  return (
    <Link to={`/products/${product.id}`} className="card-storefront overflow-hidden group block">
      <div className="relative bg-ivory-100 h-48 flex items-center justify-center text-6xl">
        {product.image}
        <span className={`absolute top-2 left-2 text-[10px] uppercase tracking-wide text-ivory-50 px-2 py-0.5 rounded-full ${ribbonColor}`}>
          {product.category}
        </span>
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wide bg-gold-400 text-ink-900 px-2 py-0.5 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wide bg-ink-900 text-ivory-50 px-2 py-0.5 rounded-full">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-ink-900 leading-snug group-hover:text-wine-500 transition-colors">{product.name}</p>
        <p className="mono text-wine-500 font-semibold mt-1">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  )
}
