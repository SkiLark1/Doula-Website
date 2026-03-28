import { createElement, createContext, useContext, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [email, setEmail] = useState(() => localStorage.getItem('admin_email'))
  const [loading, setLoading] = useState(false)

  const isAuthenticated = !!token

  const login = async (emailInput, password) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await res.json()
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_email', data.email)
      setToken(data.token)
      setEmail(data.email)
      return true
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    setToken(null)
    setEmail(null)
  }

  return createElement(AuthContext.Provider, { value: { token, email, isAuthenticated, loading, login, logout } }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
