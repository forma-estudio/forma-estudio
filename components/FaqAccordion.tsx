'use client'
import { useState } from 'react'

type Faq = { q: string; a: string }

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8">Preguntas frecuentes</h3>
      <div className="border-t border-white/15">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={i} className="border-b border-white/15">
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-4 md:py-5 text-left text-white font-semibold text-base md:text-lg"
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-[#B98CE8] transition-transform duration-300 motion-reduce:transition-none" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-white/80 text-base md:text-lg">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
