import { useEffect } from 'react'

// Adds .is-visible to every [data-reveal] element when it scrolls into view.
// Also picks up elements added later (re-renders, hot reload) via MutationObserver.
export default function useReveal() {
  useEffect(() => {
    const show = (el) => el.classList.add('is-visible')

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        })
      },
      // threshold 0 so very tall elements (e.g. the contact card on mobile) still trigger
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    const observeAll = (root = document) => {
      root.querySelectorAll?.('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
      if (root.matches?.('[data-reveal]:not(.is-visible)')) io.observe(root)
    }
    observeAll()

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && observeAll(n)))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
