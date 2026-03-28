import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loader2, Heart } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/held-portal-m7k2x9/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-warm" />
            <Heart size={14} className="text-warm" fill="currentColor" />
            <div className="h-px w-8 bg-warm" />
          </div>
          <h1 className="font-heading text-3xl font-light text-charcoal">Held & Heard</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-warm mt-2">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-all duration-300 tracking-widest uppercase text-sm disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
