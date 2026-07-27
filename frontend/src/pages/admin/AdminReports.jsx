import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import * as reportService from '../../services/reportService'
import AdminLayout from '../../components/AdminLayout'
import { formatCurrency } from '../../utils/formatters'

export default function AdminReports() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [report, setReport] = useState(null)

  useEffect(() => {
    reportService.getSalesReport(startDate, endDate).then(setReport)
  }, [startDate, endDate])

  function exportCSV() {
    if (!report) return
    const rows = [
      ['Order ID', 'Date', 'Items', 'Total'],
      ...report.orders.map((o) => [o.id, o.date, o.items.length, o.items.reduce((s, i) => s + i.qty * i.price, 0).toFixed(2)]),
    ]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-report-${startDate || 'all'}-to-${endDate || 'all'}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold text-ivory-50">Sales Report</h1>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="label-admin block mb-1.5">From</label>
            <input type="date" className="input-admin" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="label-admin block mb-1.5">To</label>
            <input type="date" className="input-admin" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button className="btn-admin-secondary" onClick={exportCSV}>Export CSV</button>
        </div>

        {report && (
          <>
            <div className="card-admin p-5">
              <p className="label-admin mb-1">Total Revenue</p>
              <p className="text-3xl font-semibold text-teal-400">{formatCurrency(report.totalRevenue)}</p>
            </div>

            <div className="card-admin p-5">
              <p className="label-admin mb-4">Revenue Trend</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={report.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#293754" />
                  <XAxis dataKey="date" stroke="#8493B0" fontSize={12} />
                  <YAxis stroke="#8493B0" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: '#1B2740', border: '1px solid #293754', borderRadius: 8, color: '#FDF6F0' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Line type="monotone" dataKey="total" stroke="#3FA6A0" strokeWidth={2} dot={{ fill: '#3FA6A0' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card-admin p-5">
              <p className="label-admin mb-4">Top Selling Products</p>
              <div className="space-y-3">
                {report.topProducts.length === 0 && <p className="text-slate-400 text-sm">No sales in this period.</p>}
                {report.topProducts.map((row) => (
                  <div key={row.product.id} className="flex items-center justify-between text-sm">
                    <span className="text-ivory-50">{row.product.name}</span>
                    <span className="mono text-teal-400">{row.qty} sold</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
