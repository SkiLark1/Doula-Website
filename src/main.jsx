import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'

// Lightweight analytics tracker
const API_URL = import.meta.env.VITE_API_URL || ''
const visitorId = btoa(
  `${screen.width}${screen.height}${Intl.DateTimeFormat().resolvedOptions().timeZone}${navigator.language}`
)

let lastTrackedPath = ''
function trackPageView() {
  const path = window.location.pathname
  // Don't track admin pages or duplicate views
  if (path.includes('held-portal') || path === lastTrackedPath) return
  lastTrackedPath = path

  fetch(`${API_URL}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      referrer: document.referrer,
      visitorId,
    }),
  }).catch(() => {}) // Silently fail — analytics should never break the site
}

// Track initial page load
trackPageView()

// Track route changes via popstate and pushState/replaceState
const originalPush = history.pushState
const originalReplace = history.replaceState
history.pushState = function (...args) {
  originalPush.apply(this, args)
  setTimeout(trackPageView, 0)
}
history.replaceState = function (...args) {
  originalReplace.apply(this, args)
  setTimeout(trackPageView, 0)
}
window.addEventListener('popstate', () => setTimeout(trackPageView, 0))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
