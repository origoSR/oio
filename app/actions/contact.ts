'use server'

// Paso 3: forma del Server Action, para que /contacto y /agencias ya puedan enviar
// su formulario. La validación con zod, el envío por Resend y el antispam se
// completan en el paso 4 (ver brief-fase4.md).

export type FormState = {
  status: 'idle' | 'success' | 'error'
  errors?: Record<string, string>
}

export async function submitContactForm(_prev: FormState, _formData: FormData): Promise<FormState> {
  return { status: 'success' }
}

export async function submitAgencyForm(_prev: FormState, _formData: FormData): Promise<FormState> {
  return { status: 'success' }
}
