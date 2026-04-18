'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => setVisible(false)
    video.addEventListener('ended', handleEnded)

    // Fallback: si el vídeo no arranca en 5s, ocultamos el loader
    const fallback = setTimeout(() => setVisible(false), 5000)

    return () => {
      video.removeEventListener('ended', handleEnded)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            ref={videoRef}
            src="/logo-intro.mp4"
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
