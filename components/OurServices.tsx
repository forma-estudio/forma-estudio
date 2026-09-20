'use client'

import { useEffect, useRef, useState } from 'react'

export default function OurServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const [animated, setAnimated] = useState<boolean[]>([false, false, false])

  const services = [
    {
      id: 0,
      icon: 'monitor',
      title: 'Menos ensayo y error, ',
      titleHighlight: 'más soluciones',
      button: 'Solicitar vista previa'
    },
    {
      id: 1,
      icon: 'palette',
      title: 'Hacete notar, ',
      titleHighlight: 'dejá marca',
      button: 'Hacelo ahora'
    },
    {
      id: 2,
      icon: 'signal',
      title: 'Hacé que te vean, ',
      titleHighlight: 'hacé presencia',
      button: 'Impulsá tu negocio'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = blockRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && entry.isIntersecting && !animated[index]) {
            setAnimated((prev) => {
              const newAnimated = [...prev]
              newAnimated[index] = true
              return newAnimated
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    blockRefs.current.forEach((block) => {
      if (block) observer.observe(block)
    })

    return () => observer.disconnect()
  }, [animated])

  const MonitorIcon = () => (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 17h8M5 20h14" />
    </svg>
  )

  const PaletteIcon = () => (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="16" cy="8" r="2" fill="currentColor" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )

  const SignalIcon = () => (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )

  const icons = [MonitorIcon, PaletteIcon, SignalIcon]

  return (
    <section id="servicios" className="bg-forma-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
          Nuestros servicios
        </h2>

        <div className="space-y-12">
          {services.map((service, idx) => {
            const Icon = icons[idx]
            return (
              <div
                key={service.id}
                ref={(el) => {
                  blockRefs.current[idx] = el
                }}
                className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
              >
                <div className={`flex justify-center ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="text-forma-pink">
                    <Icon />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="overflow-hidden">
                    <h3 className={`text-3xl md:text-4xl font-bold text-white ${animated[idx] ? 'animate-reveal-title' : ''}`}>
                      {service.title}
                      <span className={`text-forma-purple inline-block ${animated[idx] ? 'animate-keyword-pulse' : ''}`}>
                        {service.titleHighlight}
                      </span>
                    </h3>
                  </div>

                  <a
                    href="#contacto"
                    className="inline-block bg-forma-pink text-forma-black px-8 py-3 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105"
                  >
                    {service.button}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes reveal-title {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0% 0 0);
          }
        }

        @keyframes keyword-pulse {
          0% {
            color: #ffffff;
            transform: scale(1);
          }
          45% {
            color: #6f2da8;
            transform: scale(1.12);
          }
          100% {
            color: #6f2da8;
            transform: scale(1);
          }
        }

        .animate-reveal-title {
          animation: reveal-title 1.1s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        .animate-keyword-pulse {
          animation: keyword-pulse 1s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  )
}
