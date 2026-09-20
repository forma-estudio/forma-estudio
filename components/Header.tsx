import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-forma-black text-forma-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold bg-gradient-to-r from-forma-purple to-forma-pink bg-clip-text text-transparent hover:opacity-80 transition">
          FORMA
        </a>
        <div className="flex gap-8">
          <a href="#hero" className="hover:text-forma-pink transition">Home</a>
          <a href="#servicios" className="hover:text-forma-pink transition">Servicios</a>
          <a href="#portafolio" className="hover:text-forma-pink transition">Portafolio</a>
          <a href="#sobre-nosotros" className="hover:text-forma-pink transition">Sobre Nosotros</a>
          <a href="#contacto" className="hover:text-forma-pink transition">Contacto</a>
        </div>
      </nav>
    </header>
  )
}
