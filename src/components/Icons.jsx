const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const Arrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Chevron = (p) => (
  <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>
)
export const Doc = (p) => (
  <svg {...base} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>
)
// Product categories (Documents & PDF, Design & CAD, Planning).
export const Files = (p) => (
  <svg {...base} {...p}><path d="M15 2H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7z" /><path d="M15 2v5h5M4 7v13a2 2 0 0 0 2 2h9" /></svg>
)
export const Ruler = (p) => (
  <svg {...base} {...p}><path d="m3 17 14-14 4 4L7 21z" /><path d="m7 13 2 2M10 10l2 2M13 7l2 2" /></svg>
)
export const Calendar = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M7 14h4M7 17h7" /></svg>
)
export const Chart = (p) => (
  <svg {...base} {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
)
export const Cubes = (p) => (
  <svg {...base} {...p}><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9z" /><path d="m4 6.5 8 4.5 8-4.5M12 11v9" /></svg>
)
export const Shield = (p) => (
  <svg {...base} {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const Bolt = (p) => (
  <svg {...base} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
)
export const Headset = (p) => (
  <svg {...base} {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>
)
export const Award = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="9" r="6" /><path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7" /><path d="m12 6 .9 1.9 2.1.3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 8.2l2.1-.3z" /></svg>
)
export const Key = (p) => (
  <svg {...base} {...p}><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M17 6l3 3M14 9l2 2" /></svg>
)
export const Handshake = (p) => (
  <svg {...base} {...p}><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-3 1-2-2 3-3h3l5 5" /><path d="M3 12 7 8h3M3 12l5 5 1.5-1.5" /></svg>
)
export const Cloud = (p) => (
  <svg {...base} {...p}><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z" /></svg>
)
export const Pen = (p) => (
  <svg {...base} {...p}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
)
export const Sign = (p) => (
  <svg {...base} {...p}><path d="M3 17c3 0 4-8 6-8s0 8 2 8 3-4 4-4 1 2 2 2h4M3 21h18" /></svg>
)
export const Menu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Close = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Mail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const Phone = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="m5 12 4.5 4.5L19 7" /></svg>
)
export const Globe = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
)
export const LinkedIn = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M6.5 8.5h-3V20h3zM5 3.5A1.75 1.75 0 1 0 5 7a1.75 1.75 0 0 0 0-3.5M20.5 13.3c0-3-1.6-4.9-4.2-4.9-1.5 0-2.5.8-2.9 1.6V8.5h-3V20h3v-6c0-1.6.7-2.7 2.1-2.7s1.9 1 1.9 2.6V20h3.1z" /></svg>
)
export const YouTube = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8M10 15V9l5.2 3z" /></svg>
)
