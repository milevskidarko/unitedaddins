import { useEffect, useRef, useState } from 'react'

const srOnly = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
}

// Counts from `from` to `to` the first time the number scrolls into view.
// The final value is in the markup from the start, so screen readers, crawlers
// and users with reduced motion always see the real number.
export default function CountUp({ to, from = 0, duration = 1400, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(from + (to - from) * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        setValue(from)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, from, duration])

  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{value}{suffix}</span>
      <span style={srOnly}>{prefix}{to}{suffix}</span>
    </span>
  )
}
