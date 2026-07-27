import api from './api'
import { delay, nextId } from './mockStore'
import { mockOrders } from '../data/mockData'
import { getProduct } from './productService'

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false'
let orders = [...mockOrders]

export async function getOrders({ customerId } = {}) {
  if (USE_MOCK) {
    await delay()
    const list = customerId ? orders.filter((o) => o.customerId === customerId) : orders
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1))
  }
  const res = await api.get('/orders/', { params: customerId ? { customerId } : {} })
  return res.data
}

export async function getOrder(id) {
  if (USE_MOCK) {
    await delay()
    return orders.find((o) => o.id === Number(id))
  }
  const res = await api.get(`/orders/${id}/`)
  return res.data
}

// items = [{ productId, qty, price }]
export async function createOrder({ customerId, items, shipping }) {
  if (USE_MOCK) {
    await delay(600)
    // Validate stock
    for (const item of items) {
      const product = await getProduct(item.productId)
      if (!product) throw new Error('A product in your cart is no longer available')
      if (product.stock < item.qty) {
        throw new Error(`Only ${product.stock} left of "${product.name}"`)
      }
    }
    const newOrder = {
      id: nextId(),
      customerId,
      date: new Date().toISOString().slice(0, 10),
      status: 'processing',
      items,
      shipping,
    }
    orders.push(newOrder)
    return newOrder
  }
  const res = await api.post('/orders/', { customerId, items, shipping })
  return res.data
}

export async function updateOrderStatus(id, status) {
  if (USE_MOCK) {
    await delay()
    orders = orders.map((o) => (o.id === id ? { ...o, status } : o))
    return orders.find((o) => o.id === id)
  }
  const res = await api.put(`/orders/${id}/`, { status })
  return res.data
}

export async function deleteOrder(id) {
  if (USE_MOCK) {
    await delay()
    orders = orders.filter((o) => o.id !== id)
    return true
  }
  await api.delete(`/orders/${id}/`)
  return true
}
