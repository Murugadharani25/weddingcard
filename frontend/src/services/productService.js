import api from './api'
import { delay, nextId } from './mockStore'
import { mockProducts } from '../data/mockData'

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false'
let products = [...mockProducts]

export async function getProducts({ category, subcategory } = {}) {
  if (USE_MOCK) {
    await delay()
    return products.filter(
      (p) => (!category || p.category === category) && (!subcategory || p.subcategory === subcategory)
    )
  }
  const params = {}
  if (category) params.category = category
  if (subcategory) params.subcategory = subcategory
  const res = await api.get('/products/', { params })
  return res.data
}

export async function getProduct(id) {
  if (USE_MOCK) {
    await delay()
    return products.find((p) => p.id === Number(id))
  }
  const res = await api.get(`/products/${id}/`)
  return res.data
}

export async function createProduct(payload) {
  if (USE_MOCK) {
    await delay()
    const newProduct = { id: nextId(), image: '🎁', ...payload }
    products.push(newProduct)
    return newProduct
  }
  const res = await api.post('/products/', payload)
  return res.data
}

export async function updateProduct(id, payload) {
  if (USE_MOCK) {
    await delay()
    products = products.map((p) => (p.id === id ? { ...p, ...payload } : p))
    return products.find((p) => p.id === id)
  }
  const res = await api.put(`/products/${id}/`, payload)
  return res.data
}

export async function deleteProduct(id) {
  if (USE_MOCK) {
    await delay()
    products = products.filter((p) => p.id !== id)
    return true
  }
  await api.delete(`/products/${id}/`)
  return true
}
