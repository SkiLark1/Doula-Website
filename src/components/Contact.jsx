import { useState } from 'react'
import { Mail, Phone, AtSign, Send } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, wire this to a form handler (Formspree, Netlify Forms, etc.)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-warm font-medium">
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mt-3">
            Let's Start Your{' '}
            <span className="italic text-sage-dark">Journey</span>
          </h2>
          <p className="mt-6 text-charcoal-light max-w-xl mx-auto leading-relaxed">
            Ready to feel supported? Book a free, no-obligation consultation and
            let's talk about your vision for your birth and postpartum
            experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-cream rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-medium text-charcoal mb-6">
                Reach Out
              </h3>
              <div className="space-y-5">
                <a
                  href="mailto:hello@heldandheard.com"
                  className="flex items-center gap-4 text-charcoal-light hover:text-sage-dark transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <Mail size={18} className="text-sage" />
                  </div>
                  <span className="text-sm">hello@heldandheard.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 text-charcoal-light hover:text-sage-dark transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <Phone size={18} className="text-sage" />
                  </div>
                  <span className="text-sm">(123) 456-7890</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 text-charcoal-light hover:text-sage-dark transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <AtSign size={18} className="text-sage" />
                  </div>
                  <span className="text-sm">@heldandheard.doulacare</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sage/10 to-blush-light rounded-2xl p-8 text-center">
              <p className="font-heading text-xl text-charcoal italic mb-2">
                "Every family deserves to feel
              </p>
              <p className="font-heading text-xl text-sage-dark italic">
                held and heard."
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-sage/5 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mb-6">
                  <Send size={28} className="text-sage" />
                </div>
                <h3 className="font-heading text-2xl font-medium text-charcoal mb-3">
                  Thank You!
                </h3>
                <p className="text-charcoal-light">
                  Your message has been received. I'll be in touch soon to
                  schedule your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
                      placeholder="(optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                      Due Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
                      placeholder="Approximate (optional)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                    Service Interest
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal"
                  >
                    <option value="">Select a service...</option>
                    <option value="birth">Birth Doula Support</option>
                    <option value="postpartum">Postpartum Doula Care</option>
                    <option value="both">Both Services</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-2 font-medium">
                    Tell Me About You
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/30 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all text-sm text-charcoal resize-none"
                    placeholder="Share a bit about yourself, your pregnancy, or any questions you have..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-sage text-white font-medium rounded-full hover:bg-sage-dark hover:shadow-lg transition-all duration-300 tracking-widest uppercase text-sm"
                >
                  Send Message
                </button>
                <p className="text-xs text-charcoal-light text-center">
                  I'll respond within 24 hours. Your information is always kept private.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
