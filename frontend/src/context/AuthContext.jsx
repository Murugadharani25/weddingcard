import { createContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('current_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  function persist(loggedInUser) {
    sessionStorage.setItem('current_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  async function loginCustomer(username, password) {
    const { user: u } = await authService.customerLogin(username, password)
    persist(u)
    return u
  }

  async function registerCustomer(payload) {
    const { user: u } = await authService.customerRegister(payload)
    persist(u)
    return u
  }

  async function loginAdmin(username, password) {
    const { user: u } = await authService.adminLogin(username, password)
    persist(u)
    return u
  }

  function logout() {
    authService.logout()
    sessionStorage.removeItem('current_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginCustomer, registerCustomer, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
