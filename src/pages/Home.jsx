import Hero from '../components/Hero.jsx'
import Partners from '../components/Partners.jsx'
import Marquee from '../components/Marquee.jsx'
import WhyUs from '../components/WhyUs.jsx'

// Short home page: who we are, our partners, and why us. Each product has its own page.
export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Marquee />
      <WhyUs compact />
    </>
  )
}
