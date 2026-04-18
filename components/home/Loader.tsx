'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => setVisible(false)
    video.addEventListener('ended', handleEnded)

    // iOS Safari requiere .play() explícito aunque autoPlay esté presente.
    // Si falla (autoplay bloqueado), mostramos el logo estático 3s y luego fade out.
    video.play().catch(() => {
      setVideoFailed(true)
      setTimeout(() => setVisible(false), 3000)
    })

    // Fallback de seguridad: si tras 6s el vídeo no ha terminado, ocultamos el loader
    const fallback = setTimeout(() => setVisible(false), 6000)

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
          {videoFailed ? (
            // Fallback estático cuando el autoplay falla (iOS restringido)
            <img
              src="/logo.svg"
              alt=""
              style={{ width: 120, height: 120, opacity: 0.85 }}
            />
          ) : (
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
