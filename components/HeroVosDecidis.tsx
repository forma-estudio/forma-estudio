'use client'

export default function HeroVosDecidis() {
  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  )

  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#050208' }}>
      {/* Malla animada SVG */}
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <defs>
          <filter id="wavyGrid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.015"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.015;0.012 0.02;0.008 0.015"
                dur="14s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="60"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#B14CFF" strokeWidth="1.4" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="#050208" />
        <g filter="url(#wavyGrid)">
          <rect
            width="800"
            height="500"
            fill="url(#grid)"
            filter="url(#glow)"
            opacity="0.9"
          />
        </g>
      </svg>

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
