import api from './api'
import { delay, nextId } from './mockStore'
import { mockAdminUsers, mockCustomerUsers } from '../data/mockData'

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false'
let customers = [...mockCustomerUsers]

function issueSession(user) {
  const fakeToken = `mock-jwt-${user.id}-${Date.now()}`
  sessionStorage.setItem('access_token', fakeToken)
  return fakeToken
}

export async function customerLogin(username, password) {
  if (USE_MOCK) {
    await delay(400)
    const user = customers.find((u) => u.username === username && u.password === password)
    if (!user) throw new Error('Invalid username or password')
    const token = issueSession(user)
    return { token, user: { id: user.id, username: user.username, role: 'customer', name: user.name, email: user.email } }
  }
  const res = await api.post('/auth/customer/login/', { username, password })
  const { access, user } = res.data
  sessionStorage.setItem('access_token', access)
  return { token: access, user }
}

export async function customerRegister({ name, username, email, password }) {
  if (USE_MOCK) {
    await delay(400)
    if (customers.some((u) => u.username === username)) {
      throw new Error('That username is already taken')
    }
    const newUser = { id: nextId(), username, password, name, email, role: 'customer' }
    customers.push(newUser)
    const token = issueSession(newUser)
    return { token, user: { id: newUser.id, username, role: 'customer', name, email } }
  }
  const res = await api.post('/auth/customer/register/', { name, username, email, password })
  const { access, user } = res.data
  sessionStorage.setItem('access_token', access)
  return { token: access, user }
}

export async function adminLogin(username, password) {
  if (USE_MOCK) {
    await delay(400)
    const user = mockAdminUsers.find((u) => u.username === username && u.password === password)
    if (!user) throw new Error('Invalid admin credentials')
    const token = issueSession(user)
    return { token, user: { id: user.id, username: user.username, role: 'admin', name: user.name } }
  }
  const res = await api.post('/auth/admin/login/', { username, password })
  const { access, user } = res.data
  sessionStorage.setItem('access_token', access)
  return { token: access, user }
}

export function logout() {
  sessionStorage.removeItem('access_token')
}
