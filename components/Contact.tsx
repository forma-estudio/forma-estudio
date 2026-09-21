'use client'

export default function Contact() {
  return (
    <section id="contacto" className="vortex-section">
      <div className="rings-wrap">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="ring" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </div>
      <div className="center-glow" />
      <div className="badge">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Empecemos tu proyecto</h2>
        <p className="text-sm md:text-base text-gray-300 mb-6">
          Contanos sobre tu negocio y tu visión. No te cobraremos nada por una primera consulta.
        </p>
        <form className="space-y-3 mb-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full px-4 py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-sm focus:outline-none focus:border-forma-pink transition"
          />
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-4 py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-sm focus:outline-none focus:border-forma-pink transition"
          />
          <textarea
            placeholder="Cuéntanos sobre tu proyecto"
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 text-sm focus:outline-none focus:border-forma-pink transition resize-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-forma-pink text-forma-black rounded-lg font-semibold text-sm hover:bg-forma-purple hover:text-forma-white transition"
          >
            Enviar
          </button>
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
          min-height: 100vh;
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
      `}</style>
    </section>
  )
}
