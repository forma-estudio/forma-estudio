'use client'

import ServiceCarousel from './ServiceCarousel'

export default function HeroVosDecidis() {
  return (
    <section id="servicios" className="relative py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#050208' }}>
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

      {/* Carrusel de Servicios sobre la malla animada */}
      <div className="relative z-10 w-full">
        <ServiceCarousel withBackground={false} />
      </div>
    </section>
  )
}
