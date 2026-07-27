export default function Table({ columns, data, renderRow, emptyMessage = 'No records found.', theme = 'storefront' }) {
  const isAdmin = theme === 'admin'
  return (
    <div className={isAdmin ? 'card-admin overflow-hidden' : 'card-storefront overflow-hidden'}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b text-left ${isAdmin ? 'border-slate-700' : 'border-ink-900/10'}`}>
              {columns.map((col) => (
                <th key={col} className={`px-4 py-3 whitespace-nowrap ${isAdmin ? 'label-admin' : 'label'}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={`px-4 py-10 text-center ${isAdmin ? 'text-slate-400' : 'text-ink-500'}`}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => renderRow(row, idx))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
