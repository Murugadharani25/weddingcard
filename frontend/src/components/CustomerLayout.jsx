import { useState } from 'react'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'

export default function CustomerLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ivory-50">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main>{children}</main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
