'use client'

import { useState } from 'react'
import { Button } from '@/components/site/Button'

export function CopyEmailButton({ email, copyLabel, copiedLabel }: { email: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button type="button" variant="secondary" onClick={handleCopy} className="self-start">
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </Button>
  )
}
