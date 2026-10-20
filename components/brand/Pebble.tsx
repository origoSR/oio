'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const PEBBLE_SHAPE = '42% 58% 53% 47% / 47% 44% 56% 53%'

/**
 * La piedra de marca. De momento es una forma dibujada: todavía no hay export de
 * Figma (190:130). Cuando exista public/brand/piedra.webp (2x, sobre transparente),
 * sustituye el <motion.div> de la base por una <Image src="/brand/piedra.webp" />
 * sin tocar las props de este componente (ver brief, paso 8).
 *
 * - Brillo: degradado radial que sigue al cursor (useMotionValue + useSpring).
 * - Inclinación: ±10° según la posición del cursor respecto al centro.
 * - Respirar: scale 1 → 1.04 → 1 en 6s, en bucle (CSS, .pebble-breathe en globals.css).
 * - Solo con ratón/trackpad: en táctil, y con "reducir movimiento", queda quieta.
 *
 * El tamaño lo decide `className` (p. ej. "w-50 h-50 md:block hidden"): así cada
 * sitio puede ser responsive (w-40 h-40 lg:w-70 lg:h-70…) sin pelearse con un
 * tamaño fijo por estilo en línea.
 */
export function Pebble({ breatheOnly = false, className }: { breatheOnly?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 15 })
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 15 })
  const springGlowX = useSpring(glowX, { stiffness: 120, damping: 20 })
  const springGlowY = useSpring(glowY, { stiffness: 120, damping: 20 })
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${springGlowX}% ${springGlowY}%, rgb(255 255 255 / 0.55), transparent 60%)`

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (breatheOnly || reducedMotion || e.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    glowX.set(px * 100)
    glowY.set(py * 100)
    tiltY.set((px - 0.5) * 20) // ±10°
    tiltX.set((0.5 - py) * 20)
  }

  const handlePointerLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('relative shrink-0 pebble-breathe', className)}
      style={{ perspective: 600 }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: PEBBLE_SHAPE, rotateX: springTiltX, rotateY: springTiltY }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, var(--color-line-strong), var(--color-fg-tertiary))' }} />
        <motion.div className="absolute inset-0" style={{ background: glowBackground }} />
      </motion.div>
    </div>
  )
}
