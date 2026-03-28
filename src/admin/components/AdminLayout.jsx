import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const PORTAL = '/held-portal-m7k2x9'

const navItems = [
  { name: 'Dashboard', href: `${PORTAL}/dashboard`, icon: LayoutDashboard },
  { name: 'Quotes', href: `${PORTAL}/quotes`, icon: MessageSquare },
]

export default function AdminLayout({ children }) {
  const { email, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal text-white transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="font-heading text-xl font-light">Held & Heard</h1>
          <p className="text-xs text-white/50 mt-1 tracking-wider uppercase">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-sage text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-3 truncate">{email}</p>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-heading text-lg">Held & Heard Admin</h1>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
