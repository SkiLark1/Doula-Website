import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-semibold text-white tracking-wide">
                Held & Heard
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-warm-light -mt-0.5">
                Doula Care
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Supportive, grounded care for your pregnancy, birth, and
              postpartum journey.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-medium">
              Quick Links
            </h4>
            <div className="space-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-white/60 hover:text-warm-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-medium">
              Connect
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:Maryna@heldandheardcare.com"
                className="block text-white/60 hover:text-warm-light transition-colors"
              >
                Maryna@heldandheardcare.com
              </a>
              <a
                href="tel:+15304404663"
                className="block text-white/60 hover:text-warm-light transition-colors"
              >
                (530) 440-4663
              </a>
              <a
                href="https://instagram.com/heldandheard.doulacare"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/60 hover:text-warm-light transition-colors"
              >
                @heldandheard.doulacare
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Held & Heard Doula Care. All
            rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart size={12} className="text-rose" fill="currentColor" /> for families
          </p>
        </div>
      </div>
    </footer>
  )
}
