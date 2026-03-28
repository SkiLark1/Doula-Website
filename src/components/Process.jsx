import { MessageCircle, BookOpen, Heart, Sun } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Free Consultation',
    description:
      'We start with a relaxed, no-pressure conversation. This is your chance to share your hopes, ask questions, and see if we\'re the right fit for each other.',
  },
  {
    icon: BookOpen,
    number: '02',
    title: 'Preparation & Planning',
    description:
      'Through prenatal visits, we build a relationship of trust. I help you create a birth plan, practice comfort measures, and prepare emotionally for the journey ahead.',
  },
  {
    icon: Heart,
    number: '03',
    title: 'Birth Support',
    description:
      'When the time comes, I\'m right there with you. Continuous support through labor and delivery, including physical comfort, emotional reassurance, and supporting your choices.',
  },
  {
    icon: Sun,
    number: '04',
    title: 'Postpartum Care',
    description:
      'After baby arrives, I check in to support your recovery, help with newborn care, and ensure you\'re adjusting well. You\'re never alone in those early days.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            The Journey
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            What to{' '}
            <span className="italic text-sage-dark">Expect</span>
          </h2>
          <p className="mt-6 text-charcoal-light max-w-2xl mx-auto leading-relaxed">
            Working together is simple and intuitive. Here's how our journey
            unfolds, step by step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-sage/30 to-sage/10" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center group-hover:bg-sage/10 transition-colors duration-300">
                    <step.icon size={32} className="text-sage" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-warm text-white text-xs font-semibold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
