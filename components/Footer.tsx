import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-forma-black text-forma-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FORMA ESTUDIO</h3>
            <p className="text-gray-400">Agencia de diseño web y experiencia digital</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <Link href="/servicios" className="hover:text-forma-pink transition">Servicios</Link>
              <Link href="/portafolio" className="hover:text-forma-pink transition">Portafolio</Link>
              <Link href="/contacto" className="hover:text-forma-pink transition">Contacto</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociales</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <a href="#" className="hover:text-forma-pink transition">Instagram</a>
              <a href="#" className="hover:text-forma-pink transition">LinkedIn</a>
              <a href="#" className="hover:text-forma-pink transition">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; 2024 FORMA ESTUDIO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
