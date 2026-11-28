// Vercel serverless function: receives a quote request (contact form) or a partner application
// (partner form),
// checks it is not a bot (Cloudflare Turnstile) and e-mails it to sales via Resend.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY          required  – from resend.com (domain unitedaddins.com verified there)
//   QUOTE_FROM              optional  – sender, default "United Addins Website <quotes@unitedaddins.com>"
//   QUOTE_TO                optional  – recipient, default salesemea@unitedaddins.com
//   TURNSTILE_SECRET_KEY    optional  – from Cloudflare Turnstile; when set, every request must pass the check
//   VITE_TURNSTILE_SITE_KEY (client)  – the matching public site key, used by the form
//
// Without RESEND_API_KEY the function answers { fallback: true } and the form sends through
// FormSubmit as before, so the site keeps working while the keys are being set up.

const MAX_FIELD = 2000

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const clean = (v) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, MAX_FIELD)
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function verifyTurnstile(token, ip) {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token || '' })
  if (ip) body.set('remoteip', ip)
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const json = await r.json().catch(() => ({}))
  return json.success === true
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ ok: false, fallback: true })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = null }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, message: 'Invalid request' })

  // Honeypot: pretend success so bots learn nothing.
  if (body.website) return res.status(200).json({ ok: true })

  if (process.env.TURNSTILE_SECRET_KEY) {
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    const human = await verifyTurnstile(body.turnstileToken, ip).catch(() => false)
    if (!human) return res.status(403).json({ ok: false, message: 'Verification failed' })
  }

  const details = body.details && typeof body.details === 'object' ? body.details : {}
  const rows = Object.entries(details)
    .slice(0, 30)
    .map(([k, v]) => [clean(k).slice(0, 80), clean(v)])
    .filter(([, v]) => v)
  const replyTo = clean(body.replyTo)
  // body.kind: 'quote' (contact form, needs products) or 'partner' (partner form, needs the company).
  const partner = body.kind === 'partner'
  const field = (name) => rows.find(([k]) => k === name)?.[1]
  const email = field('Email')
  if (!field(partner ? 'Company' : 'Products') || !email || !isEmail(email)) {
    return res.status(400).json({ ok: false, message: partner ? 'Missing company or e-mail' : 'Missing products or e-mail' })
  }

  const subject = clean(body.subject).slice(0, 200) || (partner ? 'Partner application' : 'Quote request')
  const heading = partner ? 'New partner application' : 'New quote request'
  const source = partner ? 'the partner form' : 'the quote form'
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0b1640">
<h2 style="margin:0 0 12px">${heading}</h2>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="background:#f1f4fc;border:1px solid #e3e8f4;white-space:nowrap">${escapeHtml(k)}</th>` +
      `<td style="border:1px solid #e3e8f4">${escapeHtml(v)}</td></tr>`
  )
  .join('\n')}
</table>
<p style="font-size:12px;color:#5a6684">Sent from ${source} on unitedaddins.com — reply to answer the customer directly.</p>
</body></html>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM || 'United Addins Website <quotes@unitedaddins.com>',
      to: [process.env.QUOTE_TO || 'salesemea@unitedaddins.com'],
      reply_to: isEmail(replyTo) ? replyTo : email,
      subject,
      html,
      text,
    }),
  }).catch(() => null)

  if (!r || !r.ok) {
    const detail = r ? await r.text().catch(() => '') : 'network error'
    console.error('Resend error', r?.status, detail)
    return res.status(502).json({ ok: false, message: 'Could not send the request' })
  }
  return res.status(200).json({ ok: true })
}
