'use client'
import { useEffect, RefObject } from 'react'

type Globe = { el: RefObject<HTMLDivElement | null>; degPerSec: number }

export function useGlobeSpin(globes: Globe[], sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = globes.map(() => ({ angle: 0, extra: 0, lastX: null as number | null }))
    let raf = 0
    let visible = true
    let last = performance.now()
    const cleanups: (() => void)[] = []

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      globes.forEach((g, i) => {
        const s = state[i]
        s.angle += g.degPerSec * dt + (reduce ? 0 : s.extra)
        s.extra *= 0.95
        if (g.el.current) g.el.current.style.transform = `rotate(${s.angle}deg)`
      })
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!raf && mq.matches && visible) { last = performance.now(); raf = requestAnimationFrame(tick) }
    }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    globes.forEach((g, i) => {
      const wrap = g.el.current?.parentElement
      if (!wrap) return
      const down = (e: PointerEvent) => { state[i].lastX = e.clientX }
      const move = (e: PointerEvent) => {
        const s = state[i]
        if (s.lastX === null) return
        s.extra += (e.clientX - s.lastX) * 0.05
        s.lastX = e.clientX
      }
      const up = () => { state[i].lastX = null }
      wrap.addEventListener('pointerdown', down)
      wrap.addEventListener('pointermove', move)
      wrap.addEventListener('pointerup', up)
      wrap.addEventListener('pointercancel', up)
      cleanups.push(() => {
        wrap.removeEventListener('pointerdown', down)
        wrap.removeEventListener('pointermove', move)
        wrap.removeEventListener('pointerup', up)
        wrap.removeEventListener('pointercancel', up)
      })
    })

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop() })
    if (sectionRef.current) io.observe(sectionRef.current)
    const onChange = () => {
      if (mq.matches) start()
      else { stop(); globes.forEach(g => { if (g.el.current) g.el.current.style.transform = '' }) }
    }
    mq.addEventListener('change', onChange)
    start()
    return () => { stop(); io.disconnect(); mq.removeEventListener('change', onChange); cleanups.forEach(c => c()) }
  }, [])
}
