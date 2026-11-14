export default function Logo({ light = false, tagline = false }) {
  return (
    <a href="#top" className={`logo ${light ? 'logo--light' : ''}`} aria-label="United Addins home">
      <svg className="logo__mark" viewBox="0 0 64 44" aria-hidden="true">
        <defs>
          <linearGradient id="ua-u" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#2449e8" />
          </linearGradient>
          <linearGradient id="ua-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2449e8" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M6 6v16a12 12 0 0 0 24 0V6" fill="none" stroke="url(#ua-u)" strokeWidth="9" strokeLinecap="round" />
        <path d="M26 38 40 6h4l14 32" fill="none" stroke="url(#ua-a)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="logo__text">
        <strong>United Addins</strong>
        {tagline && <small>Digital Solutions. Together.</small>}
      </span>
    </a>
  )
}
