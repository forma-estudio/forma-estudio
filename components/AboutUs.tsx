'use client'

import { useRef, useState, useEffect } from 'react'

const FAQS = [
  {
    question: '¿Cuánto tarda un proyecto?',
    answer: 'Depende del alcance, pero la vista previa funcional la tenés en pocos días. El desarrollo completo suele tomar entre 2 y 4 semanas.'
  },
  {
    question: '¿Qué pasa si no me gusta el resultado?',
    answer: 'No pagás nada. Te mostramos una vista previa real antes de cobrarte un solo peso — si no te convence, ahí termina, sin compromiso.'
  },
  {
    question: '¿Ofrecen mantenimiento después del lanzamiento?',
    answer: 'Sí. Nos encargamos del dominio, el alojamiento y mantenemos tu sitio rápido, seguro y actualizado.'
  },
  {
    question: '¿Trabajan con negocios de cualquier rubro?',
    answer: 'Sí, trabajamos con PyMEs, profesionales y comercios locales de cualquier rubro que quieran mejorar su presencia digital.'
  }
]

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const faqButtonRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showFAQ, setShowFAQ] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Globe refs
  const globe1WrapperRef = useRef<HTMLDivElement>(null)
  const globe1RotatorRef = useRef<HTMLDivElement>(null)
  const globe2WrapperRef = useRef<HTMLDivElement>(null)
  const globe2RotatorRef = useRef<HTMLDivElement>(null)
  const animStateRef = useRef({ angle1: 0, angle2: 0, vel1Extra: 0, vel2Extra: 0, isInView: false })
  const rafRef = useRef<number | null>(null)

  // Check if mobile and set up observers
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Desktop: mouse parallax
  useEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const x = (e.clientX - rect.left - centerX) / centerX
      const y = (e.clientY - rect.top - centerY) / centerY
      setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Desktop: FAQ tooltip
  useEffect(() => {
    if (isMobile) return

    const button = faqButtonRef.current
    if (!button) return

    const handleMouseEnter = () => setShowFAQ(true)
    const handleMouseLeave = (e: MouseEvent) => {
      setTimeout(() => {
        const tooltip = button.querySelector('[data-faq-tooltip]')
        if (tooltip && !tooltip.matches(':hover') && !button.matches(':hover')) {
          setShowFAQ(false)
        }
      }, 10)
    }
    const handleClick = () => setShowFAQ(!showFAQ)

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('click', handleClick)
    }
  }, [showFAQ, isMobile])

  // Mobile: Accordion
  const toggleAccordion = (idx: number) => {
    setExpandedFAQ(expandedFAQ === idx ? null : idx)
  }

  // Mobile: Globes Animation + Dragging
  useEffect(() => {
    if (!isMobile) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Intersection Observer to pause when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        animStateRef.current.isInView = entry.isIntersecting
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Pointer drag handler for globe 1
    const handleGlobe1PointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const startX = e.clientX
      const onMove = (me: PointerEvent) => {
        const deltaX = me.clientX - startX
        const vel = deltaX * 0.5
        animStateRef.current.vel1Extra = vel
      }
      const onEnd = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onEnd)
        document.removeEventListener('pointercancel', onEnd)
      }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onEnd)
      document.addEventListener('pointercancel', onEnd)
    }

    // Pointer drag handler for globe 2
    const handleGlobe2PointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const startX = e.clientX
      const onMove = (me: PointerEvent) => {
        const deltaX = me.clientX - startX
        const vel = deltaX * 0.5
        animStateRef.current.vel2Extra = vel
      }
      const onEnd = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onEnd)
        document.removeEventListener('pointercancel', onEnd)
      }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onEnd)
      document.addEventListener('pointercancel', onEnd)
    }

    globe1WrapperRef.current?.addEventListener('pointerdown', handleGlobe1PointerDown)
    globe2WrapperRef.current?.addEventListener('pointerdown', handleGlobe2PointerDown)

    // RAF loop for globe rotation
    const tick = () => {
      if (!animStateRef.current.isInView) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const state = animStateRef.current

      if (!prefersReduced) {
        const vel1 = 360 / 40000 // 360° per 40s in ms
        const vel2 = -(360 / 55000) // 360° per 55s in ms, reversed

        state.angle1 += vel1 + state.vel1Extra
        state.angle2 += vel2 + state.vel2Extra

        state.vel1Extra *= 0.95
        state.vel2Extra *= 0.95

        if (Math.abs(state.vel1Extra) < 0.01) state.vel1Extra = 0
        if (Math.abs(state.vel2Extra) < 0.01) state.vel2Extra = 0
      } else {
        // prefers-reduced-motion: slow spin without inercia
        state.angle1 += 360 / 120000
        state.angle2 -= 360 / 160000
      }

      if (globe1RotatorRef.current) {
        globe1RotatorRef.current.style.transform = `rotate(${state.angle1}deg)`
      }
      if (globe2RotatorRef.current) {
        globe2RotatorRef.current.style.transform = `rotate(${state.angle2}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      globe1WrapperRef.current?.removeEventListener('pointerdown', handleGlobe1PointerDown)
      globe2WrapperRef.current?.removeEventListener('pointerdown', handleGlobe2PointerDown)
    }
  }, [isMobile])

  const Globe1SVG = () => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#B98CE8" strokeWidth="1.2"/>
      <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="#8B2FD9" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="65" ry="90" fill="none" stroke="#8B2FD9" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="32" ry="90" fill="none" stroke="#8B2FD9" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="90" ry="65" fill="none" stroke="#6F2DA8" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="90" ry="32" fill="none" stroke="#6F2DA8" strokeWidth="1"/>
      <ellipse cx="100" cy="55" rx="70" ry="20" fill="none" stroke="#6F2DA8" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="100" cy="145" rx="70" ry="20" fill="none" stroke="#6F2DA8" strokeWidth="0.8" opacity="0.7"/>
    </svg>
  )

  const Globe2SVG = () => (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#B98CE8" strokeWidth="1.2"/>
      <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="#8B2FD9" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="55" ry="90" fill="none" stroke="#8B2FD9" strokeWidth="1"/>
      <ellipse cx="100" cy="100" rx="90" ry="55" fill="none" stroke="#6F2DA8" strokeWidth="1"/>
      <ellipse cx="100" cy="60" rx="75" ry="18" fill="none" stroke="#6F2DA8" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="100" cy="140" rx="75" ry="18" fill="none" stroke="#6F2DA8" strokeWidth="0.8" opacity="0.7"/>
    </svg>
  )

  return (
    <section
      id="sobre-nosotros"
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* GLOBO 1: Parallax wrapper (translate on desktop) + Inner rotator */}
      <div
        ref={globe1WrapperRef}
        className={`absolute pointer-events-none ${isMobile ? 'touch-action-pan-y' : ''}`}
        style={{
          right: '-60px',
          top: '20%',
          width: '320px',
          height: '320px',
          zIndex: 0,
          pointerEvents: isMobile ? 'auto' : 'none',
          transform: !isMobile ? `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)` : 'none',
          transition: !isMobile ? 'transform 0.15s ease-out' : 'none'
        }}
      >
        <div
          ref={globe1RotatorRef}
          className="globe-spin-1"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.5,
            filter: 'drop-shadow(0 0 12px rgba(139,47,217,0.5))',
            pointerEvents: 'none'
          }}
        >
          <Globe1SVG />
        </div>
      </div>

      {/* GLOBO 2: Parallax wrapper (translate on desktop) + Inner rotator */}
      <div
        ref={globe2WrapperRef}
        className={`absolute pointer-events-none ${isMobile ? 'touch-action-pan-y' : ''}`}
        style={{
          left: '-40px',
          bottom: '10%',
          width: '200px',
          height: '200px',
          zIndex: 0,
          pointerEvents: isMobile ? 'auto' : 'none',
          transform: !isMobile ? `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` : 'none',
          transition: !isMobile ? 'transform 0.15s ease-out' : 'none'
        }}
      >
        <div
          ref={globe2RotatorRef}
          className="globe-spin-2"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.5,
            filter: 'drop-shadow(0 0 12px rgba(139,47,217,0.5))',
            pointerEvents: 'none'
          }}
        >
          <Globe2SVG />
        </div>
      </div>

      {/* Contenido */}
      <div className={`max-w-3xl mx-auto relative z-10 ${isMobile ? 'pointer-events-none' : ''}`}>
        <h2 className="text-5xl md:text-7xl font-bold mb-12" style={{ color: '#FF91A4' }}>
          Sobre nosotros
        </h2>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#FFFFFF', pointerEvents: 'auto' }}>
          <p>
            En <strong>FORMA ESTUDIO</strong>, creemos que el diseño web es mucho más que estética. Es la puerta de entrada a tu negocio, la primera impresión que generan en tus clientes.
          </p>

          <p>
            No hacemos sitios web genéricos: cada proyecto es único, como tu empresa. Nos encargamos de todo: desde el concepto y diseño, hasta el desarrollo, lanzamiento y mantenimiento. Cuando trabajás con nosotros, trabajás con gente que entiende tus preocupaciones y las convierte en oportunidades.
          </p>

          {/* Desktop: FAQ Tooltip */}
          <div className="mt-12 relative inline-block hidden lg:inline-block">
            <div
              ref={faqButtonRef}
              className="inline-flex items-center gap-2 bg-forma-pink text-forma-black px-8 py-4 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105 cursor-pointer"
              style={{ userSelect: 'none' }}
            >
              PREGUNTAS FRECUENTES
            </div>

            {showFAQ && (
              <div
                data-faq-tooltip
                className="absolute bg-forma-pink text-forma-black rounded-lg p-6 shadow-lg z-20"
                style={{
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: '24px',
                  width: '360px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  opacity: showFAQ ? 1 : 0,
                  pointerEvents: 'auto',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx}>
                      <p className="font-bold">{faq.question}</p>
                      <p className="text-sm mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile: FAQ Accordion */}
          <div className="mt-12 lg:hidden pointer-events-auto">
            <p className="text-forma-pink font-semibold text-sm tracking-widest uppercase mb-6">
              Preguntas frecuentes
            </p>
            <div className="space-y-0 border-b border-white/15">
              {FAQS.map((faq, idx) => (
                <div key={idx}>
                  <button
                    aria-expanded={expandedFAQ === idx}
                    aria-controls={`faq-answer-${idx}`}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-4 px-0 flex items-center justify-between text-white font-semibold text-base border-b border-white/15 last:border-b-0 transition-colors duration-300"
                  >
                    <span>{faq.question}</span>
                    <span
                      style={{
                        color: '#B98CE8',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        transform: expandedFAQ === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 300ms ease-out'
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${idx}`}
                    style={{
                      display: 'grid',
                      gridTemplateRows: expandedFAQ === idx ? '1fr' : '0fr',
                      overflow: 'hidden',
                      transition: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'grid-template-rows 300ms ease-out'
                    }}
                  >
                    <div style={{ minHeight: '0' }}>
                      <p className="text-white/80 text-base py-4 px-0">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .globe-spin-1 {
          animation: spin 40s linear infinite;
        }

        .globe-spin-2 {
          animation: spin 55s linear infinite reverse;
        }

        @media (max-width: 1023px) {
          .globe-spin-1,
          .globe-spin-2 {
            animation: none;
          }
        }

        section {
          cursor: default;
        }
      `}</style>
    </section>
  )
}
