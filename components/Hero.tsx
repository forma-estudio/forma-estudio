import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section
      className="min-h-screen text-forma-white flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="flex items-center justify-center gap-3 mb-8 text-xs md:text-sm uppercase tracking-[0.3em] font-normal text-[#B98CE8]">
          <span aria-hidden className="h-px w-8 bg-[#B98CE8]/60" />
          Estudio de diseño web
          <span aria-hidden className="h-px w-8 bg-[#B98CE8]/60" />
        </p>
        <div className="mb-6 flex flex-col items-center">
          <h1 className="font-display text-[clamp(2rem,10.8vw,3.5rem)] md:text-[clamp(2.5rem,6.4vw,4.5rem)] font-bold text-center leading-tight md:whitespace-nowrap md:leading-tight max-md:text-balance">
            Llevamos tu visión más allá
          </h1>
          <div className="font-display text-[min(calc((100vw-48px)*0.09),3rem)] md:text-[min(7.5vw,4.5rem)] font-bold leading-tight mt-4 inline-block min-h-8 md:block md:mt-3 md:min-h-0 md:leading-tight">
            <AnimatedText />
          </div>
        </div>
        <p className="text-base md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Diseñamos, desarrollamos y gestionamos tu página web, tu lugar.<br />
          Para empresas, profesionales y negocios locales.<br />
          Nosotros nos encargamos.
        </p>
        <div className="flex flex-col gap-3 justify-center w-full px-0 md:px-6">
          <a
            href="#contacto"
            className="w-full md:w-auto px-8 py-3 md:py-4 rounded-full font-semibold btn-aura transition-all transform hover:scale-105 inline-flex items-center justify-center min-h-12 text-center"
          >
            Hablemos de tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
