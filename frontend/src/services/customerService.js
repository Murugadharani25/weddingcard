import api from './api'
import { delay } from './mockStore'
import { mockCustomers } from '../data/mockData'

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false'
let customers = [...mockCustomers]

export async function getCustomers() {
  if (USE_MOCK) {
    await delay()
    return [...customers]
  }
  const res = await api.get('/customers/')
  return res.data
}
