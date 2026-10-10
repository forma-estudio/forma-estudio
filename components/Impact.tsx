'use client'

import { useState, useEffect, useRef } from 'react'

export default function Impact() {
  const [count500, setCount500] = useState(0)
  const [count10, setCount10] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Animate 500
          let current500 = 0
          const interval500 = setInterval(() => {
            current500 += Math.ceil(500 / 30)
            if (current500 >= 500) {
              setCount500(500)
              clearInterval(interval500)
            } else {
              setCount500(current500)
            }
          }, 30)

          // Animate 10
          let current10 = 0
          const interval10 = setInterval(() => {
            current10 += 1
            if (current10 >= 10) {
              setCount10(10)
              clearInterval(interval10)
            } else {
              setCount10(current10)
            }
          }, 80)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-2">
          {/* Left Column */}
          <div data-reveal>
            <h2 className="font-display text-[clamp(2rem,7vw,3rem)] md:text-5xl font-bold text-white mb-6 leading-tight">
              Convertimos la eficiencia{' '}
              <span className="text-[#B14CFF]">
                tecnológica
              </span>
              {' '}en impacto real.
            </h2>
            <div className="w-16 h-1 bg-[#B14CFF] mb-8" />
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              En <span className="font-bold">FORMA</span> te ayudamos a que tu negocio crezca, con estrategia, tecnología y creatividad que dan resultados.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sí, sabemos entender tus apuros.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* Card 1 - Largest */}
            <div data-reveal className="border border-forma-purple rounded-3xl p-10 bg-transparent text-center" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
              <div className="font-display text-6xl md:text-7xl font-bold text-[#B98CE8] mb-4">
                +{count500}
              </div>
              <p className="text-2xl md:text-3xl text-[#B98CE8] font-semibold">proyectos</p>
            </div>

            {/* Card 2 - Medium */}
            <div data-reveal className="border border-forma-purple rounded-3xl p-7 bg-transparent text-center" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
              <div className="font-display text-4xl md:text-5xl font-bold text-[#B98CE8] mb-3">
                +{count10}
              </div>
              <p className="text-xl md:text-2xl text-[#B98CE8] font-semibold">años de experiencia en diseño web</p>
            </div>

            {/* Card 3 - Smallest */}
            <div data-reveal className="rounded-3xl p-6 text-center" style={{ backgroundColor: 'rgba(111, 45, 168, 0.06)', '--reveal-delay': '240ms' } as React.CSSProperties}>
              <p className="text-lg md:text-2xl text-[#B98CE8] leading-snug">
                <span className="font-bold">Qué aburrido ser normal.</span>
                <br />
                <span className="font-normal">Mejor ser extraordinario.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
