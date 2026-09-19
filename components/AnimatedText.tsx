'use client'

import { useState, useEffect } from 'react'

const phrases = ['Con creatividad', 'Con diseño', 'Con inteligencia artificial']

export default function AnimatedText() {
  const [currentPhrase, setCurrentPhrase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="animate-text-rotate inline-block min-w-[300px]">
      {phrases[currentPhrase]}
    </span>
  )
}
