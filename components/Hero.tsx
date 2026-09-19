import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-forma-black via-forma-purple to-forma-black text-forma-white flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">Transformamos tu visión en digital</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Creamos experiencias web excepcionales que conectan con tu audiencia y potencian tu marca
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/contacto" className="bg-forma-pink text-forma-black px-8 py-3 rounded-lg font-semibold hover:bg-forma-purple hover:text-forma-white transition">
            Empezar Ahora
          </Link>
          <Link href="/portafolio" className="border-2 border-forma-pink text-forma-pink px-8 py-3 rounded-lg font-semibold hover:bg-forma-pink hover:text-forma-black transition">
            Ver Trabajos
          </Link>
        </div>
      </div>
    </section>
  )
}
