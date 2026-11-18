import { useEffect, useState } from 'react'
import { QuoteContext } from './quote.js'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import FoxitPage from './pages/FoxitPage.jsx'
import MekkoPage from './pages/MekkoPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { PRODUCTS } from './products.js'
import NotFound from './pages/NotFound.jsx'
import useReveal from './useReveal.js'
import useSpotlight from './useSpotlight.js'
import { LangProvider, useLang, usePageMeta } from './i18n.jsx'
import { localize } from './seo.js'


// Scrolls to #section after navigation (also across pages), otherwise to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // The target may not be rendered yet right after a page change: retry briefly.
    let tries = 0
    let timer
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: tries ? 'auto' : 'smooth' })
      else if (tries++ < 20) timer = setTimeout(go, 50)
    }
    go()
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

function Layout() {
  useReveal()
  useSpotlight()
  usePageMeta()
  const lang = useLang()
  const navigate = useNavigate()
  const [quote, setQuote] = useState({ items: {}, type: 'New purchase', perpetual: false })

  const addToQuote = (products, opts = {}) => {
    setQuote((q) => {
      const items = { ...q.items }
      products.forEach((p) => {
        if (!items[p]) items[p] = 1
      })
      const perpetual = opts.perpetual === undefined ? q.perpetual : opts.perpetual
      return { ...q, items, perpetual }
    })
    navigate(localize('/contact', lang) + '#quote')
  }

  return (
    <QuoteContext.Provider value={{ quote, setQuote, addToQuote }}>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/de/*" element={<PageRoutes />} />
          <Route path="/fr/*" element={<PageRoutes />} />
          <Route path="/*" element={<PageRoutes />} />
        </Routes>
      </main>
      <Footer />
    </QuoteContext.Provider>
  )
}

// Same pages under / (English), /de (German) and /fr (French). The layout stays mounted when the
// language changes, so a quote in progress is kept.
function PageRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="foxit" element={<FoxitPage />} />
      <Route path="mekko-graphics" element={<MekkoPage />} />
      <Route path="products" element={<ProductsPage />} />
      {PRODUCTS.map((p) => (
        <Route key={p.slug} path={p.slug} element={<ProductPage key={p.slug} slug={p.slug} />} />
      ))}
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <Layout />
      </LangProvider>
    </BrowserRouter>
  )
}
