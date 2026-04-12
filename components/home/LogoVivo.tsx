'use client'

import { useEffect, useRef } from 'react'

interface LogoVivoProps {
  size?: number
}

export function LogoVivo({ size = 220 }: LogoVivoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = size
    const H = size
    const cx = size / 2
    const cy = size / 2
    const scale = size / 300
    const outerR = 100 * scale
    const innerBaseR = 38 * scale
    let t = 0
    let animId: number

    function blobPath(
      t: number,
      baseR: number,
      numPoints: number,
      ampFn: (angle: number, t: number) => number
    ): { x: number; y: number }[] {
      const pts: { x: number; y: number }[] = []
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2
        const r = baseR + ampFn(angle, t)
        pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r })
      }
      return pts
    }

    function drawBlob(pts: { x: number; y: number }[], fillColor: string) {
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i]
        const p1 = pts[i + 1]
        const mx = (p0.x + p1.x) / 2
        const my = (p0.y + p1.y) / 2
        ctx.quadraticCurveTo(p0.x, p0.y, mx, my)
      }
      ctx.closePath()
      ctx.fillStyle = fillColor
      ctx.fill()
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      t += 0.018

      // Anillo exterior — blanco para que difference funcione igual que el SVG original
      ctx.beginPath()
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Blob interior orgánico
      const innerPts = blobPath(t, innerBaseR, 80, (angle, t) => (
        Math.sin(angle * 3 + t * 1.1) * 5  * scale +
        Math.sin(angle * 5 - t * 0.7) * 3.5 * scale +
        Math.sin(angle * 2 + t * 1.7) * 4  * scale +
        Math.cos(angle * 4 + t * 0.9) * 3  * scale
      ))

      // Desplazamiento sutil del centro para dar más vida
      const offX = Math.sin(t * 0.6) * 4 * scale
      const offY = Math.cos(t * 0.5) * 3 * scale
      const shiftedPts = innerPts.map(p => ({ x: p.x + offX, y: p.y + offY }))

      // Recortar el blob del anillo (transparent hole)
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      drawBlob(shiftedPts, 'rgba(0,0,0,1)')
      ctx.restore()

      animId = requestAnimationFrame(frame)
    }

    frame()

    return () => cancelAnimationFrame(animId)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}
