import { useEffect, useState } from 'react'
import * as reportService from '../../services/reportService'
import * as productService from '../../services/productService'
import StatCard from '../../components/StatCard'
import AdminLayout from '../../components/AdminLayout'
import { formatCurrency, formatDate, titleCase } from '../../utils/formatters'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    reportService.getAdminDashboardSummary().then(setSummary)
    productService.getProducts().then(setProducts)
  }, [])

  const productName = (id) => products.find((p) => p.id === id)?.name || '—'

  if (!summary) {
    return (
      <AdminLayout>
        <p className="text-slate-400">Loading dashboard…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-ivory-50">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Overview of your WeddingKart store.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Products" value={summary.totalProducts} />
          <StatCard label="Pending Orders" value={summary.pendingOrders} />
          <StatCard label="Total Revenue" value={formatCurrency(summary.totalRevenue)} />
          <StatCard label="Total Orders" value={summary.totalOrders} />
        </div>

        <div className="card-admin p-5">
          <p className="label-admin mb-4">Recent Orders</p>
          <div className="space-y-2">
            {summary.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between text-sm border-b border-slate-700 last:border-0 pb-2">
                <span className="mono text-slate-400">#{order.id}</span>
                <span className="text-ivory-50 flex-1 px-3 truncate">
                  {order.items.map((i) => productName(i.productId)).join(', ')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30 mr-3">
                  {titleCase(order.status)}
                </span>
                <span className="text-xs text-slate-400">{formatDate(order.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
