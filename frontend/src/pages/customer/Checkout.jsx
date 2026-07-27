import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import * as orderService from '../../services/orderService'
import { formatCurrency } from '../../utils/formatters'
import CustomerLayout from '../../components/CustomerLayout'

const EMPTY_SHIPPING = { fullName: '', address: '', city: '', pincode: '', phone: '' }

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [shipping, setShipping] = useState({ ...EMPTY_SHIPPING, fullName: user?.name || '' })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const tax = subtotal * 0.05
  const total = subtotal + tax

  function validate() {
    const errs = {}
    if (!shipping.fullName.trim()) errs.fullName = 'Required'
    if (!shipping.address.trim()) errs.address = 'Required'
    if (!shipping.city.trim()) errs.city = 'Required'
    if (!shipping.pincode.trim()) errs.pincode = 'Required'
    if (!shipping.phone.trim()) errs.phone = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleConfirmOrder(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      // Stubbed "Secure Checkout" — simulates a payment step without a real gateway.
      const order = await orderService.createOrder({
        customerId: user.id,
        items: items.map((i) => ({ productId: i.productId, qty: i.qty, price: i.price })),
        shipping: { ...shipping, paymentMethod },
      })
      clearCart()
      showToast('Order placed successfully')
      navigate(`/order-confirmation/${order.id}`)
    } catch (err) {
      showToast(err.message || 'Checkout failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-ink-500 mb-4">Your bag is empty.</p>
          <Link to="/categories/bride" className="btn-primary">Start Shopping</Link>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleConfirmOrder} className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">Shipping Details</h2>
            <div className="card-storefront p-5 space-y-3">
              <div>
                <label className="label block mb-1.5">Full Name</label>
                <input className="input w-full" value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} />
                {errors.fullName && <p className="text-wine-600 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="label block mb-1.5">Address</label>
                <input className="input w-full" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                {errors.address && <p className="text-wine-600 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label block mb-1.5">City</label>
                  <input className="input w-full" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                  {errors.city && <p className="text-wine-600 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="label block mb-1.5">Pincode</label>
                  <input className="input w-full mono" value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} />
                  {errors.pincode && <p className="text-wine-600 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
              <div>
                <label className="label block mb-1.5">Phone</label>
                <input className="input w-full mono" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                {errors.phone && <p className="text-wine-600 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink-900 mb-3">Payment</h2>
            <div className="card-storefront p-5 space-y-2">
              {[
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'upi', label: 'UPI' },
                { id: 'cod', label: 'Cash on Delivery' },
              ].map((method) => (
                <label key={method.id} className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  {method.label}
                </label>
              ))}
              <p className="text-xs text-ink-500 pt-2">
                This is a demo checkout — no real payment gateway is connected yet.
              </p>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Placing order…' : 'Confirm Order'}
          </button>
        </form>

        <div className="card-storefront p-5 h-fit space-y-3">
          <p className="label mb-1">Order Summary</p>
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-ink-900">{item.qty} × {item.name}</span>
              <span className="mono">{formatCurrency(item.qty * item.price)}</span>
            </div>
          ))}
          <div className="border-t border-ink-900/10 pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-ink-500">
              <span>Subtotal</span><span className="mono">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-500">
              <span>Tax (5%)</span><span className="mono">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span><span className="mono text-wine-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
