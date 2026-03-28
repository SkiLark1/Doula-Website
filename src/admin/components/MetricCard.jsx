import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export default function MetricCard({ title, value, icon: Icon, tooltip, change, color = 'sage' }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const colorMap = {
    sage: 'bg-sage/10 text-sage',
    warm: 'bg-warm/10 text-warm-dark',
    blush: 'bg-blush/10 text-rose',
    charcoal: 'bg-gray-100 text-charcoal',
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 relative">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-gray-300 hover:text-gray-500 transition-colors"
          >
            <HelpCircle size={16} />
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-7 w-56 bg-charcoal text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 leading-relaxed">
              {tooltip}
              <div className="absolute -top-1.5 right-2 w-3 h-3 bg-charcoal rotate-45" />
            </div>
          )}
        </div>
      </div>
      <p className="text-2xl font-semibold text-charcoal">{value}</p>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{title}</p>
    </div>
  )
}
