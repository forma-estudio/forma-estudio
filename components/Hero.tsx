import Link from 'next/link'
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
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight whitespace-nowrap">
            Llevamos tu visión más allá.
          </h1>
          <div className="text-5xl md:text-7xl font-bold leading-tight mt-3">
            <AnimatedText />
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Creamos experiencias web excepcionales que conectan con tu audiencia y potencian tu marca
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="bg-forma-pink text-forma-black px-8 py-4 rounded-lg font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105"
          >
            Hablemos de tu proyecto
          </Link>
          <Link
            href="/portafolio"
            className="border-2 border-forma-pink text-forma-pink px-8 py-4 rounded-lg font-semibold hover:bg-forma-pink hover:text-forma-black transition-all transform hover:scale-105"
          >
            Ver trabajos
          </Link>
        </div>
      </div>
    </section>
  )
}
