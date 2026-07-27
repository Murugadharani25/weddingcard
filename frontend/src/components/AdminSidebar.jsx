import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '◈' },
  { to: '/admin/products', label: 'Products', icon: '▤' },
  { to: '/admin/orders', label: 'Orders', icon: '⎘' },
  { to: '/admin/customers', label: 'Customers', icon: '⚉' },
  { to: '/admin/reports', label: 'Reports', icon: '▦' },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-700 flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-5 py-5 border-b border-slate-700">
          <p className="font-semibold text-lg text-ivory-50">WeddingKart</p>
          <p className="text-xs text-slate-400 mt-0.5">Admin Console</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm mb-1 transition-colors ${
                  isActive ? 'bg-teal-500/15 text-teal-400 font-medium' : 'text-slate-400 hover:text-ivory-50 hover:bg-slate-800'
                }`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
