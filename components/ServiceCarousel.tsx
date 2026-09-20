'use client'

import { useEffect, useRef, useState } from 'react'

export default function ServiceCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startXRef = useRef(0)

  const slides = [
    {
      icon: 'monitor',
      title: 'Menos ensayo y error, más soluciones',
      button: 'Solicitar vista previa'
    },
    {
      icon: 'palette',
      title: 'Hacete notar, dejá marca',
      button: 'Hacelo ahora'
    },
    {
      icon: 'signal',
      title: 'Hacé que te vean, hacé presencia',
      button: 'Impulsá tu negocio'
    }
  ]

  // Autoplay
  useEffect(() => {
    if (isHovered) {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
      return
    }

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5500)

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
    }
  }, [isHovered, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const diff = startXRef.current - endX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide((currentSlide + 1) % slides.length)
      } else {
        goToSlide((currentSlide - 1 + slides.length) % slides.length)
      }
    }
  }

  const MonitorIcon = () => (
    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 17h8M5 20h14" />
    </svg>
  )

  const PaletteIcon = () => (
    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="16" cy="8" r="2" fill="currentColor" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )

  const SignalIcon = () => (
    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )

  const icons = [MonitorIcon, PaletteIcon, SignalIcon]
  const Icon = icons[currentSlide]

  return (
    <section id="servicios" className="bg-forma-black py-24 px-6 min-h-screen flex flex-col justify-center" style={{ color: '#FFFFFF' }}>
      <div
        className="max-w-6xl mx-auto w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carrusel */}
        <div className="relative">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, idx) => (
              <div key={idx} className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center space-y-12 py-12">
                {/* Ícono */}
                <div className="text-forma-pink">
                  <Icon />
                </div>

                {/* Título */}
                <h2 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>

                {/* Botón */}
                <a
                  href="#contacto"
                  className="inline-block bg-forma-pink text-forma-black px-8 py-3 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105"
                >
                  {slide.button}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="flex justify-center gap-3 mt-16">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 ${idx === currentSlide ? 'w-8 h-2 bg-forma-pink rounded-full' : 'w-2 h-2 bg-gray-600 rounded-full'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
