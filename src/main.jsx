import React from 'react'
import ReactDOM from 'react-dom/client'
// Fonts are self-hosted (no request to Google Fonts — GDPR-friendly). Latin, plus Latin Extended for
// Polish (ą, ę, ł, ś, ż …): its unicode-range means browsers only download it on pages that use those letters.
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import '@fontsource/plus-jakarta-sans/latin-800-italic.css' // "Foxit" wordmark
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/plus-jakarta-sans/latin-ext-400.css'
import '@fontsource/plus-jakarta-sans/latin-ext-500.css'
import '@fontsource/plus-jakarta-sans/latin-ext-600.css'
import '@fontsource/plus-jakarta-sans/latin-ext-700.css'
import '@fontsource/plus-jakarta-sans/latin-ext-800.css'
import '@fontsource/instrument-serif/latin-ext-400-italic.css'
// Global styles first, so component styles can override them.
import './index.css'
import App from './App.jsx'
// Dark theme overrides last, so they win over the component styles.
import './dark.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
