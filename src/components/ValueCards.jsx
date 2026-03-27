import { Heart, Shield, Leaf } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Compassionate Presence',
    description:
      'I believe every birthing person deserves unwavering emotional support and a calm, steady presence throughout their journey.',
  },
  {
    icon: Shield,
    title: 'Judgment-Free Support',
    description:
      'Your choices are honored here. I provide evidence-based information so you can make empowered decisions that feel right for you.',
  },
  {
    icon: Leaf,
    title: 'Holistic Care',
    description:
      'Birth is more than a physical event. I nurture your emotional, mental, and spiritual wellbeing from pregnancy through postpartum.',
  },
]

export default function ValueCards() {
  return (
    <section id="values" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="text-center p-8 rounded-2xl bg-cream/50 hover:bg-cream transition-colors duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-sage/20 transition-colors duration-300">
                <v.icon size={28} className="text-sage" />
              </div>
              <h4 className="font-heading text-xl font-medium text-charcoal mb-3">
                {v.title}
              </h4>
              <p className="text-sm text-charcoal-light leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
