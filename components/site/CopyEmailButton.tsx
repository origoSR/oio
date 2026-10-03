'use client'

import { useState } from 'react'

export function CopyEmailButton({ email, copyLabel, copiedLabel }: { email: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={handleCopy} className="text-body font-semibold hover:opacity-70 transition-opacity self-start">
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  )
}
