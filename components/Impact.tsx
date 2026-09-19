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
    <section ref={sectionRef} className="bg-forma-white py-20 px-6 relative overflow-hidden">
      {/* Decorative @ symbol - Left (SVG with precise glossy effect) */}
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        className="absolute -left-40 top-0 pointer-events-none z-0 hidden md:block"
        style={{ opacity: 0.5 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glossyVioletLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B794F6" />
            <stop offset="15%" stopColor="#8B2FD9" />
            <stop offset="35%" stopColor="#4A1868" />
            <stop offset="50%" stopColor="#E9D5FF" />
            <stop offset="65%" stopColor="#4A1868" />
            <stop offset="85%" stopColor="#8B2FD9" />
            <stop offset="100%" stopColor="#2D0F47" />
          </linearGradient>
          <filter id="softBlurShadowLeft">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="450"
          fontWeight="900"
          fill="#2D0F47"
          opacity="0.4"
          filter="url(#softBlurShadowLeft)"
          transform="translate(8,8)"
          style={{ userSelect: 'none' }}
        >
          @
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="450"
          fontWeight="900"
          fill="url(#glossyVioletLeft)"
          style={{ userSelect: 'none' }}
        >
          @
        </text>
      </svg>

      {/* Decorative @ symbol - Right (SVG with precise glossy effect) */}
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        className="absolute -right-40 top-1/3 pointer-events-none z-0 hidden md:block"
        style={{ opacity: 0.5, transform: 'scaleX(-1)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glossyVioletRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#B794F6" />
            <stop offset="15%" stopColor="#8B2FD9" />
            <stop offset="35%" stopColor="#4A1868" />
            <stop offset="50%" stopColor="#E9D5FF" />
            <stop offset="65%" stopColor="#4A1868" />
            <stop offset="85%" stopColor="#8B2FD9" />
            <stop offset="100%" stopColor="#2D0F47" />
          </linearGradient>
          <filter id="softBlurShadowRight">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="450"
          fontWeight="900"
          fill="#2D0F47"
          opacity="0.4"
          filter="url(#softBlurShadowRight)"
          transform="translate(8,8)"
          style={{ userSelect: 'none' }}
        >
          @
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="450"
          fontWeight="900"
          fill="url(#glossyVioletRight)"
          style={{ userSelect: 'none' }}
        >
          @
        </text>
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
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
              En <span className="font-bold">FORMA</span> te ayudamos a que tu negocio crezca, con estrategia, tecnología y creatividad que dan resultados.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sí, sabemos entender tus apuros.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* Card 1 - Largest */}
            <div className="border border-forma-purple rounded-3xl p-10 bg-white text-center">
              <div className="text-6xl md:text-7xl font-bold text-forma-purple mb-4">
                +{count500}
              </div>
              <p className="text-2xl md:text-3xl text-forma-purple font-semibold">proyectos</p>
            </div>

            {/* Card 2 - Medium */}
            <div className="border border-forma-purple rounded-3xl p-7 bg-white text-center">
              <div className="text-4xl md:text-5xl font-bold text-forma-purple mb-3">
                +{count10}
              </div>
              <p className="text-xl md:text-2xl text-forma-purple font-semibold">años de experiencia en diseño web</p>
            </div>

            {/* Card 3 - Smallest */}
            <div className="rounded-3xl p-6 text-center" style={{ backgroundColor: 'rgba(111, 45, 168, 0.06)' }}>
              <p className="text-lg md:text-2xl text-forma-purple leading-snug">
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
