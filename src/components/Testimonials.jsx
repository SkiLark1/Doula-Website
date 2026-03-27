import { Heart } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-gradient-to-b from-blush-light to-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            Kind Words
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            Families I've{' '}
            <span className="italic text-sage-dark">Supported</span>
          </h2>
        </div>

        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
              <Heart size={28} className="text-sage" />
            </div>
            <h3 className="font-heading text-2xl font-medium text-charcoal mb-3">
              Testimonials Coming Soon
            </h3>
            <p className="text-charcoal-light leading-relaxed text-sm">
              Real stories from the families I've had the honor of supporting
              will be shared here soon. In the meantime, I'd love to connect
              and tell you more about what I do.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
