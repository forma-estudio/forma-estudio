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
    <section ref={sectionRef} className="bg-forma-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-forma-black mb-6 leading-tight">
              Convertimos la eficiencia{' '}
              <span className="bg-gradient-to-r from-forma-purple to-forma-pink bg-clip-text text-transparent">
                tecnológica
              </span>
              {' '}en impacto real.
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-forma-purple to-forma-pink mb-8" />
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              En FORMA te ayudamos a que tu negocio crezca, con estrategia, tecnología y creatividad que dan resultados.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              También sabemos entender tus tiempos.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* Card 1 */}
            <div className="border border-forma-purple rounded-3xl p-8 bg-white hover:shadow-lg transition">
              <div className="text-5xl md:text-6xl font-bold text-forma-purple mb-3">
                +{count500}
              </div>
              <p className="text-xl text-forma-purple font-semibold">proyectos</p>
            </div>

            {/* Card 2 */}
            <div className="border border-forma-purple rounded-3xl p-8 bg-white hover:shadow-lg transition">
              <div className="text-5xl md:text-6xl font-bold text-forma-purple mb-3">
                +{count10}
              </div>
              <p className="text-xl text-forma-purple font-semibold">años de experiencia en diseño web</p>
            </div>

            {/* Card 3 */}
            <div className="border border-forma-purple rounded-3xl p-8 bg-white hover:shadow-lg transition">
              <p className="text-2xl md:text-3xl font-bold text-center leading-snug text-forma-purple">
                Qué aburrido ser normal, mejor ser extraordinario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
