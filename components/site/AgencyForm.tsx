'use client'

import { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Field, type FieldProps } from '@/components/site/Field'
import { ChoiceGroup } from '@/components/site/ChoiceGroup'
import { Checkbox } from '@/components/site/Checkbox'
import { Button } from '@/components/site/Button'
import { agencies, formErrors } from '@/content/services'
import { submitAgencyForm, type FormState } from '@/app/actions/contact'

const initialState: FormState = { status: 'idle' }

/** Formulario de /agencias. */
export function AgencyForm() {
  const [state, formAction, pending] = useActionState(submitAgencyForm, initialState)
  const startedAtRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const form = agencies.form

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now())
  }, [])

  useEffect(() => {
    if (state.status === 'success') successRef.current?.focus()
  }, [state.status])

  if (state.status === 'success') {
    return (
      <div className="border-t border-line-strong pt-6 flex flex-col gap-3" aria-live="polite">
        <p className="label text-fg-tertiary">{form.success.label}</p>
        <h3 ref={successRef} tabIndex={-1} className="text-h3 focus:outline-none">
          {form.success.title}
        </h3>
        <p className="text-body text-fg-secondary">{form.success.text}</p>
        <Link href={form.success.link.href} className="text-body font-semibold hover:opacity-70 transition-opacity">
          {form.success.link.label}
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Antispam: campo trampa oculto + started_at para descartar envíos a menos de 3s. */}
      <input ref={startedAtRef} type="hidden" name="started_at" />
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="agency-company-website">No rellenar</label>
        <input id="agency-company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {state.status === 'error' && state.errors?.form && (
          <p className="flex items-center gap-1.5 text-small text-fg">
            <span aria-hidden="true">!</span> {state.errors.form}
          </p>
        )}
      </div>

      {form.fields.map((field) => {
        if (field.type === 'chips') {
          return (
            <ChoiceGroup
              key={field.name}
              legend={field.label}
              name={field.name}
              type="checkbox"
              options={field.options ?? []}
              required={field.required}
              error={state.status === 'error' ? state.errors?.[field.name] : undefined}
            />
          )
        }
        if (field.type === 'radio') {
          return (
            <ChoiceGroup
              key={field.name}
              legend={field.label}
              name={field.name}
              type="radio"
              options={field.options ?? []}
              required={field.required}
              error={state.status === 'error' ? state.errors?.[field.name] : undefined}
            />
          )
        }
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
            error={state.status === 'error' ? state.errors?.[field.name] : undefined}
          />
        )
      })}

      <Checkbox name="privacidad" label={form.privacy} required error={state.status === 'error' ? state.errors?.privacidad : undefined} />

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? formErrors.sending : form.submit}
      </Button>
      <p className="text-small text-fg-tertiary">{form.alt}</p>
    </form>
  )
}
