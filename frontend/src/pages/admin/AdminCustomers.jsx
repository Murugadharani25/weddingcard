import { useEffect, useState } from 'react'
import * as customerService from '../../services/customerService'
import Table from '../../components/Table'
import AdminLayout from '../../components/AdminLayout'
import { formatDate } from '../../utils/formatters'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    customerService.getCustomers().then(setCustomers)
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-ivory-50">Customers</h1>
          <p className="text-slate-400 text-sm mt-1">{customers.length} registered customer(s)</p>
        </div>

        <Table
          theme="admin"
          columns={['Name', 'Email', 'Phone', 'Registered On', 'Total Orders']}
          data={customers}
          renderRow={(c) => (
            <tr key={c.id} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
              <td className="px-4 py-3 text-ivory-50">{c.name}</td>
              <td className="px-4 py-3 text-slate-400">{c.email}</td>
              <td className="px-4 py-3 mono">{c.phone}</td>
              <td className="px-4 py-3">{formatDate(c.registeredOn)}</td>
              <td className="px-4 py-3 mono">{c.totalOrders}</td>
            </tr>
          )}
        />
      </div>
    </AdminLayout>
  )
}
