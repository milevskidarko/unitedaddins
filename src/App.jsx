import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Partners from './components/Partners.jsx'
import Foxit from './components/Foxit.jsx'
import PlanFinder from './components/PlanFinder.jsx'
import Mekko from './components/Mekko.jsx'
import WhyUs from './components/WhyUs.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './useReveal.js'

export default function App() {
  useReveal()

  // Quote builder state, shared by the plan finder and the contact form.
  // items: { [productName]: seats }
  const [quote, setQuote] = useState({ items: {}, type: 'New purchase' })

  const addToQuote = (products) => {
    setQuote((q) => {
      const items = { ...q.items }
      products.forEach((p) => {
        if (!items[p]) items[p] = 1
      })
      return { ...q, items }
    })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Foxit onAddToQuote={addToQuote} />
        <PlanFinder onAddToQuote={addToQuote} />
        <Mekko onAddToQuote={addToQuote} />
        <WhyUs />
        <Contact quote={quote} setQuote={setQuote} />
      </main>
      <Footer />
    </>
  )
}
