export default function Portfolio() {
  const projects = [
    {
      title: 'E-commerce Premium',
      category: 'Tienda Online',
      color: 'from-forma-pink to-forma-purple',
    },
    {
      title: 'SaaS Platform',
      category: 'Aplicación Web',
      color: 'from-forma-purple to-forma-black',
    },
    {
      title: 'Agencia Creativa',
      category: 'Sitio Corporativo',
      color: 'from-forma-pink to-forma-black',
    },
    {
      title: 'Landing Page',
      category: 'Conversión',
      color: 'from-forma-black to-forma-purple',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-forma-black mb-4">
            Portafolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proyectos que demuestran nuestro compromiso con la excelencia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`bg-gradient-to-br ${project.color} p-8 rounded-xl h-48 flex flex-col justify-end cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105`}
            >
              <p className="text-forma-white/70 text-sm mb-2">{project.category}</p>
              <h3 className="text-2xl font-bold text-forma-white">{project.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
