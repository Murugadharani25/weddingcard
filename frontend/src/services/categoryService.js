import api from './api'
import { delay } from './mockStore'
import { mockCategories } from '../data/mockData'

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false'

export async function getCategories() {
  if (USE_MOCK) {
    await delay()
    return mockCategories
  }
  const res = await api.get('/categories/')
  return res.data
}
