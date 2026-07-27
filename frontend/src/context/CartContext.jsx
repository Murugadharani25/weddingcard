import { createContext, useState, useMemo } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ productId, name, price, qty, image, stock }]

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        if (existing.qty + 1 > product.stock) return prev
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      if (product.stock < 1) return prev
      return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, qty: 1, stock: product.stock }]
    })
  }

  function updateQty(productId, qty) {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, Math.min(qty, i.stock)) } : i))
    )
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}
