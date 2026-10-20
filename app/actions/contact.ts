'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { formErrors, contactForm, agencies } from '@/content/services'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  errors?: Record<string, string>
}

const resend = new Resend(process.env.RESEND_API_KEY)
const CONTACT_TO = process.env.CONTACT_TO ?? 'rodrigo@oi0.es'
const CONTACT_FROM = process.env.CONTACT_FROM ?? 'web@oi0.es'

/** Campo trampa oculto + envíos a menos de 3s desde que se pinta el formulario: se descartan sin avisar. */
function isSpam(formData: FormData) {
  if (formData.get('company_website')) return true
  const startedAt = Number(formData.get('started_at') ?? 0)
  return !startedAt || Date.now() - startedAt < 3000
}

function zodErrors(error: z.ZodError) {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}

const clientSchema = z.object({
  nombre: z.string().trim().min(1, formErrors.nombre),
  email: z.string().trim().email(formErrors.email),
  telefono: z.string().optional(),
  servicio: z.string().min(1, formErrors.servicio),
  web: z.string().optional(),
  cuando: z.string().optional(),
  mensaje: z.string().trim().min(1, formErrors.mensaje),
  privacidad: z.literal('on', { message: formErrors.privacidad }),
})

const agencySchema = z.object({
  agencia: z.string().trim().min(1, formErrors.agencia),
  nombre: z.string().trim().min(1, formErrors.nombre),
  email: z.string().trim().email(formErrors.email),
  web: z.string().optional(),
  trabajo: z.array(z.string()).min(1, formErrors.trabajo),
  formato: z.string().optional(),
  cuando: z.string().optional(),
  mensaje: z.string().trim().min(1, formErrors.mensaje),
  privacidad: z.literal('on', { message: formErrors.privacidad }),
})

export async function submitContactForm(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: 'success' } // no se envía nada; quien lo manda no lo nota.

  const parsed = clientSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { status: 'error', errors: zodErrors(parsed.error) }

  const v = parsed.data
  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: v.email,
      subject: `Presupuesto · ${v.servicio} · ${v.nombre}`,
      text: [
        `Nombre: ${v.nombre}`,
        `Email: ${v.email}`,
        v.telefono && `Teléfono: ${v.telefono}`,
        `Qué necesita: ${v.servicio}`,
        v.web && `Web actual: ${v.web}`,
        v.cuando && `Para cuándo: ${v.cuando}`,
        '',
        v.mensaje,
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch {
    return { status: 'error', errors: { form: contactForm.error } }
  }

  return { status: 'success' }
}

export async function submitAgencyForm(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: 'success' }

  const raw = Object.fromEntries(formData)
  const trabajo = formData.getAll('trabajo[]').map(String)
  const parsed = agencySchema.safeParse({ ...raw, trabajo })
  if (!parsed.success) return { status: 'error', errors: zodErrors(parsed.error) }

  const v = parsed.data
  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: v.email,
      subject: `Agencia · ${v.agencia} · ${v.nombre}`,
      text: [
        `Agencia: ${v.agencia}`,
        `Nombre: ${v.nombre}`,
        `Email: ${v.email}`,
        v.web && `Web: ${v.web}`,
        `Qué necesita: ${v.trabajo.join(', ')}`,
        v.formato && `Formato: ${v.formato}`,
        v.cuando && `Para cuándo: ${v.cuando}`,
        '',
        v.mensaje,
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch {
    return { status: 'error', errors: { form: agencies.form.error } }
  }

  return { status: 'success' }
}
