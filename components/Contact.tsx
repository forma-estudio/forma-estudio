'use client'

import { useState, FormEvent } from 'react'

const WEB3FORMS_KEY = 'd7c425cd-2762-4821-91f4-4abef2a13c68'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          access_key: WEB3FORMS_KEY,
          subject: 'Nuevo mensaje desde la web de FORMA',
          from_name: 'Web FORMA',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="vortex-section">
      <div className="rings-wrap">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="ring" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="center-glow" />
      <div className="badge">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Empecemos tu proyecto</h2>
        <p className="text-sm md:text-base text-gray-300 mb-6">
          Contanos sobre tu negocio y tu visión. No te cobraremos nada por una primera consulta.
        </p>
        <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
          <label htmlFor="contact-name" className="sr-only">Tu nombre</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-base lg:text-sm focus:outline-none focus:border-forma-pink transition"
          />
          <label htmlFor="contact-email" className="sr-only">Tu email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Tu email"
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-base lg:text-sm focus:outline-none focus:border-forma-pink transition"
          />
          <label htmlFor="contact-message" className="sr-only">Contanos sobre tu proyecto</label>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder="Contanos sobre tu proyecto"
            rows={4}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-base lg:text-sm focus:outline-none focus:border-forma-pink transition resize-none"
          />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-4 py-2 min-h-12 lg:min-h-0 bg-forma-pink text-forma-black rounded-full lg:rounded-lg font-semibold text-base lg:text-sm hover:bg-forma-purple hover:text-forma-white active:bg-forma-purple active:text-forma-white transition"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar'}
          </button>
          <p aria-live="polite">
            {status === 'ok' && '¡Gracias! Recibimos tu mensaje y te vamos a responder pronto.'}
            {status === 'error' && 'No pudimos enviar el mensaje. Probá de nuevo o escribinos a formawebok@gmail.com.'}
          </p>
        </form>
        <p className="text-xs md:text-sm text-gray-400 mb-3">
          O escribinos directamente:
        </p>
        <a href="mailto:formawebok@gmail.com" className="text-forma-pink hover:text-forma-purple transition font-bold text-sm md:text-base inline-block">
          formawebok@gmail.com
        </a>
      </div>
      <style jsx>{`
        .vortex-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: #000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .rings-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1600px;
          height: 1600px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.05);
          border: 22px solid transparent;
          border-image: conic-gradient(from 0deg, #3d1a5c, #6F2DA8, #B14CFF, #FF91A4, #B14CFF, #6F2DA8, #3d1a5c) 1;
          filter: blur(6px);
          opacity: 0;
          animation: ringOut 9s linear infinite;
          animation-delay: calc(var(--i) * 0.6s);
          pointer-events: none;
        }

        @keyframes ringOut {
          0%   { transform: translate(-50%, -50%) scale(0.04); opacity: 0; }
          8%   { opacity: 0.9; }
          55%  { opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }

        .center-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 260px;
          height: 260px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #000 0%, #1a0a2e 60%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .badge {
          position: relative;
          z-index: 5;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 145, 164, 0.5);
          color: #fff;
          padding: 40px 56px;
          border-radius: 28px;
          backdrop-filter: blur(8px);
          max-width: 480px;
          width: 100%;
          text-align: center;
        }

        @media (max-width: 640px) {
          .badge {
            max-width: 92vw;
            padding: 28px 24px;
          }

          .rings-wrap {
            width: 1200px;
            height: 1200px;
          }
        }

        @media (min-width: 1024px) {
          .vortex-section {
            min-height: 100vh;
          }
        }

        @media (max-width: 1023px) {
          .ring:nth-child(n+9) {
            display: none;
          }

          .ring {
            filter: blur(3px);
            animation-delay: calc(var(--i) * 1.125s);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring {
            animation: none;
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(calc(0.1 + var(--i) * 0.06));
          }
        }
      `}</style>
    </section>
  )
}
