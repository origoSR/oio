'use client'

import { useState, useEffect } from 'react'
import { Loader } from './Loader'

export function LoaderOnce() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('loader-seen')
    if (!seen) {
      setShow(true)
      sessionStorage.setItem('loader-seen', '1')
    }
  }, [])

  if (!show) return null
  return <Loader />
}
