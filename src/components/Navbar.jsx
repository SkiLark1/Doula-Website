import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Held & Heard Doula Care"
              className="h-12 md:h-14 w-auto"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-xl md:text-2xl font-semibold text-charcoal tracking-wide">
                Held & Heard
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-warm-dark font-medium -mt-0.5">
                Doula Care
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-charcoal-light hover:text-sage-dark transition-colors duration-300 tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-6 py-2.5 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark transition-all duration-300 tracking-wide uppercase"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-charcoal p-2 relative z-[110]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - portaled to body so it's always fullscreen */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 bg-cream z-[100] flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 text-charcoal p-2"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-heading font-medium text-charcoal hover:text-sage-dark transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="px-8 py-3 bg-sage text-white text-base font-medium rounded-full hover:bg-sage-dark transition-all duration-300 tracking-wide uppercase"
          >
            Book a Call
          </Link>
        </div>,
        document.body
      )}
    </>
  )
}
