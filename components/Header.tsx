'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Se esconde al bajar y vuelve al subir (umbral 8px); arriba de todo siempre se ve
  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      if (y < 80) { setHidden(false); lastY = y }
      else if (y - lastY > 8) { setHidden(true); lastY = y }
      else if (lastY - y > 8) { setHidden(false); lastY = y }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
  }

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#como-trabajamos', label: 'Proceso' },
    { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  ]

  // Sin transform cuando se ve: el panel mobile es fixed y un transform en el header lo dejaría relativo al header
  return (
    <header
      onFocus={() => setHidden(false)}
      className={`fixed w-full top-0 z-50 bg-forma-black text-forma-white shadow-lg transition-transform duration-300 ease-out motion-reduce:transition-none ${hidden && !menuOpen ? '-translate-y-full' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#hero" className="h-12 flex items-center hover:opacity-80 transition">
          <Logo />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#B98CE8] transition"
            >
              {link.label}
            </a>
          ))}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=formawebok@gmail.com&su=Consulta%20desde%20la%20web" target="_blank" rel="noopener noreferrer" className="btn-aura inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition">Escribinos</a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-forma-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-forma-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-forma-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="fixed inset-0 top-20 md:hidden bg-forma-black z-40">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-2xl font-semibold hover:text-[#B98CE8] transition"
              >
                {link.label}
              </a>
            ))}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=formawebok@gmail.com&su=Consulta%20desde%20la%20web" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="btn-aura inline-flex items-center justify-center rounded-full px-8 min-h-12 text-base font-semibold mt-4">Escribinos</a>
          </div>
        </div>
      )}
    </header>
  )
}
