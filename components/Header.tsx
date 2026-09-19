import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-forma-black text-forma-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-forma-purple to-forma-pink bg-clip-text text-transparent">
          FORMA
        </Link>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-forma-pink transition">Home</Link>
          <Link href="/servicios" className="hover:text-forma-pink transition">Servicios</Link>
          <Link href="/portafolio" className="hover:text-forma-pink transition">Portafolio</Link>
          <Link href="/sobre-nosotros" className="hover:text-forma-pink transition">Sobre Nosotros</Link>
          <Link href="/contacto" className="hover:text-forma-pink transition">Contacto</Link>
        </div>
      </nav>
    </header>
  )
}
