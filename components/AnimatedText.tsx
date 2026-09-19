'use client'

import { useState, useEffect } from 'react'

const phrases = ['Creatividad', 'Diseño', 'Inteligencia artificial']

export default function AnimatedText() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsTransitioning(false)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-block min-w-[220px] text-forma-pink transition-all duration-500 ease-in-out ${
        isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      {phrases[currentPhrase]}
    </span>
  )
}
