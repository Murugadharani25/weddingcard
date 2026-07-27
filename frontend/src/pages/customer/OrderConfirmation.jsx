import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as orderService from '../../services/orderService'
import * as productService from '../../services/productService'
import { formatCurrency, formatDate } from '../../utils/formatters'
import CustomerLayout from '../../components/CustomerLayout'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    orderService.getOrder(orderId).then(setOrder)
    productService.getProducts().then(setProducts)
  }, [orderId])

  if (!order) {
    return (
      <CustomerLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-ink-500">Loading your order…</div>
      </CustomerLayout>
    )
  }

  const productName = (id) => products.find((p) => p.id === id)?.name || '—'
  const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CustomerLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-display text-3xl text-ink-900 mb-2">Order Confirmed!</h1>
        <p className="text-ink-500 mb-1">Thank you — your celebration essentials are on their way.</p>
        <p className="mono text-wine-500 font-semibold text-lg mb-8">Order #{order.id}</p>

        <div className="card-storefront p-6 text-left space-y-3 mb-6">
          <p className="label mb-1">Order placed on {formatDate(order.date)}</p>
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{item.qty} × {productName(item.productId)}</span>
              <span className="mono">{formatCurrency(item.qty * item.price)}</span>
            </div>
          ))}
          <div className="border-t border-ink-900/10 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="mono text-wine-500">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link to="/my-orders" className="btn-secondary">View My Orders</Link>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </CustomerLayout>
  )
}
