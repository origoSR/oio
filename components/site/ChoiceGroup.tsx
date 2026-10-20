'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Grupo de opciones con el aspecto de FilterChip. <fieldset> + <legend>, con
 * checkbox (multiselección) o radio (una opción) ocultos visualmente (sr-only)
 * y el chip como <label>. Los radios ya navegan con flechas de forma nativa
 * (mismo `name`); para los checkbox se añade la navegación con flechas a mano.
 */
export function ChoiceGroup({
  legend,
  name,
  type,
  options,
  required,
  defaultValue,
  error,
  id,
}: {
  legend: string
  name: string
  type: 'checkbox' | 'radio'
  options: string[]
  required?: boolean
  defaultValue?: string[]
  error?: string
  id?: string
}) {
  const groupId = id ?? name
  const errorId = `${groupId}-error`
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (type !== 'checkbox') return
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + options.length) % options.length
    refs.current[next]?.focus()
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-body font-semibold mb-1">
        {legend}
        {required && (
          <span aria-hidden="true" className="text-fg-tertiary">
            {' '}
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2" aria-describedby={error ? errorId : undefined}>
        {options.map((opt, i) => (
          <label
            key={opt}
            className={cn(
              'text-body px-4 py-2 rounded-full border cursor-pointer transition-colors',
              'border-line text-fg-secondary hover:border-line-strong hover:text-fg',
              'has-[:checked]:bg-inverse has-[:checked]:text-fg-on-inverse has-[:checked]:border-line-strong',
              'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus'
            )}
          >
            <input
              ref={(el) => {
                refs.current[i] = el
              }}
              type={type}
              name={type === 'checkbox' ? `${name}[]` : name}
              value={opt}
              defaultChecked={defaultValue?.includes(opt)}
              required={type === 'radio' ? required : undefined}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-small text-fg">
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </fieldset>
  )
}
