export default function Contact() {
  return (
    <section id="contacto" className="min-h-screen pt-32 pb-20 px-6 bg-forma-black text-forma-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">Empecemos tu proyecto</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Contanos sobre tu negocio y tu visión. No te cobraremos nada por una primera consulta.
        </p>
        <div className="space-y-4">
          <p className="text-lg">
            <a href="mailto:formawebok@gmail.com" className="text-forma-pink hover:text-forma-purple transition">
              formawebok@gmail.com
            </a>
          </p>
          <p className="text-lg text-gray-400">
            O completá el formulario y nos pondremos en contacto pronto.
          </p>
        </div>
        <form className="mt-12 max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full px-6 py-3 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 focus:outline-none focus:border-forma-pink transition"
          />
          <input
            type="email"
            placeholder="Tu email"
            className="w-full px-6 py-3 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 focus:outline-none focus:border-forma-pink transition"
          />
          <textarea
            placeholder="Cuéntanos sobre tu proyecto"
            rows={5}
            className="w-full px-6 py-3 rounded-lg bg-forma-white/10 border border-forma-white/20 text-forma-white placeholder-gray-500 focus:outline-none focus:border-forma-pink transition resize-none"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-forma-pink text-forma-black rounded-lg font-semibold hover:bg-forma-purple hover:text-forma-white transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}
