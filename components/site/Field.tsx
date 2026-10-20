import { cn } from '@/lib/utils'

export type FieldOption = string | { value: string; label: string }

export type FieldProps = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  defaultValue?: string
  error?: string
  id?: string
}

const optionValue = (opt: FieldOption) => (typeof opt === 'string' ? opt : opt.value)
const optionLabel = (opt: FieldOption) => (typeof opt === 'string' ? opt : opt.label)

/**
 * Site/Field. Etiqueta en body-strong encima; caja bg-surface, borde line, rounded-sm.
 * Error: sin token de color de error en el tema → texto en fg con un icono "!" debajo.
 */
export function Field({ name, label, type, required, placeholder, options, defaultValue, error, id }: FieldProps) {
  const fieldId = id ?? name
  const errorId = `${fieldId}-error`

  const baseClasses = cn(
    'w-full bg-surface border rounded-sm px-4 py-3 text-body text-fg placeholder:text-fg-tertiary transition-colors',
    error ? 'border-line-strong' : 'border-line focus:border-line-strong',
    'focus:outline-none'
  )

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-body font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-fg-tertiary">
            {' '}
            *
          </span>
        )}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(baseClasses, 'h-40 resize-none')}
        />
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={fieldId}
            name={name}
            required={required}
            defaultValue={defaultValue ?? ''}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(baseClasses, 'appearance-none pr-10 invalid:text-fg-tertiary')}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((opt) => (
              <option key={optionValue(opt)} value={optionValue(opt)}>
                {optionLabel(opt)}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-tertiary">
            ⌄
          </span>
        </div>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={baseClasses}
        />
      )}

      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-small text-fg">
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  )
}
