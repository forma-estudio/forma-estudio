'use client'

export default function HowWeWork() {
  const steps = [
    {
      number: 1,
      title: 'CONTANOS SOBRE TU NEGOCIO',
      description: 'Envianos tu web actual o simplemente el nombre de tu negocio y tu ciudad. Eso es todo lo que necesitamos para empezar.'
    },
    {
      number: 2,
      title: 'REVISÁ UNA VISTA PREVIA FUNCIONAL',
      description: 'Diseñamos una vista previa de tu nueva página de inicio: una página real que podés abrir en tu teléfono, no una presentación de diapositivas ni una propuesta.'
    },
    {
      number: 3,
      title: 'APROBÁ Y PERFECCIONÁ',
      description: 'Decinos qué ajustes necesitás. Cuando esté perfecto, desarrollamos la web completa. Si no te convence, no tenés que pagar nada.'
    },
    {
      number: 4,
      title: 'LANZAMIENTO Y EL DESPUÉS',
      description: 'Nos encargamos del dominio, el alojamiento y la puesta en marcha. A partir de ese momento, mantenemos el sitio web rápido, seguro y actualizado.'
    }
  ]

  const gradients = [
    'from-forma-black to-forma-purple',
    'from-forma-purple to-forma-pink',
    'from-forma-purple via-forma-pink to-forma-pink',
    'from-forma-pink to-pink-300'
  ]

  return (
    <section className="bg-forma-black py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-4">
          <p className="text-forma-pink font-semibold text-sm tracking-widest uppercase">
            Cómo trabajamos
          </p>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12">
          Un proceso sin riesgo inicial
        </h2>
      </div>

      <div className="relative overflow-hidden hover:pause-drift" onMouseEnter={(e) => e.currentTarget.classList.add('is-hovering')} onMouseLeave={(e) => e.currentTarget.classList.remove('is-hovering')}>
        <div className="flex gap-6 animate-drift">
          {steps.map((step, idx) => (
            <div
              key={`card-${step.number}`}
              className={`flex-shrink-0 w-96 h-96 rounded-2xl p-8 bg-gradient-to-br ${gradients[idx]} flex flex-col justify-between text-white`}
            >
              <div>
                <div className="text-7xl font-bold mb-4">
                  #{step.number}
                </div>
                <h3 className="text-2xl font-bold mb-6">
                  {step.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-50px);
          }
        }

        .animate-drift {
          animation: drift 9s ease-in-out infinite;
        }

        .is-hovering .animate-drift {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
