import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import HowWeWork from '@/components/HowWeWork'
import ServiceCarousel from '@/components/ServiceCarousel'
import HeroVosDecidis from '@/components/HeroVosDecidis'
import Portfolio from '@/components/Portfolio'
import AboutUs from '@/components/AboutUs'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <Impact />
      <HowWeWork />
      <ServiceCarousel />
      <HeroVosDecidis />
      <div id="portafolio">
        <Portfolio />
      </div>
      <AboutUs />
      <Contact />
    </>
  )
}
