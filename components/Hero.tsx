import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section
      className="min-h-screen text-forma-white flex items-center justify-center pt-20 relative overflow-hidden bg-forma-black"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-layer" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-block border-2 border-forma-pink text-forma-pink rounded-full px-6 py-3 text-base font-bold mb-8 bg-forma-pink/5">
          Estudio de diseño web
        </div>
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight md:whitespace-nowrap">
            Llevamos tu visión más allá
          </h1>
          <div className="text-5xl md:text-7xl font-bold leading-tight mt-3">
            <AnimatedText />
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Diseñamos, desarrollamos y gestionamos tu página web, tu lugar.<br />
          Para empresas, profesionales y negocios locales.<br />
          Nosotros nos encargamos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            className="bg-forma-pink text-forma-black px-8 py-4 rounded-full font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105 inline-block"
          >
            Hablemos de tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
