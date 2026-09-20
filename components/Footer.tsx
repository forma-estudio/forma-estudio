import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-forma-black to-forma-purple text-forma-white py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-forma-pink to-forma-purple bg-clip-text text-transparent">
              FORMA ESTUDIO
            </h3>
            <p className="text-gray-300">
              Agencia de diseño web y experiencia digital comprometida con la excelencia.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces</h4>
            <div className="flex flex-col gap-3 text-gray-300">
              <a href="#servicios" className="hover:text-forma-pink transition">
                Servicios
              </a>
              <a href="#como-trabajamos" className="hover:text-forma-pink transition">
                Proceso
              </a>
              <a href="#sobre-nosotros" className="hover:text-forma-pink transition">
                Sobre Nosotros
              </a>
              <a href="#contacto" className="hover:text-forma-pink transition">
                Contacto
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-forma-pink rounded-full flex items-center justify-center hover:bg-forma-black transition"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-forma-pink rounded-full flex items-center justify-center hover:bg-forma-black transition"
              >
                in
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-forma-pink rounded-full flex items-center justify-center hover:bg-forma-black transition"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 FORMA ESTUDIO. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-forma-pink transition">
              Privacidad
            </a>
            <a href="#" className="hover:text-forma-pink transition">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
