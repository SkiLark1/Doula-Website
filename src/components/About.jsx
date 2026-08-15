import { Link } from 'react-router-dom'

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
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-blush-light to-cream-dark overflow-hidden relative">
              <img
                src="/about-maryna.jpg"
                alt="Maryna with her family on the beach"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-sage/20 rounded-2xl -z-10" />
          </div>

          <div className="space-y-6">
            <h3 className="font-heading text-3xl md:text-4xl font-light text-charcoal">
              Hi, I'm Maryna
            </h3>
            <p className="text-charcoal-light leading-relaxed">
              I'm a doula with a deep passion for supporting women and families
              through one of the most transformative seasons of life. My path
              into this work began with a strong appreciation for how personal
              and powerful pregnancy, birth, and postpartum can be. I have seen
              the difference it makes when someone feels truly supported, and I
              also understand how overwhelming it can feel without that presence.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              I believe every family deserves respectful and compassionate care,
              along with a space where their voice is heard and valued. As your
              doula, I bring a calm and steady presence to your experience. I
              offer guidance, encouragement, and continuous support so you feel
              prepared and cared for from beginning to end. Whether you are
              welcoming your first baby or growing your family, you do not have
              to go through this alone.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              My approach is rooted in a simple belief. When you feel safe,
              informed, and supported, you can move through your experience with
              confidence and trust in yourself. It is an honor to walk alongside
              you during this time, holding space for your unique journey and
              helping you feel seen and heard.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              When I am not supporting families, I am spending time with my two
              boys, soaking in the small, meaningful moments that make motherhood
              so special. They are a constant reminder of why this work matters
              so much to me, and I continue to grow and learn through both
              motherhood and the care I provide to others.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sage-dark font-medium hover:text-sage transition-colors group"
              >
                Let's connect
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
