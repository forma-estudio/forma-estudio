'use client'

import ServiceCarousel from './ServiceCarousel'

export default function HeroVosDecidis() {
  return (
    <section id="servicios" className="relative py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Carrusel de Servicios */}
      <div data-reveal className="relative z-10 w-full">
        <ServiceCarousel withBackground={false} />
      </div>
    </section>
  )
}
