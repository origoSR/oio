'use client'

import { RefObject, useEffect, useState } from 'react'
import { motion, useAnimationControls, useMotionValue } from 'framer-motion'
import { LogoVivo } from '@/components/home/LogoVivo'
import { useIsMobile } from '@/hooks/use-mobile'

interface GlobalDraggableLogoProps {
  containerRef: RefObject<HTMLElement>
}

export function GlobalDraggableLogo({ containerRef }: GlobalDraggableLogoProps) {
  const isMobile = useIsMobile()
  const logoSize = isMobile ? 160 : 220
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [initialized, setInitialized] = useState(false)
  const [isPositioned, setIsPositioned] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hintDone, setHintDone] = useState(false)
  const hintControls = useAnimationControls()

  useEffect(() => {
    // En móvil no necesitamos posicionar via anchor — se centra con CSS
    if (isMobile) {
      setInitialized(true)
      return
    }

    const anchor = document.getElementById('draggable-logo-anchor')
    const container = containerRef.current
    if (!anchor || !container) return

    const rect = anchor.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    x.set(rect.left - containerRect.left)
    y.set(rect.top - containerRect.top)
    setInitialized(true)
    setIsPositioned(true)
  }, [containerRef, x, y, isMobile])

  useEffect(() => {
    // Hint bounce solo en desktop
    if (isMobile || !isPositioned || hintDone) return

    let cancelled = false
    let frameOne: number | null = null
    let frameTwo: number | null = null

    const startHint = () => {
      hintControls
        .start({
          y: [0, -18, 0, -10, 0, -4, 0],
          transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        })
        .then(() => {
          if (!cancelled) setHintDone(true)
        })
    }

    frameOne = requestAnimationFrame(() => {
      frameTwo = requestAnimationFrame(() => {
        if (!cancelled) startHint()
      })
    })

    return () => {
      cancelled = true
      if (frameOne) cancelAnimationFrame(frameOne)
      if (frameTwo) cancelAnimationFrame(frameTwo)
      hintControls.stop()
    }
  }, [hintControls, hintDone, isPositioned, isMobile])

  const cancelHintIfActive = () => {
    if (hintDone) return
    hintControls.stop()
    hintControls.start({ y: 0, transition: { duration: 0.12, ease: 'easeOut' } })
    setHintDone(true)
  }

  if (!initialized) return null

  // MÓVIL — centrado fijo, solo decorativo
  if (isMobile) {
    return (
      <div
        className="absolute z-[2000] select-none pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${logoSize}px`,
          mixBlendMode: 'difference',
        }}
      >
        <LogoVivo size={logoSize} />
      </div>
    )
  }

  // DESKTOP — draggable con hint bounce
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileTap={{ scale: 0.98 }}
      onDragStart={() => {
        setIsDragging(true)
        cancelHintIfActive()
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`absolute z-[2000] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        top: 0,
        left: 0,
        width: `${logoSize}px`,
        touchAction: 'none',
        mixBlendMode: 'difference',
        x,
        y,
      }}
    >
      <motion.div animate={hintControls} initial={{ y: 0 }}>
        <LogoVivo size={logoSize} />
      </motion.div>
    </motion.div>
  )
}
