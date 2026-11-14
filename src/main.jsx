import React from 'react'
import ReactDOM from 'react-dom/client'
// Fonts are self-hosted (no request to Google Fonts — GDPR-friendly). Latin subset only.
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import '@fontsource/plus-jakarta-sans/latin-800-italic.css' // "Foxit" wordmark
import '@fontsource/instrument-serif/latin-400-italic.css'
// Global styles first, so component styles can override them.
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
