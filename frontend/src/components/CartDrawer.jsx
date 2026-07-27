import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatters'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  function goToCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transition-transform duration-200 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-900/10">
          <p className="font-display text-lg">Your Bag</p>
          <button onClick={onClose} className="text-xl text-ink-500">×</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 && (
            <p className="text-ink-500 text-sm text-center mt-10">
              Your bag is empty — browse the Bride or Groom collections.
            </p>
          )}
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <div className="w-14 h-14 rounded-md bg-ivory-100 flex items-center justify-center text-2xl shrink-0">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-900 truncate">{item.name}</p>
                <p className="text-xs text-ink-500 mono">{formatCurrency(item.price)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    className="input w-16 py-1 text-center mono text-xs"
                    value={item.qty}
                    min={1}
                    onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                  />
                  <button onClick={() => removeItem(item.productId)} className="text-xs text-wine-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-900/10 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink-500">Subtotal</span>
              <span className="mono font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <button className="btn-primary w-full" onClick={goToCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
