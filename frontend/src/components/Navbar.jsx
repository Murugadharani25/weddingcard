import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export default function Navbar({ onCartClick }) {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-display text-2xl text-wine-500 shrink-0">
          Wedding<span className="text-gold-500">Kart</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 relative">
          <button
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
            className="relative"
          >
            <span className="text-sm font-medium text-ink-900 hover:text-wine-500 transition-colors">
              Collections ▾
            </span>
            {categoryOpen && (
              <div className="absolute top-full left-0 pt-3 w-64">
                <div className="card-storefront p-3 shadow-lg">
                  <Link to="/categories/bride" className="block px-3 py-2 rounded-md hover:bg-ivory-100 text-sm">
                    <span className="text-wine-500 font-medium">Bride</span> — Wear, Jewellery, Makeup
                  </Link>
                  <Link to="/categories/groom" className="block px-3 py-2 rounded-md hover:bg-ivory-100 text-sm">
                    <span className="text-groom-500 font-medium">Groom</span> — Wear, Footwear, Gifts
                  </Link>
                </div>
              </div>
            )}
          </button>
          <Link to="/my-orders" className="text-sm font-medium text-ink-900 hover:text-wine-500 transition-colors">
            My Orders
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onCartClick} className="relative text-xl" aria-label="Open cart">
            🛍️
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-wine-500 text-ivory-50 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
              className="w-9 h-9 rounded-full bg-wine-500 text-ivory-50 font-semibold flex items-center justify-center text-sm"
            >
              {user?.name?.charAt(0) || '?'}
              {accountOpen && (
                <div className="absolute top-full right-0 pt-3 w-48">
                  <div className="card-storefront p-2 shadow-lg text-left">
                    <p className="px-3 py-1.5 text-xs text-ink-500">{user?.name}</p>
                    <Link to="/my-orders" className="block px-3 py-1.5 rounded-md hover:bg-ivory-100 text-sm text-ink-900">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1.5 rounded-md hover:bg-ivory-100 text-sm text-wine-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
