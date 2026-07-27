export default function StatCard({ label, value, sublabel }) {
  return (
    <div className="card-admin p-5">
      <p className="label-admin mb-2">{label}</p>
      <p className="text-3xl font-semibold text-ivory-50">{value}</p>
      {sublabel && <p className="text-xs text-slate-400 mt-1">{sublabel}</p>}
    </div>
  )
}
