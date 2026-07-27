import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as productService from '../../services/productService'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { formatCurrency } from '../../utils/formatters'
import CustomerLayout from '../../components/CustomerLayout'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addItem } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    productService.getProduct(id).then(setProduct)
  }, [id])

  if (!product) {
    return (
      <CustomerLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-ink-500">Loading…</div>
      </CustomerLayout>
    )
  }

  function handleAddToCart() {
    addItem(product)
    showToast(`Added "${product.name}" to your bag`)
  }

  function handleBuyNow() {
    addItem(product)
    navigate('/checkout')
  }

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-ivory-100 rounded-lg flex items-center justify-center text-[10rem] aspect-square">
          {product.image}
        </div>
        <div>
          <p className={`text-xs uppercase tracking-wide font-medium mb-2 ${product.category === 'bride' ? 'text-wine-500' : 'text-groom-500'}`}>
            {product.category}
          </p>
          <h1 className="font-display text-3xl text-ink-900 mb-3">{product.name}</h1>
          <p className="mono text-2xl text-wine-500 font-semibold mb-4">{formatCurrency(product.price)}</p>
          <p className="text-ink-700 leading-relaxed mb-6">{product.description}</p>

          <p className="text-sm text-ink-500 mb-6">
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently out of stock'}
          </p>

          <div className="flex gap-3">
            <button className="btn-secondary flex-1" onClick={handleAddToCart} disabled={product.stock < 1}>
              Add to Bag
            </button>
            <button className="btn-primary flex-1" onClick={handleBuyNow} disabled={product.stock < 1}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
