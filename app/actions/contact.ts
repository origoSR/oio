'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { formErrors, contactForm, agencies } from '@/content/services'
import { HONEYPOT_FIELD } from '@/lib/antispam'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  errors?: Record<string, string>
}

const CONTACT_TO = process.env.CONTACT_TO ?? 'rodrigo@oi0.es'
const CONTACT_FROM = process.env.CONTACT_FROM ?? 'web@oi0.es'

// El constructor de Resend lanza una excepción sin RESEND_API_KEY. Si eso pasara con
// `new Resend(...)` a nivel de módulo, tumbaría la página entera (500) en vez de ir al
// estado de error del formulario. Se construye dentro del try/catch de cada envío.
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

const MIN_ELAPSED_MS = 2000

/**
 * Campo trampa relleno, o envío a menos de MIN_ELAPSED_MS del momento en que el
 * formulario se pintó en el cliente: se descarta sin avisar a quien lo manda, pero
 * queda un console.warn (sin datos personales) para poder diagnosticarlo en los
 * logs de Vercel.
 */
function isSpam(formData: FormData, formName: 'contacto' | 'agencias'): boolean {
  if (formData.get(HONEYPOT_FIELD)) {
    console.warn(`[${formName}] envío descartado: campo trampa relleno (posible autorrelleno del navegador)`)
    return true
  }

  const startedAt = Number(formData.get('started_at') ?? 0)
  if (!startedAt) {
    console.warn(`[${formName}] envío descartado: falta started_at`)
    return true
  }

  const elapsed = Date.now() - startedAt
  if (elapsed < MIN_ELAPSED_MS) {
    console.warn(`[${formName}] envío descartado: demasiado rápido (${elapsed}ms < ${MIN_ELAPSED_MS}ms)`)
    return true
  }

  return false
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
  if (isSpam(formData, 'contacto')) return { status: 'success' } // no se envía nada; quien lo manda no lo nota.

  const parsed = clientSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { status: 'error', errors: zodErrors(parsed.error) }

  const v = parsed.data
  try {
    await getResendClient().emails.send({
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
  } catch (error) {
    console.error('[contacto] error al enviar con Resend:', error)
    return { status: 'error', errors: { form: contactForm.error } }
  }

  return { status: 'success' }
}

export async function submitAgencyForm(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData, 'agencias')) return { status: 'success' }

  const raw = Object.fromEntries(formData)
  const trabajo = formData.getAll('trabajo[]').map(String)
  const parsed = agencySchema.safeParse({ ...raw, trabajo })
  if (!parsed.success) return { status: 'error', errors: zodErrors(parsed.error) }

  const v = parsed.data
  try {
    await getResendClient().emails.send({
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
  } catch (error) {
    console.error('[agencias] error al enviar con Resend:', error)
    return { status: 'error', errors: { form: agencies.form.error } }
  }

  return { status: 'success' }
}
