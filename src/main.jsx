import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

// StrictMode intentionally double-renders to surface bugs, which roughly doubles
// initial CPU work. We only need it during development.
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  root.render(<App />)
}

// Register the service worker far enough after first paint that it does not
// compete with hydration or above-the-fold rendering for the main thread.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const register = () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* Registration failures are non-fatal; the app still works without offline support. */
    })
  }
  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(register, { timeout: 4000 })
    } else {
      window.setTimeout(register, 2000)
    }
  }
  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
}
