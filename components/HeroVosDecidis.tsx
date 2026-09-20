'use client'

export default function HeroVosDecidis() {
  return (
    <section className="relative py-32 px-6 min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#6F2DA8' }}>
      {/* Fondo de lunares */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.28) 3.5px, transparent 3.5px)',
          backgroundSize: '32px 32px',
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
        </div>
      </div>
    </section>
  )
}
