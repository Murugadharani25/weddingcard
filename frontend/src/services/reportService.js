import { getOrders } from './orderService'
import { getProducts } from './productService'

export function orderTotal(order) {
  return order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
}

export async function getAdminDashboardSummary() {
  const [orders, products] = await Promise.all([getOrders(), getProducts()])

  const totalProducts = products.length
  const pendingOrders = orders.filter((o) => o.status === 'processing').length
  const totalRevenue = orders.reduce((sum, o) => sum + orderTotal(o), 0)
  const recentOrders = [...orders].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5)

  return { totalProducts, pendingOrders, totalRevenue, recentOrders, totalOrders: orders.length }
}

export async function getSalesReport(startDate, endDate) {
  const [orders, products] = await Promise.all([getOrders(), getProducts()])
  const filtered = orders.filter((o) => (!startDate || o.date >= startDate) && (!endDate || o.date <= endDate))

  const revenueByDate = {}
  const qtyByProduct = {}
  filtered.forEach((o) => {
    revenueByDate[o.date] = (revenueByDate[o.date] || 0) + orderTotal(o)
    o.items.forEach((i) => {
      qtyByProduct[i.productId] = (qtyByProduct[i.productId] || 0) + i.qty
    })
  })

  const trend = Object.entries(revenueByDate)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, total]) => ({ date, total: Math.round(total) }))

  const topProducts = Object.entries(qtyByProduct)
    .map(([productId, qty]) => ({ product: products.find((p) => p.id === Number(productId)), qty }))
    .filter((row) => row.product)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)

  return {
    orders: filtered,
    totalRevenue: filtered.reduce((sum, o) => sum + orderTotal(o), 0),
    trend,
    topProducts,
  }
}
