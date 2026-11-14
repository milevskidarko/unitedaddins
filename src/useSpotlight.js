import { useEffect } from 'react'

// Feeds the pointer position to every `.spot` element under the cursor as --mx / --my,
// which the CSS turns into a soft light and a glowing border. One listener for the page.
export default function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let last = null
    const onMove = (e) => {
      last = e
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = last.target.closest?.('.spot')
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${last.clientX - r.left}px`)
        el.style.setProperty('--my', `${last.clientY - r.top}px`)
      })
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
}
