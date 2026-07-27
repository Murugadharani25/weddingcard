import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as productService from '../../services/productService'
import * as categoryService from '../../services/categoryService'
import ProductCard from '../../components/ProductCard'
import CustomerLayout from '../../components/CustomerLayout'

export default function Categories() {
  const { categoryId } = useParams() // 'bride' or 'groom'
  const [categories, setCategories] = useState([])
  const [subcategory, setSubcategory] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    categoryService.getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setSubcategory('')
  }, [categoryId])

  useEffect(() => {
    setLoading(true)
    productService.getProducts({ category: categoryId, subcategory: subcategory || undefined }).then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [categoryId, subcategory])

  const currentCategory = categories.find((c) => c.id === categoryId)
  const accentClass = categoryId === 'bride' ? 'text-wine-500' : 'text-groom-500'

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className={`font-display text-3xl mb-1 ${accentClass}`}>{currentCategory?.name || 'Collection'}</h1>
        <p className="text-ink-500 text-sm mb-6">{products.length} piece(s)</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSubcategory('')}
            className={`px-3 py-1.5 rounded-full text-sm border ${!subcategory ? 'bg-ink-900 text-ivory-50 border-ink-900' : 'border-ink-900/20 text-ink-900'}`}
          >
            All
          </button>
          {currentCategory?.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubcategory(sub.id)}
              className={`px-3 py-1.5 rounded-full text-sm border ${subcategory === sub.id ? 'bg-ink-900 text-ivory-50 border-ink-900' : 'border-ink-900/20 text-ink-900'}`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-ink-500">Loading…</p>
        ) : products.length === 0 ? (
          <p className="text-ink-500">No products found in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
