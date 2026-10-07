'use client'

import { useEffect, useRef } from 'react'

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sectionRef.current?.classList.add('reveal-ready')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = sectionRef.current?.querySelectorAll('.card-item') || []

    if (prefersReduced) {
      cards.forEach(card => card.classList.add('reveal'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cards.forEach((card, idx) => {
      const isSecondColumn = (idx + 1) % 2 === 0
      if (isSecondColumn) {
        (card as HTMLElement).style.setProperty('--delay', '120ms')
      }
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

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
    <section ref={sectionRef} id="como-trabajamos" className="bg-forma-black py-16 px-6 lg:overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-4">
          <p className="text-forma-pink font-semibold text-sm tracking-widest uppercase">
            Cómo trabajamos
          </p>
        </div>
        <h2 className="text-[clamp(2rem,9vw,3rem)] md:text-6xl font-bold text-white text-center mb-12">
          Un proceso sin riesgo inicial
        </h2>
      </div>

      <div className="relative lg:overflow-hidden lg:px-4" onMouseEnter={(e) => e.currentTarget.classList.add('is-hovering')} onMouseLeave={(e) => e.currentTarget.classList.remove('is-hovering')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex lg:gap-3 lg:w-fit drift-track">
          {steps.map((step, idx) => (
            <div
              key={`card-${step.number}`}
              className={`card-item rounded-2xl p-6 lg:p-8 w-full lg:shrink-0 lg:w-[clamp(280px,24vw,380px)] bg-gradient-to-br ${gradients[idx]} flex flex-col text-white lg:transition-transform lg:duration-300 lg:ease-out lg:cursor-pointer lg:min-h-[clamp(320px,28vw,420px)]`}
            >
              <div>
                <div className="text-6xl md:text-7xl font-bold mb-4">
                  #{step.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-6">
                  {step.title}
                </h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .reveal-ready .card-item {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 600ms ease-out, transform 600ms ease-out;
            transition-delay: var(--delay, 0ms);
          }

          .reveal-ready .card-item.reveal {
            opacity: 1;
            transform: translateY(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .reveal-ready .card-item {
              opacity: 1;
              transform: translateY(0);
              transition: none;
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes drift {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-40px);
            }
          }

          .drift-track {
            animation: drift 9s ease-in-out infinite;
          }

          .is-hovering .drift-track {
            animation-play-state: paused;
          }
        }

        @media (hover: hover) and (min-width: 1024px) {
          .card-item:hover {
            transform: scale(1.05);
          }

          .is-hovering .card-item:not(:hover) {
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  )
}
