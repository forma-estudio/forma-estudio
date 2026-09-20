'use client'

export default function HeroVosDecidis() {
  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )

  return (
    <section className="dots-bg py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Contenido */}
      <div className="max-w-5xl text-center w-full">
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
        .dots-bg {
          position: relative;
          background-color: #101820;
        }

        .dots-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #8B2FD9 2.5px, transparent 2.5px);
          background-size: 22px 22px;
          opacity: 0.9;
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%);
          pointer-events: none;
        }

        .dots-bg > * {
          position: relative;
          z-index: 1;
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
