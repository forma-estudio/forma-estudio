'use client'

export default function HeroVosDecidis() {
  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )

  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#6F2DA8' }}>
      {/* Fondo de lunares con degradé de intensidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.28) 3.5px, transparent 3.5px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl text-center w-full">
        <div className="text-white space-y-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Vos decidís si querés
          </h2>
          <div className="text-7xl md:text-8xl lg:text-9xl font-black leading-none text-center" style={{ letterSpacing: '-0.02em' }}>
            progresar
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            o seguir apagando incendios
          </h2>

          {/* Espaciado generoso antes del botón */}
          <div className="h-12" />

          {/* Botón */}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-white text-forma-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Acelerá tu empresa
            <span className="arrow-icon transition-transform duration-300">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
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
