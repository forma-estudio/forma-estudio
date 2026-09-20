import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import HowWeWork from '@/components/HowWeWork'
import HeroVosDecidis from '@/components/HeroVosDecidis'
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
      <HeroVosDecidis />
      <AboutUs />
      <Contact />
    </>
  )
}
