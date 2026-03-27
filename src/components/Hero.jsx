import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const DUST_COLORS = ['#C4A882', '#D4BE9C', '#8B9E8B', '#A8B9A8', '#E8D5C4', '#C9A9A6']

function DustLetter({ char, delay }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || char === ' ') return

    const particles = []
    const timer = setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        const dot = document.createElement('span')
        const color = DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)]
        const size = 2 + Math.random() * 3
        const angle = -30 + Math.random() * 120 // scatter upward-ish
        const distance = 12 + Math.random() * 20
        const tx = Math.cos((angle * Math.PI) / 180) * distance
        const ty = -Math.abs(Math.sin((angle * Math.PI) / 180) * distance)
        dot.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          top: 50%;
          left: 50%;
          pointer-events: none;
          opacity: 0;
          box-shadow: 0 0 ${3 + Math.random() * 4}px ${color}90;
          animation: dust-fly 0.5s ease-out ${i * 0.03}s both;
          --tx: ${tx}px;
          --ty: ${ty}px;
        `
        el.appendChild(dot)
        particles.push(dot)
      }
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      particles.forEach((p) => p.remove())
    }
  }, [char, delay])

  if (char === ' ') {
    return <span className="inline-block w-[0.25em]" />
  }

  return (
    <span
      ref={ref}
      className="dust-letter relative inline-block"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {char}
    </span>
  )
}

function MaterializeText({ text, startDelay = 0.4 }) {
  const chars = text.split('')
  const perChar = 0.08

  return (
    <span className="inline-block">
      {chars.map((char, i) => (
        <DustLetter key={i} char={char} delay={startDelay + i * perChar} />
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-light via-cream to-cream" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-warm/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Small accent */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <div className="h-px w-12 bg-warm" />
          <Heart size={14} className="text-warm" fill="currentColor" />
          <div className="h-px w-12 bg-warm" />
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-charcoal leading-[1.1] mb-6 animate-fade-in-up">
          You Deserve to Feel
          <span className="block font-medium italic text-sage-dark mt-2">
            <MaterializeText text="Held & Heard" startDelay={0.6} />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-charcoal-light font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up-delay">
          Supportive, grounded care for your pregnancy, birth, and postpartum
          journey. Feel informed, confident, and truly cared for every step of
          the way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <Link
            to="/contact"
            className="px-10 py-4 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage-dark hover:shadow-lg transition-all duration-300 tracking-widest uppercase"
          >
            Book a Free Consultation
          </Link>
          <Link
            to="/services"
            className="px-10 py-4 border border-warm text-warm-dark text-sm font-medium rounded-full hover:bg-warm hover:text-white transition-all duration-300 tracking-widest uppercase"
          >
            Explore Services
          </Link>
        </div>

        {/* Gentle scroll indicator */}
        <a
          href="#values"
          className="mt-14 animate-fade-in-up-delay-2 inline-block animate-gentle-bounce"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            className="text-warm/50 hover:text-warm transition-colors duration-300"
          >
            <path
              d="M2 2 L12 11 L22 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
