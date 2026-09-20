'use client'

import { useEffect, useRef, useState } from 'react'

interface ServiceCarouselProps {
  withBackground?: boolean
}

export default function ServiceCarousel({ withBackground = true }: ServiceCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startXRef = useRef(0)

  const slides = [
    {
      icon: 'monitor',
      normalWords: ['Menos', 'ensayo', 'y', 'error,'],
      keywordWords: ['más', 'soluciones'],
      button: 'Solicitar vista previa'
    },
    {
      icon: 'palette',
      normalWords: ['Hacete', 'notar,'],
      keywordWords: ['dejá', 'marca'],
      button: 'Hacelo ahora'
    },
    {
      icon: 'signal',
      normalWords: ['Hacé', 'que', 'te', 'vean,'],
      keywordWords: ['hacé', 'presencia'],
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

  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )

  const icons = [MonitorIcon, PaletteIcon, SignalIcon]
  const Icon = icons[currentSlide]

  return (
    <section id={withBackground ? "servicios" : undefined} className={`py-32 px-6 min-h-screen flex flex-col justify-center ${withBackground ? 'bg-forma-black' : ''}`} style={{ color: '#FFFFFF' }}>
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
              <div key={idx} className="w-full flex-shrink-0 flex flex-col items-center justify-between text-center" style={{ height: '85vh', paddingTop: '40px', paddingBottom: '40px' }}>
                {/* Título con animación reveal */}
                <div key={currentSlide} className="max-w-3xl" style={{ display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: '1.2' }}>
                  {/* Palabras normales */}
                  <div className="font-bold text-white flex flex-wrap gap-2" style={{ fontSize: 'clamp(28px, 5vw, 56px)', whiteSpace: 'nowrap' }}>
                    {slide.normalWords.map((word, i) => (
                      <span
                        key={`normal-${i}`}
                        className="word-reveal inline-block"
                        style={{ '--word-delay': `${i * 0.1}s` } as React.CSSProperties}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  {/* Palabra clave con glow - más grande y en línea separada */}
                  <div className="font-bold leading-tight flex flex-wrap gap-2" style={{ fontSize: 'clamp(32px, 6vw, 68px)', whiteSpace: 'nowrap' }}>
                    {slide.keywordWords.map((word, i) => (
                      <span
                        key={`keyword-${i}`}
                        className="keyword word-reveal inline-block"
                        style={{ '--word-delay': `${(slide.normalWords.length + i) * 0.1}s` } as React.CSSProperties}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón e Indicador agrupados al final */}
                <div className="flex flex-col items-center" style={{ gap: '24px', paddingBottom: '60px' }}>
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 bg-forma-pink text-forma-black px-10 py-4 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105"
                  >
                    {slide.button}
                    <span className="arrow-icon transition-transform duration-300">
                      <ArrowIcon />
                    </span>
                  </a>

                  {/* Indicador de progreso */}
                  <div className="flex justify-center gap-3">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes word-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes keyword-glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 1);
          }
        }

        .word-reveal {
          display: inline-block;
          animation: word-reveal 0.6s ease-out forwards;
          animation-delay: var(--word-delay, 0s);
        }

        .keyword {
          color: #FFFFFF;
          font-weight: 700;
          text-transform: uppercase;
        }

        .keyword.word-reveal {
          animation: word-reveal 0.6s ease-out forwards, keyword-glow 2.4s ease-in-out 0.6s infinite;
        }

        .arrow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        a:hover .arrow-icon {
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  )
}
