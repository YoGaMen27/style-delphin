import { useRef, useEffect } from 'react'

interface WaveDividerProps {
  fill?: string
  prevColor?: string
  nextColor?: string
}

export default function WaveDivider({ fill = '#F8FAFC' }: WaveDividerProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    let raf: number
    const animate = (time: number) => {
      const t = time * 0.0003
      const y1 = 50 + Math.sin(t) * 25
      const d = `M 0,50 Q 150,${y1} 300,50 T 600,50 T 900,50 T 1200,50 V 100 H 0 Z`
      path.setAttribute('d', d)
      frameRef.current = time
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative w-full overflow-hidden leading-[0]" style={{ marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: '80px' }}
      >
        <path
          ref={pathRef}
          d="M 0,50 Q 150,20 300,50 T 600,50 T 900,50 T 1200,50 V 100 H 0 Z"
          fill={fill}
          stroke={fill === '#0F172A' ? 'rgba(34,211,238,0.15)' : 'rgba(15,23,42,0.06)'}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
