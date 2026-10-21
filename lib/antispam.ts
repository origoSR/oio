// Compartido entre los formularios (cliente) y app/actions/contact.ts (servidor).
// No puede vivir en contact.ts: un módulo "use server" solo puede exportar funciones.

/** Nombre del campo trampa. Sin relación semántica con nada que el autorrelleno
 * del navegador reconozca (antes era "company_website", que Chrome sí rellenaba). */
export const HONEYPOT_FIELD = 'hp_x7'
