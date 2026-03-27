import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Having Maryna by my side during labor was the best decision I made. She was calm, encouraging, and helped me feel so empowered. I couldn\'t have done it without her.',
    name: 'Sarah M.',
    detail: 'First-time mom',
  },
  {
    quote:
      'Maryna\'s postpartum support was a lifesaver. She helped me feel like myself again during those overwhelming early weeks. Her warmth and knowledge made all the difference.',
    name: 'Jessica R.',
    detail: 'Mom of two',
  },
  {
    quote:
      'From our very first meeting, I felt heard and understood. Maryna created such a safe, supportive space for my partner and me. She truly goes above and beyond.',
    name: 'Amanda & Chris T.',
    detail: 'Parents of baby Lily',
  },
]

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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              <Quote
                size={32}
                className="text-sage/15 absolute top-6 right-6"
                fill="currentColor"
              />
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="text-warm"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-charcoal-light leading-relaxed mb-6 italic text-sm">
                "{t.quote}"
              </p>
              <div className="border-t border-cream-dark pt-4">
                <p className="font-heading text-lg font-medium text-charcoal">
                  {t.name}
                </p>
                <p className="text-xs text-warm-dark uppercase tracking-wider">
                  {t.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
