'use client'

import { useEffect, useRef } from 'react'

// Port del prototipo aprobado (referencias/particulas-forma.html). Valores copiados tal cual.
export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const slot = document.getElementById('slot')
    const frase = document.getElementById('frase')
    const canvas = canvasRef.current
    if (!slot || !frase || !canvas) return
    const showFallback = () => { slot.style.color = '#B98CE8' }

    let disposed = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed) return

      let reduce = false
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch {}
      const mobile = window.innerWidth < 768
      const N = mobile ? 4500 : 10000
      const DPR = Math.min(window.devicePixelRatio || 1, 2)

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
      } catch {
        showFallback()
        return
      }
      renderer.setPixelRatio(DPR)
      renderer.setClearColor(0x101820, 1)

      const FOV = 50, CAMZ = 600
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 3000)
      camera.position.set(0, 0, CAMZ)
      const world = new THREE.Group()
      scene.add(world)

      let W = 0, H = 0, wpp0 = 1
      const resize = () => {
        W = window.innerWidth; H = window.innerHeight
        renderer.setSize(W, H, false)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        wpp0 = (2 * Math.tan(FOV * Math.PI / 360) * CAMZ) / H
      }
      resize()

      // Buffers
      const pos = new Float32Array(N * 3)
      const col = new Float32Array(N * 3)
      const size = new Float32Array(N)
      const alpha = new Float32Array(N)
      const chaos = new Float32Array(N * 3)   // x,y normalizados (-1..1), z absoluto
      const homePx = new Float32Array(N * 2)  // posición dentro del texto, en px
      const homeZ = new Float32Array(N)
      const delay = new Float32Array(N)
      const phase = new Float32Array(N)
      const xn = new Float32Array(N)
      const ox = new Float32Array(N), oy = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N)
      const hueKey = new Float32Array(N)  // posición de cada partícula en la paleta
      const rank = new Float32Array(N)    // orden en que aparece al scrollear (densidad)

      // blancos → celestes → azules → lavanda → violeta → rosa
      const palette = ['#FFFFFF', '#BFE0FF', '#6FA8FF', '#B98CE8', '#B14CFF', '#FF91A4'].map((h) => new THREE.Color(h))
      const gA = new THREE.Color('#B14CFF'), gB = new THREE.Color('#FF91A4')
      const paletteAt = (p: number, out: InstanceType<typeof THREE.Color>) => {
        const x = p * (palette.length - 1), a = Math.floor(x), b = Math.min(a + 1, palette.length - 1)
        return out.copy(palette[a]).lerp(palette[b], x - a)
      }

      for (let i = 0; i < N; i++) {
        // nube orgánica (disco, no rectángulo) que llena toda la pantalla
        const ang = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * 1.15
        chaos[i*3]   = Math.cos(ang) * rr
        chaos[i*3+1] = Math.sin(ang) * rr
        chaos[i*3+2] = -350 + Math.random() * 500
        delay[i] = Math.random() * 0.35
        phase[i] = Math.random() * Math.PI * 2
        hueKey[i] = Math.random()
        rank[i] = Math.random()
        homeZ[i] = (Math.random() - 0.5) * 26
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))

      const mat = new THREE.ShaderMaterial({
        uniforms: { uPx: { value: CAMZ * DPR } },
        vertexShader: [
          'attribute vec3 aColor; attribute float aSize; attribute float aAlpha;',
          'uniform float uPx; varying vec3 vC; varying float vA;',
          'void main(){ vC = aColor; vA = aAlpha;',
          ' vec4 mv = modelViewMatrix * vec4(position, 1.0);',
          ' gl_PointSize = aSize * uPx / -mv.z;',
          ' gl_Position = projectionMatrix * mv; }'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vC; varying float vA;',
          'void main(){ float d = length(gl_PointCoord - 0.5);',
          ' float a = smoothstep(0.5, 0.3, d);',
          ' gl_FragColor = vec4(vC, vA * a); }'
        ].join('\n'),
        transparent: true, depthWrite: false, blending: THREE.NormalBlending
      })
      world.add(new THREE.Points(geo, mat))

      // Muestreo de "FORMA" con la tipografía real (en Next la familia tiene nombre interno)
      const family = getComputedStyle(slot).fontFamily
      let ready = false
      const sample = () => {
        if (disposed) return
        const cs = getComputedStyle(slot)
        const fs = parseFloat(cs.fontSize)
        const r = slot.getBoundingClientRect()
        const cw = Math.ceil(r.width), ch = Math.ceil(r.height)
        if (!cw || !ch) return
        const c = document.createElement('canvas')
        c.width = cw; c.height = ch
        const x = c.getContext('2d')
        if (!x) return
        x.font = '700 ' + fs + 'px ' + family
        x.textBaseline = 'alphabetic'
        x.fillStyle = '#fff'
        const m = x.measureText('FORMA')
        const asc = m.fontBoundingBoxAscent || fs * 0.8, desc = m.fontBoundingBoxDescent || fs * 0.2
        const lh = r.height
        const baseline = (lh - (asc + desc)) / 2 + asc
        x.fillText('FORMA', 0, baseline)
        const data = x.getImageData(0, 0, cw, ch).data
        const step = Math.max(2, Math.round(fs / 34))
        const pts: number[] = []
        for (let yy = 0; yy < ch; yy += step) {
          for (let xx = 0; xx < cw; xx += step) {
            if (data[(yy * cw + xx) * 4 + 3] > 140) pts.push(xx, yy)
          }
        }
        const count = pts.length / 2
        if (!count) return
        for (let k = count - 1; k > 0; k--) {
          const j = (Math.random() * (k + 1)) | 0
          const tx = pts[k*2], ty = pts[k*2+1]
          pts[k*2] = pts[j*2]; pts[k*2+1] = pts[j*2+1]
          pts[j*2] = tx; pts[j*2+1] = ty
        }
        for (let p = 0; p < N; p++) {
          const q = p % count
          homePx[p*2]   = pts[q*2]   + (Math.random() - 0.5) * step * 0.8
          homePx[p*2+1] = pts[q*2+1] + (Math.random() - 0.5) * step * 0.8
          xn[p] = homePx[p*2] / cw
          delay[p] = xn[p] * 0.15 + Math.random() * 0.25  // la lluvia avanza suave de izquierda a derecha
        }
        ready = true
      }
      const fontReady = document.fonts?.load ? document.fonts.load('700 64px ' + family) : Promise.resolve()
      fontReady.then(() => document.fonts?.ready).then(sample, sample)

      let resizeTimer: ReturnType<typeof setTimeout> | undefined
      const onResize = () => {
        resize()
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(sample, 150)
      }

      // Puntero (mouse o dedo)
      let mx = 1e6, my = 1e6, tiltX = 0, tiltY = 0, stx = 0, sty = 0
      const onPointerMove = (e: PointerEvent) => {
        mx = (e.clientX - W / 2) * wpp0
        my = -(e.clientY - H / 2) * wpp0
        tiltX = (e.clientX / W) * 2 - 1
        tiltY = (e.clientY / H) * 2 - 1
      }
      const onPointerDown = (e: PointerEvent) => {
        mx = (e.clientX - W / 2) * wpp0
        my = -(e.clientY - H / 2) * wpp0
      }
      const onPointerLeave = () => { mx = my = 1e6 }
      const onPointerUp = (e: PointerEvent) => { if (e.pointerType !== 'mouse') { mx = my = 1e6 } }

      // e: avance de la página hasta la frase (nube, color y densidad)
      // f: avance dentro de la frase fija (transformación en FORMA)
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
      const progress = () => {
        const start = frase.offsetTop - H  // la frase empieza a asomar abajo
        const e = start > 0 ? clamp01(window.scrollY / start) : 1
        const f = clamp01((window.scrollY - start) / (H * 0.85))  // completa en menos de una pantalla de scroll
        return [e, f]
      }

      const color = new THREE.Color()
      let eS = 0, fS = 0, last = performance.now(), t = 0
      const halfFov = Math.tan(FOV * Math.PI / 360)
      let raf = 0

      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05); last = now
        if (!reduce) t += dt
        const pr = progress()
        const sm = reduce ? 1 : 0.08
        eS += (pr[0] - eS) * sm; fS += (pr[1] - fS) * sm
        const e = eS, fm = fS

        const r = slot.getBoundingClientRect()
        const viewW = W * wpp0, viewH = H * wpp0
        const shrink = 1 - 0.2 * e  // apenas se cierra: la condensación se nota por densidad, no por un bloque
        const R = (mobile ? 120 : 170) * wpp0, R2 = R * R
        const push = reduce ? 0 : 16
        const vis = Math.min(1, 0.06 + 0.86 * Math.pow(e, 1.3) + fm)  // densidad: pocas arriba, todas en la frase
        const hueShift = e * 0.8                                      // blancos/azules arriba → violetas/rosas abajo

        for (let i = 0; i < N; i++) {
          const j = i * 3
          let l = (fm - delay[i]) / 0.55; l = l < 0 ? 0 : l > 1 ? 1 : l
          // gravedad: arranca lento, acelera hacia su lugar y se asienta suave
          const q = 1 - l * l, s = 1 - q * q, k = 1 - s

          // destino en la frase
          const hz = homeZ[i]
          const wppZ = (2 * halfFov * (CAMZ - hz)) / H
          const hx = ready ? (r.left + homePx[i*2] - W / 2) * wppZ : 0
          const hy = ready ? -(r.top + homePx[i*2+1] - H / 2) * wppZ : 0

          // nube caótica que se va condensando
          const cz = chaos[j+2] * shrink
          const depthF = (CAMZ - cz) / CAMZ
          const cx = chaos[j] * viewW * 0.62 * shrink * depthF
          const cy = chaos[j+1] * viewH * 0.62 * shrink * depthF
          const drift = k * 14
          const ph = phase[i]

          const bx = cx * k + hx * s + Math.sin(t * 0.35 + ph) * drift
          const by = cy * k + hy * s + Math.sin(t * 0.29 + ph * 1.7) * drift
          const bz = cz * k + hz * s + Math.cos(t * 0.31 + ph * 1.3) * drift

          // repulsión del puntero, medida en pantalla para que funcione a cualquier profundidad
          if (push) {
            const proj = CAMZ / Math.max(CAMZ - bz, 1)
            const dx = (bx + ox[i]) * proj - mx, dy = (by + oy[i]) * proj - my, d2 = dx * dx + dy * dy
            if (d2 < R2 && d2 > 0.0001) {
              const d = Math.sqrt(d2)
              let f = (1 - d / R); f = f * f * push / proj
              vx[i] += dx / d * f; vy[i] += dy / d * f
            }
            vx[i] += -ox[i] * 0.03; vy[i] += -oy[i] * 0.03
            vx[i] *= 0.88; vy[i] *= 0.88
            ox[i] += vx[i]; oy[i] += vy[i]
          }

          pos[j] = bx + ox[i]; pos[j+1] = by + oy[i]; pos[j+2] = bz

          paletteAt(Math.min(hueKey[i] * 0.22 + hueShift, 1), color)
          const cr = color.r, cg = color.g, cb = color.b
          color.copy(gA).lerp(gB, xn[i])
          col[j]   = cr * k + color.r * s
          col[j+1] = cg * k + color.g * s
          col[j+2] = cb * k + color.b * s
          size[i] = (mobile ? 5.0 : 4.6) - 1.2 * s
          let on = (vis - rank[i]) / 0.04; on = on < 0 ? 0 : on > 1 ? 1 : on
          alpha[i] = 0.95 * on
        }
        geo.attributes.position.needsUpdate = true
        geo.attributes.aColor.needsUpdate = true
        geo.attributes.aSize.needsUpdate = true
        geo.attributes.aAlpha.needsUpdate = true

        // leve giro 3D que desaparece cuando la palabra está armada
        stx += (tiltX - stx) * 0.05; sty += (tiltY - sty) * 0.05
        const free = 1 - fm
        world.rotation.y = reduce ? 0 : (stx * 0.35 + Math.sin(t * 0.2) * 0.08) * free
        world.rotation.x = reduce ? 0 : (sty * 0.18) * free

        renderer.render(scene, camera)
        raf = requestAnimationFrame(frame)
      }

      const onVisibility = () => {
        if (document.hidden) { cancelAnimationFrame(raf); raf = 0 }
        else if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) }
      }

      window.addEventListener('resize', onResize)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerdown', onPointerDown, { passive: true })
      document.addEventListener('pointerleave', onPointerLeave)
      window.addEventListener('pointerup', onPointerUp, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      if (!document.hidden) raf = requestAnimationFrame(frame)

      cleanup = () => {
        cancelAnimationFrame(raf)
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerdown', onPointerDown)
        document.removeEventListener('pointerleave', onPointerLeave)
        window.removeEventListener('pointerup', onPointerUp)
        document.removeEventListener('visibilitychange', onVisibility)
        geo.dispose()
        mat.dispose()
        renderer.dispose()
      }
    }).catch(showFallback)

    return () => { disposed = true; cleanup() }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 w-full h-full block pointer-events-none" />
}
