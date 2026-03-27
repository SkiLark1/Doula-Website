import { Leaf, Heart, Shield } from 'lucide-react'

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

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            About Me
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            The Heart Behind{' '}
            <span className="italic text-sage-dark">My Work</span>
          </h2>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-blush-light to-cream-dark overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <Leaf size={40} className="text-sage" />
                  </div>
                  <p className="text-sm text-charcoal-light italic">Your photo here</p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-sage/20 rounded-2xl -z-10" />
          </div>

          <div className="space-y-6">
            <h3 className="font-heading text-3xl md:text-4xl font-light text-charcoal">
              Hi, I'm Maryna
            </h3>
            <p className="text-charcoal-light leading-relaxed">
              I became a doula because I believe deeply that every family
              deserves respectful, compassionate support during one of life's
              most transformative experiences. My journey into birth work began
              from a place of passion for empowering families and ensuring that
              every voice is heard.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              As your doula, I bring a calm, steady presence to your birth
              space. I'm here to hold space for you, advocate for your wishes,
              and provide the continuous support that makes all the difference.
              Whether it's your first baby or your fourth, you'll never have to
              navigate this journey alone.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              My philosophy is simple: when you feel safe, informed, and
              supported, you can birth with confidence. I'm honored to walk
              alongside you.
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sage-dark font-medium hover:text-sage transition-colors group"
              >
                Let's connect
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Values */}
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
