import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as orderService from '../../services/orderService'
import * as productService from '../../services/productService'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency, formatDate, titleCase } from '../../utils/formatters'
import CustomerLayout from '../../components/CustomerLayout'

const STATUS_STYLES = {
  processing: 'bg-gold-400/20 text-gold-500 border-gold-400/40',
  shipped: 'bg-blue-100 text-blue-600 border-blue-300',
  delivered: 'bg-groom-500/15 text-groom-500 border-groom-500/30',
  cancelled: 'bg-wine-500/15 text-wine-500 border-wine-500/30',
}

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    Promise.all([orderService.getOrders({ customerId: user.id }), productService.getProducts()]).then(([o, p]) => {
      setOrders(o)
      setProducts(p)
      setLoading(false)
    })
  }, [user.id])

  const productName = (id) => products.find((p) => p.id === id)?.name || '—'

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl text-ink-900 mb-6">My Orders</h1>

        {loading ? (
          <p className="text-ink-500">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="card-storefront p-10 text-center">
            <p className="text-ink-500 mb-4">You haven't placed any orders yet.</p>
            <Link to="/categories/bride" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
              return (
                <div key={order.id} className="card-storefront p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="mono text-sm text-ink-500">Order #{order.id}</p>
                      <p className="text-xs text-ink-500">{formatDate(order.date)}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] || ''}`}>
                      {titleCase(order.status)}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm text-ink-700">
                        <span>{item.qty} × {productName(item.productId)}</span>
                        <span className="mono">{formatCurrency(item.qty * item.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-ink-900/10 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="mono text-wine-500">{formatCurrency(total)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
