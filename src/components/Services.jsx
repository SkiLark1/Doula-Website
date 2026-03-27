import { Link } from 'react-router-dom'
import { Baby, Moon, Heart, Clock, Users, Sparkles } from 'lucide-react'

const birthFeatures = [
  { icon: Users, text: 'Prenatal visits to build trust & prepare' },
  { icon: Heart, text: 'Continuous labor & delivery support' },
  { icon: Clock, text: 'On-call availability as your due date approaches' },
  { icon: Sparkles, text: 'Immediate postpartum support' },
]

const postpartumFeatures = [
  { icon: Heart, text: 'Physical recovery support & guidance' },
  { icon: Moon, text: 'Emotional support & active listening' },
  { icon: Baby, text: 'Newborn care & feeding guidance' },
  { icon: Sparkles, text: 'Creating space for rest & healing' },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            How I Can{' '}
            <span className="italic text-sage-dark">Support You</span>
          </h2>
          <p className="mt-6 text-charcoal-light max-w-2xl mx-auto leading-relaxed">
            Every family's journey is unique. I offer thoughtful, personalized
            care that meets you exactly where you are.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Birth Doula */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center mb-6 group-hover:bg-sage/20 transition-colors">
              <Baby size={28} className="text-sage" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-charcoal mb-3">
              Birth Doula Support
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Continuous, compassionate support from pregnancy through birth.
              I'll be your steady anchor, helping you feel prepared, empowered,
              and confident as you welcome your baby into the world.
            </p>

            <div className="space-y-4">
              {birthFeatures.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon size={16} className="text-warm-dark" />
                  </div>
                  <span className="text-sm text-charcoal-light">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-cream-dark">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark transition-all duration-300 tracking-wide uppercase"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Postpartum Doula */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-warm/10 flex items-center justify-center mb-6 group-hover:bg-warm/20 transition-colors">
              <Moon size={28} className="text-warm-dark" />
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-medium text-charcoal mb-3">
              Postpartum Doula Care
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Gentle, nurturing support after baby arrives. I help you navigate
              the beautiful and sometimes overwhelming early days, so you can
              focus on healing and bonding with your little one.
            </p>

            <div className="space-y-4">
              {postpartumFeatures.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon size={16} className="text-warm-dark" />
                  </div>
                  <span className="text-sm text-charcoal-light">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-cream-dark">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark transition-all duration-300 tracking-wide uppercase"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
