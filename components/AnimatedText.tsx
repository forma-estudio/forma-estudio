'use client'

import { useState, useEffect } from 'react'

const phrases = ['Creatividad', 'Diseño', 'Inteligencia artificial']
const TYPING_SPEED = 70
const PAUSE_TIME = 1800
const DELETE_SPEED = 70

type Phase = 'typing' | 'pause' | 'deleting'

export default function AnimatedText() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const currentPhrase = phrases[currentPhraseIndex]

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Main typing/deleting logic
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (phase === 'typing') {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, TYPING_SPEED)
      } else {
        // Finished typing, go to pause
        timeout = setTimeout(() => {
          setPhase('pause')
        }, PAUSE_TIME)
      }
    } else if (phase === 'pause') {
      // After pause, start deleting
      timeout = setTimeout(() => {
        setPhase('deleting')
      }, 100)
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1)
          setDisplayedText(currentPhrase.slice(0, charIndex - 1))
        }, DELETE_SPEED)
      } else {
        // Finished deleting, move to next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, phase, currentPhrase])

  return (
    <span className="inline-block text-forma-pink">
      {displayedText}
      {phase !== 'deleting' && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
      )}
    </span>
  )
}
