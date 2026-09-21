'use client'

import { useRef, useState, useEffect } from 'react'

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

  const Globe1 = () => (
    <svg viewBox="0 0 200 200" className="absolute" style={{
      right: '-60px',
      top: '20%',
      width: '320px',
      height: '320px',
      opacity: 0.5,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 12px rgba(139,47,217,0.5))',
      animation: 'spin 40s linear infinite',
      transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
      transition: 'transform 0.15s ease-out'
    }}>
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

  const Globe2 = () => (
    <svg viewBox="0 0 200 200" className="absolute" style={{
      left: '-40px',
      bottom: '10%',
      width: '200px',
      height: '200px',
      opacity: 0.5,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 12px rgba(139,47,217,0.5))',
      animation: 'spin 55s linear infinite reverse',
      transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
      transition: 'transform 0.15s ease-out'
    }}>
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
      style={{ backgroundColor: '#101820' }}
    >
      {/* Globos de fondo */}
      <Globe1 />
      <Globe2 />

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

        section {
          cursor: default;
        }
      `}</style>
    </section>
  )
}
