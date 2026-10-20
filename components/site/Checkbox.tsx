import Link from 'next/link'

/**
 * Site/Checkbox. Casilla de 20px con el texto clicable; «política de privacidad»
 * dentro del texto enlaza a /privacidad.
 */
export function Checkbox({
  name,
  label,
  required,
  error,
  id,
}: {
  name: string
  label: string
  required?: boolean
  error?: string
  id?: string
}) {
  const fieldId = id ?? name
  const errorId = `${fieldId}-error`
  const parts = label.split('política de privacidad')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="flex items-start gap-3 text-body cursor-pointer">
        <input
          id={fieldId}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-fg"
        />
        <span>
          {parts[0]}
          {parts.length > 1 && (
            <>
              <Link href="/privacidad" className="underline hover:opacity-70 transition-opacity">
                política de privacidad
              </Link>
              {parts[1]}
            </>
          )}
        </span>
      </label>
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-small text-fg">
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  )
}
