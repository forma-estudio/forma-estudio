'use client'

import FaqAccordion from './FaqAccordion'

const FAQS = [
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende del alcance, pero la vista previa funcional la tenés en pocos días. El desarrollo completo suele tomar entre 2 y 4 semanas.' },
  { q: '¿Qué pasa si no me gusta el resultado?', a: 'No pagás nada. Te mostramos una vista previa real antes de cobrarte un solo peso — si no te convence, ahí termina, sin compromiso.' },
  { q: '¿Ofrecen mantenimiento después del lanzamiento?', a: 'Sí. Nos encargamos del dominio, el alojamiento y mantenemos tu sitio rápido, seguro y actualizado.' },
  { q: '¿Trabajan con negocios de cualquier rubro?', a: 'Sí, trabajamos con PyMEs, profesionales y comercios locales de cualquier rubro que quieran mejorar su presencia digital.' },
]

export default function AboutUs() {
  return (
    <section
      id="sobre-nosotros"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Contenido */}
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 data-reveal className="font-display text-5xl md:text-7xl font-bold mb-12 text-[#B98CE8]">
          Sobre nosotros
        </h2>

        <div data-reveal className="space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: '#FFFFFF', '--reveal-delay': '120ms' } as React.CSSProperties}>
          <p>
            En <strong>FORMA ESTUDIO</strong>, creemos que el diseño web es mucho más que estética. Es la puerta de entrada a tu negocio, la primera impresión que generan en tus clientes.
          </p>

          <p>
            No hacemos sitios web genéricos: cada proyecto es único, como tu empresa. Nos encargamos de todo: desde el concepto y diseño, hasta el desarrollo, lanzamiento y mantenimiento. Cuando trabajás con nosotros, trabajás con gente que entiende tus preocupaciones y las convierte en oportunidades.
          </p>
        </div>
        <div data-reveal className="mt-16 md:mt-24"><FaqAccordion faqs={FAQS} /></div>
      </div>

      <style jsx>{`
        section {
          cursor: default;
        }
      `}</style>
    </section>
  )
}
