import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'

// Admin
import { AuthProvider } from './admin/hooks/useAuth'
import ProtectedRoute from './admin/components/ProtectedRoute'
import LoginPage from './admin/pages/LoginPage'
import DashboardPage from './admin/pages/DashboardPage'
import QuotesPage from './admin/pages/QuotesPage'

const PORTAL = '/held-portal-m7k2x9'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith(PORTAL)

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <ScrollToTop />
        {!isAdmin && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin routes */}
          <Route path={`${PORTAL}/login`} element={<LoginPage />} />
          <Route
            path={`${PORTAL}/dashboard`}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${PORTAL}/quotes`}
            element={
              <ProtectedRoute>
                <QuotesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!isAdmin && <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App
