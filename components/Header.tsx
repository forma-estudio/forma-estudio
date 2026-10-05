'use client'

import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
  }

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#como-trabajamos', label: 'Proceso' },
    { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <header className="fixed w-full top-0 z-50 bg-forma-black text-forma-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#hero" className="h-12 flex items-center hover:opacity-80 transition">
          <Logo />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-forma-pink transition"
            >
              {link.label}
            </a>
          ))}
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
                className="text-2xl font-semibold hover:text-forma-pink transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
