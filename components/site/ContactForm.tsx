'use client'

import { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Field, type FieldProps } from '@/components/site/Field'
import { Checkbox } from '@/components/site/Checkbox'
import { Button } from '@/components/site/Button'
import { contactForm, formErrors } from '@/content/services'
import { submitContactForm, type FormState } from '@/app/actions/contact'

const initialState: FormState = { status: 'idle' }

/** Formulario de /contacto (clientes directos). `defaultServicio` llega de ?servicio=. */
export function ContactForm({ defaultServicio }: { defaultServicio?: string }) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)
  const startedAtRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now())
  }, [])

  useEffect(() => {
    if (state.status === 'success') successRef.current?.focus()
  }, [state.status])

  if (state.status === 'success') {
    return (
      <div className="border-t border-line-strong pt-6 flex flex-col gap-3" aria-live="polite">
        <p className="label text-fg-tertiary">{contactForm.success.label}</p>
        <h3 ref={successRef} tabIndex={-1} className="text-h3 focus:outline-none">
          {contactForm.success.title}
        </h3>
        <p className="text-body text-fg-secondary">{contactForm.success.text}</p>
        <Link href={contactForm.success.link.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
          {contactForm.success.link.label}
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Antispam: campo trampa oculto + started_at para descartar envíos a menos de 3s. */}
      <input ref={startedAtRef} type="hidden" name="started_at" />
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-company-website">No rellenar</label>
        <input id="contact-company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {state.status === 'error' && state.errors?.form && (
          <p className="flex items-center gap-1.5 text-small text-fg">
            <span aria-hidden="true">!</span> {state.errors.form}
          </p>
        )}
      </div>

      {contactForm.fields.map((field) => {
        const placeholder = 'placeholder' in field ? field.placeholder : undefined
        const options = 'options' in field ? field.options : undefined
        return (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type as FieldProps['type']}
            required={field.required}
            placeholder={placeholder}
            options={options}
            defaultValue={field.name === 'servicio' ? defaultServicio : undefined}
            error={state.status === 'error' ? state.errors?.[field.name] : undefined}
          />
        )
      })}

      <Checkbox name="privacidad" label={contactForm.privacy} required error={state.status === 'error' ? state.errors?.privacidad : undefined} />

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? formErrors.sending : contactForm.submit}
      </Button>
    </form>
  )
}
