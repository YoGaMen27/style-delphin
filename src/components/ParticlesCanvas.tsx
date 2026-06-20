import { useRef, useEffect, memo } from 'react'

interface ParticlesCanvasProps {
  density?: number
  className?: string
}

const ParticlesCanvas = memo(function ParticlesCanvas({ density = 40, className = '' }: ParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf: number

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        w = canvas.width = rect.width
        h = canvas.height = rect.height
      }
    }

    resize()
    window.addEventListener('resize', resize)

    interface Particle {
      x: number
      y: number
      size: number
      speedY: number
      offset: number
      opacity: number
    }

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 2 + Math.random() * 2,
      speedY: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      opacity: 0.1 + Math.random() * 0.3,
    }))

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.y -= p.speedY
        const ox = Math.sin(frame * 0.01 + p.offset) * 0.5

        ctx.beginPath()
        ctx.arc(p.x + ox, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`
        ctx.fill()

        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
      }

      frame++
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
})

export default ParticlesCanvas
