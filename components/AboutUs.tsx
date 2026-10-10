'use client'

import { useRef, useState, useEffect } from 'react'
import FaqAccordion from './FaqAccordion'

const FAQS = [
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende del alcance, pero la vista previa funcional la tenés en pocos días. El desarrollo completo suele tomar entre 2 y 4 semanas.' },
  { q: '¿Qué pasa si no me gusta el resultado?', a: 'No pagás nada. Te mostramos una vista previa real antes de cobrarte un solo peso — si no te convence, ahí termina, sin compromiso.' },
  { q: '¿Ofrecen mantenimiento después del lanzamiento?', a: 'Sí. Nos encargamos del dominio, el alojamiento y mantenemos tu sitio rápido, seguro y actualizado.' },
  { q: '¿Trabajan con negocios de cualquier rubro?', a: 'Sí, trabajamos con PyMEs, profesionales y comercios locales de cualquier rubro que quieran mejorar su presencia digital.' },
]

export default function AboutUs() {
  const faqButtonRef = useRef<HTMLDivElement>(null)
  const [showFAQ, setShowFAQ] = useState(false)

  useEffect(() => {
    const button = faqButtonRef.current
    if (!button) return

    const handleMouseEnter = () => setShowFAQ(true)
    const handleMouseLeave = (e: MouseEvent) => {
      // Cerrar solo si el cursor se aleja completamente
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
  }, [showFAQ])

  return (
    <section
      id="sobre-nosotros"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Contenido */}
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 data-reveal className="font-display text-5xl md:text-7xl font-bold mb-12 text-[#B14CFF]">
          Sobre nosotros
        </h2>

        <div data-reveal className="space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#FFFFFF', '--reveal-delay': '120ms' } as React.CSSProperties}>
          <p>
            En <strong>FORMA ESTUDIO</strong>, creemos que el diseño web es mucho más que estética. Es la puerta de entrada a tu negocio, la primera impresión que generan en tus clientes.
          </p>

          <p>
            No hacemos sitios web genéricos: cada proyecto es único, como tu empresa. Nos encargamos de todo: desde el concepto y diseño, hasta el desarrollo, lanzamiento y mantenimiento. Cuando trabajás con nosotros, trabajás con gente que entiende tus preocupaciones y las convierte en oportunidades.
          </p>

          {/* Botón FAQ */}
          <div className="mt-12 relative hidden lg:inline-block">
            <div
              ref={faqButtonRef}
              className="inline-flex items-center gap-2 bg-forma-purple text-white px-8 py-4 rounded-full font-semibold [@media(hover:hover)]:hover:bg-forma-pink [@media(hover:hover)]:hover:text-forma-black active:bg-forma-pink active:text-forma-black btn-aura transition-all transform hover:scale-105 cursor-pointer"
              style={{ userSelect: 'none' }}
            >
              PREGUNTAS FRECUENTES
            </div>

            {/* Tooltip FAQ */}
            {showFAQ && (
              <div
                data-faq-tooltip
                className="absolute bg-forma-purple text-white rounded-lg p-6 shadow-lg z-20"
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
          <div className="lg:hidden"><FaqAccordion faqs={FAQS} /></div>
        </div>
      </div>

      <style jsx>{`
        section {
          cursor: default;
        }
      `}</style>
    </section>
  )
}
