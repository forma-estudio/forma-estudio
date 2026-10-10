import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section
      className="min-h-screen text-forma-white flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block border-2 border-[#B98CE8] text-[#B98CE8] rounded-full px-6 py-3 text-base font-bold mb-8 bg-[#B98CE8]/5">
          Estudio de diseño web
        </div>
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
