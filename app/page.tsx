import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import HowWeWork from '@/components/HowWeWork'
import HeroVosDecidis from '@/components/HeroVosDecidis'
import AboutUs from '@/components/AboutUs'
import PhraseForma from '@/components/PhraseForma'
import Contact from '@/components/Contact'
import ParticlesBackground from '@/components/ParticlesBackground'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <ScrollReveal />
      <div id="hero">
        <Hero />
      </div>
      <Impact />
      <HowWeWork />
      <HeroVosDecidis />
      <AboutUs />
      <PhraseForma />
      <Contact />
    </>
  )
}
