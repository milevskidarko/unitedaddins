import { useEffect, useRef, useState } from 'react'

// Shared by the quote form (Contact.jsx) and the partner form (PartnerForm.jsx).
export const SALES_EMAIL = 'salesemea@unitedaddins.com'

// Requests go to our own Vercel function (/api/quote → Resend e-mail, protected by
// Cloudflare Turnstile). Until that is configured (no RESEND_API_KEY on Vercel, or local
// `npm run dev` without functions), requests fall back to FormSubmit as before.
const API_ENDPOINT = '/api/quote'
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
// FormSubmit sends straight to salesemea@ (the address is public on the site anyway). The old
// alias '29844412…' was most likely the developer's test inbox (a test landed there, Nov 2026).
// Can be overridden in .env.local (VITE_FORM_EMAIL=you@example.com) for local testing.
// Only in `npm run dev`: a production build (e.g. for upload to cPanel) always sends to sales,
// even when .env.local is present on the machine that builds it.
const FALLBACK_ENDPOINT = `https://formsubmit.co/ajax/${(import.meta.env.DEV && import.meta.env.VITE_FORM_EMAIL) || SALES_EMAIL}`

// Sends one request to sales. `kind` is 'quote' or 'partner' (changes the e-mail heading).
// Throws when it could not be delivered.
export async function sendForm({ kind = 'quote', subject, replyTo, details, turnstileToken, honey }) {
  let res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ kind, subject, replyTo, details, turnstileToken, website: honey }),
  }).catch(() => null)
  const isJson = res?.headers.get('content-type')?.includes('application/json')
  let json = isJson ? await res.json().catch(() => ({})) : {}

  // Our function is not deployed/configured yet → send through FormSubmit instead.
  if (!res || !isJson || json.fallback) {
    res = await fetch(FALLBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _replyto: replyTo, _template: 'table', _captcha: 'false', ...details }),
    })
    json = await res.json().catch(() => ({}))
  }
  if (!res.ok || json.success === 'false' || json.success === false || json.ok === false) throw new Error(json.message)
}

// Loads Cloudflare Turnstile once and renders the (mostly invisible) check into `ref`.
let turnstileScript
export function useTurnstile(enabled, lang) {
  const ref = useRef(null)
  const widget = useRef(null)
  const [token, setToken] = useState('')
  useEffect(() => {
    if (!enabled || !TURNSTILE_SITE_KEY || !ref.current) return
    let cancelled = false
    turnstileScript ||= new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
    turnstileScript
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        widget.current = window.turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
          language: lang,
          appearance: 'interaction-only',
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        })
      })
      .catch(() => { /* blocked by an extension: the server decides */ })
    return () => {
      cancelled = true
      if (widget.current != null && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
      setToken('')
    }
  }, [enabled, lang])
  const reset = () => {
    setToken('')
    if (widget.current != null && window.turnstile) window.turnstile.reset(widget.current)
  }
  // True when the check is set up but has not passed yet (called at submit time).
  const pending = () => Boolean(TURNSTILE_SITE_KEY && window.turnstile && !token)
  return { ref, token, reset, pending }
}

// A short burst of confetti behind the success check (skipped with reduced motion via CSS).
export const CONFETTI = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2
  const dist = 90 + ((i * 37) % 70)
  return {
    '--x': `${Math.cos(angle) * dist}px`,
    '--y': `${Math.sin(angle) * dist - 30}px`,
    '--r': `${(i * 67) % 360}deg`,
    '--c': ['#2449e8', '#60a5fa', '#7c5cff', '#22c55e', '#ff5f1f', '#ffc145'][i % 6],
    '--delay': `${(i % 5) * 0.03}s`,
  }
})
