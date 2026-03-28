import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export default function ServiceArea() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 mb-6">
          <MapPin size={28} className="text-sage" />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
          Serving Families in{' '}
          <span className="italic text-sage-dark">Redding, CA</span>
        </h2>
        <p className="text-charcoal-light leading-relaxed max-w-xl mx-auto mb-8">
          I proudly serve families in Redding, California and the surrounding areas.
          If you're unsure whether you're within my service area, don't
          hesitate to reach out. I'm happy to chat!
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sage-dark font-medium hover:text-sage transition-colors group"
        >
          Check if I serve your area
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  )
}
