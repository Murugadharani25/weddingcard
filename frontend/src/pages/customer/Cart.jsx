import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../utils/formatters'
import CustomerLayout from '../../components/CustomerLayout'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display text-3xl text-ink-900 mb-6">Your Bag</h1>

        {items.length === 0 ? (
          <div className="card-storefront p-10 text-center">
            <p className="text-ink-500 mb-4">Your bag is empty — browse the Bride or Groom collections.</p>
            <Link to="/categories/bride" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="card-storefront p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-md bg-ivory-100 flex items-center justify-center text-3xl shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ink-900">{item.name}</p>
                  <p className="mono text-sm text-ink-500">{formatCurrency(item.price)} each</p>
                </div>
                <input
                  type="number"
                  className="input w-20 text-center mono"
                  value={item.qty}
                  min={1}
                  onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                />
                <p className="mono font-semibold w-24 text-right">{formatCurrency(item.qty * item.price)}</p>
                <button onClick={() => removeItem(item.productId)} className="text-wine-500 text-sm">Remove</button>
              </div>
            ))}

            <div className="card-storefront p-5 flex items-center justify-between">
              <span className="text-ink-500">Subtotal</span>
              <span className="mono text-xl font-semibold text-wine-500">{formatCurrency(subtotal)}</span>
            </div>

            <button className="btn-primary w-full" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
