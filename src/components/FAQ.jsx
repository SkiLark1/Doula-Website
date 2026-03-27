import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What exactly does a doula do?',
    a: 'A doula provides continuous emotional, physical, and informational support during pregnancy, birth, and postpartum. I\'m not a medical provider — I\'m your dedicated support person who helps you feel informed, empowered, and cared for throughout your journey.',
  },
  {
    q: 'When should I hire a doula?',
    a: 'Ideally, reach out during your second trimester so we have plenty of time to build our relationship and prepare together. However, I welcome inquiries at any stage of pregnancy — it\'s never too early or too late to get support.',
  },
  {
    q: 'Do you support all types of births?',
    a: 'Absolutely. Whether you\'re planning a natural birth, hospital birth, birth center birth, home birth, or cesarean birth, I am here to support your choices without judgment. Every birth is beautiful, and every family deserves support.',
  },
  {
    q: 'Will my partner feel left out?',
    a: 'Not at all! I work with your partner, not in place of them. I help your partner feel confident and involved, showing them comfort techniques and giving them breaks when needed. Many partners say having a doula made them feel more connected to the experience.',
  },
  {
    q: 'What if I need a cesarean birth?',
    a: 'I provide support for all birth outcomes, including cesarean births. I\'ll be there to provide emotional support, help you understand what\'s happening, advocate for your preferences, and support your immediate postpartum experience.',
  },
  {
    q: 'What does postpartum doula support look like?',
    a: 'Postpartum support is all about you. I help with newborn care guidance, feeding support, light household tasks, emotional check-ins, and creating space for you to rest and recover. It\'s having someone in your corner during those tender early weeks.',
  },
  {
    q: 'How much does it cost?',
    a: 'Every family\'s needs are different, so I offer customized packages. Let\'s chat during a free consultation so I can understand your needs and share pricing that fits. I want this support to be accessible for the families who need it.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            Common Questions
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            Frequently{' '}
            <span className="italic text-sage-dark">Asked</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-cream/30 transition-colors"
              >
                <span className="font-heading text-lg font-medium text-charcoal pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-sage flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <p className="px-6 pb-6 text-charcoal-light leading-relaxed text-sm">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
