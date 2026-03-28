import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useApi() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const apiFetch = async (path, options = {}) => {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (res.status === 401) {
      logout()
      navigate('/held-portal-m7k2x9/login')
      throw new Error('Session expired')
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || `Request failed (${res.status})`)
    }

    return res.json()
  }

  return { apiFetch }
}
