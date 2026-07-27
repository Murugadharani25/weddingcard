import { useEffect, useState } from 'react'
import * as orderService from '../../services/orderService'
import * as productService from '../../services/productService'
import * as customerService from '../../services/customerService'
import Table from '../../components/Table'
import AdminLayout from '../../components/AdminLayout'
import { formatCurrency, formatDate, titleCase } from '../../utils/formatters'
import { useToast } from '../../hooks/useToast'

const STATUS_OPTIONS = ['processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const { showToast } = useToast()

  async function loadData() {
    const [o, p, c] = await Promise.all([orderService.getOrders(), productService.getProducts(), customerService.getCustomers()])
    setOrders(o)
    setProducts(p)
    setCustomers(c)
  }

  useEffect(() => { loadData() }, [])

  const productName = (id) => products.find((p) => p.id === id)?.name || '—'
  const customerName = (id) => customers.find((c) => c.id === id)?.name || '—'
  const orderTotal = (o) => o.items.reduce((sum, i) => sum + i.qty * i.price, 0)

  async function handleStatusChange(order, status) {
    await orderService.updateOrderStatus(order.id, status)
    showToast(`Order #${order.id} updated to ${status}`)
    loadData()
  }

  async function handleDelete(order) {
    await orderService.deleteOrder(order.id)
    showToast(`Order #${order.id} deleted`)
    loadData()
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold text-ivory-50">Orders</h1>

        <Table
          theme="admin"
          columns={['Order #', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions']}
          data={orders}
          renderRow={(order) => (
            <tr key={order.id} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
              <td className="px-4 py-3 mono text-slate-400">#{order.id}</td>
              <td className="px-4 py-3 text-ivory-50">{customerName(order.customerId)}</td>
              <td className="px-4 py-3">{formatDate(order.date)}</td>
              <td className="px-4 py-3 text-sm text-slate-400 max-w-[220px] truncate" title={order.items.map((i) => productName(i.productId)).join(', ')}>
                {order.items.map((i) => productName(i.productId)).join(', ')}
              </td>
              <td className="px-4 py-3 mono">{formatCurrency(orderTotal(order))}</td>
              <td className="px-4 py-3">
                <select
                  className="input-admin text-xs py-1"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
                </select>
              </td>
              <td className="px-4 py-3">
                <button className="text-red-400 text-sm" onClick={() => handleDelete(order)}>Delete</button>
              </td>
            </tr>
          )}
        />
      </div>
    </AdminLayout>
  )
}
