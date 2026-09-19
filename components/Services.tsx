export default function Services() {
  const services = [
    {
      title: 'Diseño Web',
      description: 'Interfaces modernas y atractivas que capturan la esencia de tu marca',
      icon: '🎨',
    },
    {
      title: 'Desarrollo',
      description: 'Código limpio y optimizado para un rendimiento excepcional',
      icon: '⚙️',
    },
    {
      title: 'Marketing Digital',
      description: 'Estrategias digitales que impulsan tu presencia online',
      icon: '📈',
    },
  ]

  return (
    <section className="py-20 px-6 bg-forma-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-forma-black mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones digitales integrales para transformar tu negocio
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gradient-to-br from-forma-black to-forma-purple p-8 rounded-xl text-forma-white hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
