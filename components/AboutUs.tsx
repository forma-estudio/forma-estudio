'use client'

import { useRef, useState, useEffect } from 'react'

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const faqButtonRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showFAQ, setShowFAQ] = useState(false)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const button = faqButtonRef.current
    if (!button) return

    const handleMouseEnter = () => setShowFAQ(true)
    const handleMouseLeave = () => setShowFAQ(false)
    const handleClick = () => setShowFAQ(!showFAQ)

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('click', handleClick)
    }
  }, [showFAQ])

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
      {/* GLOBO 1: Parallax wrapper (translate) + Inner rotator */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-60px',
          top: '20%',
          width: '320px',
          height: '320px',
          zIndex: 0,
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div
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

      {/* GLOBO 2: Parallax wrapper (translate) + Inner rotator */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-40px',
          bottom: '10%',
          width: '200px',
          height: '200px',
          zIndex: 0,
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div
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
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-12" style={{ color: '#FF91A4' }}>
          Sobre nosotros
        </h2>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#FFFFFF' }}>
          <p>
            En <strong>FORMA ESTUDIO</strong>, creemos que el diseño web es mucho más que estética. Es la puerta de entrada a tu negocio, la primera impresión que generan en tus clientes.
          </p>

          <p>
            No hacemos sitios web genéricos: cada proyecto es único, como tu empresa. Nos encargamos de todo: desde el concepto y diseño, hasta el desarrollo, lanzamiento y mantenimiento. Cuando trabajás con nosotros, trabajás con gente que entiende tus preocupaciones y las convierte en oportunidades.
          </p>

          {/* Botón FAQ */}
          <div className="mt-12 relative inline-block">
            <div
              ref={faqButtonRef}
              className="inline-flex items-center gap-2 bg-forma-pink text-forma-black px-8 py-4 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105 cursor-pointer"
              style={{ userSelect: 'none' }}
            >
              PREGUNTAS FRECUENTES
            </div>

            {/* Tooltip FAQ */}
            {showFAQ && (
              <div
                className="absolute top-full mt-4 left-0 bg-forma-pink text-forma-black rounded-lg p-6 shadow-lg z-20"
                style={{
                  width: '360px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  opacity: showFAQ ? 1 : 0,
                  transform: showFAQ ? 'scale(1)' : 'scale(0.95)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div className="space-y-4">
                  <div>
                    <p className="font-bold">¿Cuánto tarda un proyecto?</p>
                    <p className="text-sm mt-1">Depende del alcance, pero la vista previa funcional la tenés en pocos días. El desarrollo completo suele tomar entre 2 y 4 semanas.</p>
                  </div>
                  <div>
                    <p className="font-bold">¿Qué pasa si no me gusta el resultado?</p>
                    <p className="text-sm mt-1">No pagás nada. Te mostramos una vista previa real antes de cobrarte un solo peso — si no te convence, ahí termina, sin compromiso.</p>
                  </div>
                  <div>
                    <p className="font-bold">¿Ofrecen mantenimiento después del lanzamiento?</p>
                    <p className="text-sm mt-1">Sí. Nos encargamos del dominio, el alojamiento y mantenemos tu sitio rápido, seguro y actualizado.</p>
                  </div>
                  <div>
                    <p className="font-bold">¿Trabajan con negocios de cualquier rubro?</p>
                    <p className="text-sm mt-1">Sí, trabajamos con PyMEs, profesionales y comercios locales de cualquier rubro que quieran mejorar su presencia digital.</p>
                  </div>
                </div>
              </div>
            )}
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

        section {
          cursor: default;
        }
      `}</style>
    </section>
  )
}
