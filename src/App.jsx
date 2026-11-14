import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Partners from './components/Partners.jsx'
import Foxit from './components/Foxit.jsx'
import Mekko from './components/Mekko.jsx'
import WhyUs from './components/WhyUs.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './useReveal.js'

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Foxit />
        <Mekko />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
