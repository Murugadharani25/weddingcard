import { useEffect, useState } from 'react'
import * as productService from '../../services/productService'
import * as categoryService from '../../services/categoryService'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import AdminLayout from '../../components/AdminLayout'
import { formatCurrency } from '../../utils/formatters'
import { useToast } from '../../hooks/useToast'

const EMPTY = { name: '', category: '', subcategory: '', price: '', stock: '', description: '' }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const { showToast } = useToast()

  async function loadData() {
    const [prods, cats] = await Promise.all([productService.getProducts(), categoryService.getCategories()])
    setProducts(prods)
    setCategories(cats)
  }

  useEffect(() => { loadData() }, [])

  const subcategoriesFor = (categoryId) => categories.find((c) => c.id === categoryId)?.subcategories || []

  function openAdd() {
    setEditing(null)
    setForm(EMPTY)
    setFormOpen(true)
  }

  function openEdit(product) {
    setEditing(product)
    setForm({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      stock: product.stock,
      description: product.description,
    })
    setFormOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editing) {
      await productService.updateProduct(editing.id, payload)
      showToast('Product updated')
    } else {
      await productService.createProduct(payload)
      showToast('Product added')
    }
    setFormOpen(false)
    loadData()
  }

  async function handleDelete() {
    await productService.deleteProduct(deleteTarget.id)
    showToast('Product deleted')
    setDeleteTarget(null)
    loadData()
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ivory-50">Products</h1>
            <p className="text-slate-400 text-sm mt-1">{products.length} product(s)</p>
          </div>
          <button className="btn-admin-primary" onClick={openAdd}>+ Add Product</button>
        </div>

        <Table
          theme="admin"
          columns={['Product', 'Category', 'Price', 'Stock', 'Actions']}
          data={products}
          renderRow={(p) => (
            <tr key={p.id} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
              <td className="px-4 py-3 text-ivory-50">{p.image} {p.name}</td>
              <td className="px-4 py-3 text-slate-400 text-sm">{p.category} / {p.subcategory}</td>
              <td className="px-4 py-3 mono">{formatCurrency(p.price)}</td>
              <td className="px-4 py-3 mono">{p.stock}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="text-teal-400 text-sm" onClick={() => openEdit(p)}>Edit</button>
                  <button className="text-red-400 text-sm" onClick={() => setDeleteTarget(p)}>Delete</button>
                </div>
              </td>
            </tr>
          )}
        />

        <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Edit Product' : 'Add Product'} theme="admin">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-admin block mb-1.5">Product Name</label>
              <input className="input-admin w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-admin block mb-1.5">Category</label>
                <select
                  className="input-admin w-full"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: '' })}
                  required
                >
                  <option value="">Select…</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label-admin block mb-1.5">Sub-category</label>
                <select
                  className="input-admin w-full"
                  value={form.subcategory}
                  onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  required
                  disabled={!form.category}
                >
                  <option value="">Select…</option>
                  {subcategoriesFor(form.category).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-admin block mb-1.5">Price (₹)</label>
                <input type="number" className="input-admin w-full mono" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div>
                <label className="label-admin block mb-1.5">Stock</label>
                <input type="number" className="input-admin w-full mono" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="label-admin block mb-1.5">Description</label>
              <textarea className="input-admin w-full" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" className="btn-admin-secondary" onClick={() => setFormOpen(false)}>Cancel</button>
              <button type="submit" className="btn-admin-primary">{editing ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </form>
        </Modal>

        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setDeleteTarget(null)} />
            <div className="relative card-admin p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-ivory-50 mb-2">Delete product?</h3>
              <p className="text-slate-400 text-sm mb-5">
                This will permanently remove <span className="text-ivory-50">{deleteTarget.name}</span>.
              </p>
              <div className="flex justify-end gap-3">
                <button className="btn-admin-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="bg-red-500 hover:bg-red-400 text-ivory-50 font-semibold px-4 py-2 rounded-md" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
