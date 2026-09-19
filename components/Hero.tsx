import Link from 'next/link'
import AnimatedText from './AnimatedText'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-forma-black via-forma-purple to-forma-black text-forma-white flex items-center justify-center pt-20 animate-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-forma-black/50 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Llevamos tu visión <AnimatedText />
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Creamos experiencias web excepcionales que conectan con tu audiencia y potencian tu marca
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="bg-forma-pink text-forma-black px-8 py-4 rounded-lg font-semibold hover:bg-forma-purple hover:text-forma-white transition-all transform hover:scale-105"
          >
            Empezar Ahora
          </Link>
          <Link
            href="/portafolio"
            className="border-2 border-forma-pink text-forma-pink px-8 py-4 rounded-lg font-semibold hover:bg-forma-pink hover:text-forma-black transition-all transform hover:scale-105"
          >
            Ver Trabajos
          </Link>
        </div>
      </div>
    </section>
  )
}
