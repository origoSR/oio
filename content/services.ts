// Servicios para clientes directos y página de agencias. v1 · 17 oct 2026.
// Se suma a content/{types,projects,site}.ts. Sin precios publicados (decisión de Rodrigo).
//
// Rutas nuevas: /servicios · /servicios/diseno-web · /servicios/seo · /servicios/branding
//               /servicios/redes-sociales · /agencias (fuera del menú: pie y outreach)
// Menú: Proyectos · Servicios · Contacto
//
// Cambios en otros archivos (para el brief):
// - types.ts → Service suma 'redes-sociales'.
// - projects.ts → salma.services = ['branding', 'redes-sociales'].
// - site.ts → nav suma Servicios; projectsPage.filters suma { slug: 'redes-sociales', label: 'Redes sociales' };
//   home.services: web, seo, branding y redes enlazan a su página de servicio (ver homeServiceLinks);
//   producto y sistemas de diseño siguen yendo a /proyectos?servicio=; el pie suma "Para agencias".
// - /contacto usa contactForm y lee ?servicio= (igual que ?proyecto=).
// - Formularios: hace falta página /privacidad (RGPD) y backend (Server Action + Resend a rodrigo@oi0.es,
//   con honeypot). Lo concreta el brief.
//
// v1.1 (17 oct): sin plazos en semanas por ahora; disponibilidad oculta; compromiso con agencias a 12 meses (propuesta).
// v1.2 (17 oct): textos que salen del diseño en Figma (página «Servicios»): títulos de paquetes y FAQ, enlaces a proyectos, aviso de agencias, placeholders del formulario.
// v1.3 (17 oct): mensajes de error de los formularios (formErrors) y «kioscos» en /agencias.
// v1.4 (17 oct): estado «Enviado» con título, texto y enlace (success pasa a objeto); privacyPage y notFoundPage.
// v1.5 (17 oct): revisión de copys aprobada (S1–S9, A1–A5, K1, K3, K4, V2, V3, E1). Regla de no captación sin plazo en la web. Aviso legal (legalPage, legalLinks). Shopify dentro de Diseño web (paquete y pregunta).
// v1.6 (20 oct): domicilio del aviso legal completo (dirección del coworking).

import type { Service } from './types'

export type ServiceSlug = 'diseno-web' | 'seo' | 'branding' | 'redes-sociales'

export type Package = {
  title: string
  text: string
  includes: string[]
  /** Plazo orientativo. Sin precio. De momento solo 'Mes a mes'; los plazos en semanas se añaden más adelante. */
  time?: string
  featured?: boolean
}

export type Faq = { q: string; a: string }

export type ServicePage = {
  slug: ServiceSlug
  /** Filtro de /proyectos que alimenta "Proyectos relacionados". */
  filter: Service
  /** Proyectos destacados de este servicio, en orden (rejilla 8+4). */
  cases: string[]
  title: string // nombre corto (menú, tarjetas, select del formulario)
  summary: string // una línea para /servicios y la home
  eyebrow: string
  h1: string
  lead: string
  cta: { label: string; href: string }
  /** Enlace secundario de la cabecera, a /proyectos?servicio=<filter>. */
  cta2: string
  /** Cabecera de "Proyectos relacionados" (enlace "Ver todos →" a /proyectos?servicio=<filter>). */
  casesLabel: string
  /** Bloque opcional para explicar un concepto (GEO). */
  explainer?: { label: string; title: string; text: string }
  forWho: { label: string; items: string[] }
  packages: { label: string; title: string; note?: string; items: Package[] }
  faqs: Faq[]
  seo: { title: string; description: string }
}

const cta = (slug: ServiceSlug) => ({ label: 'Pide presupuesto →', href: `/contacto?servicio=${slug}` })

// ───────────────────────────────── Proceso común (en /servicios y en cada página)
export const process = {
  label: 'Cómo trabajo',
  title: 'Sabes qué vas a recibir, cuándo y por cuánto antes de empezar.',
  steps: [
    { n: '01', title: 'Llamada', text: 'Media hora para entender qué necesitas y decirte si soy la persona adecuada.' },
    { n: '02', title: 'Propuesta', text: 'Te mando por escrito qué incluye, cuánto cuesta y cuándo estará listo. El precio no cambia salvo que cambie lo que pides.' },
    { n: '03', title: 'Trabajo por fases', text: 'Ves el trabajo al final de cada fase y lo corregimos antes de pasar a la siguiente.' },
    { n: '04', title: 'Entrega', text: 'Te lo entrego, te enseño a usarlo y todo queda a tu nombre: archivos, accesos y, si hay web, el dominio.' },
  ],
}

// ───────────────────────────────── Diseño web
const disenoWeb: ServicePage = {
  slug: 'diseno-web',
  filter: 'web',
  cases: ['catalonia', 'push', 'laskurain', 'rank-me-higher'],
  title: 'Diseño web',
  summary: 'Webs en WordPress, Shopify o a medida, preparadas para Google desde el primer día.',
  eyebrow: 'Diseño web · Málaga y en remoto',
  h1: 'Una web que explica lo que haces y te trae clientes.',
  // Alternativas de h1:
  // B: 'Tu web, diseñada y programada por la misma persona.' (pone delante el perfil híbrido)
  // C: '¿Tu web no te trae clientes? Empecemos por ahí.' (abre con el problema)
  lead: 'Diseño y programo tu web yo mismo: en WordPress si quieres editarla tú, en Shopify si vas a vender online o a medida si necesitas que vaya muy rápido o haga algo que una plantilla no hace.',
  cta: cta('diseno-web'),
  cta2: 'Ver proyectos de web →',
  casesLabel: 'Proyectos de diseño web',
  forWho: {
    label: 'Es para ti si…',
    items: [
      'Tu web tiene años y te da apuro mandarla.',
      'Vas a abrir un negocio y quieres estar en internet antes de la inauguración.',
      'Tienes visitas, pero nadie te escribe ni te llama.',
      'Necesitas a alguien cada vez que quieres cambiar una foto o un precio.',
    ],
  },
  packages: {
    label: 'Qué puedo hacer por ti',
    title: 'Cuatro formas de hacer tu web, según quién la vaya a mantener y qué tenga que hacer.',
    note: '¿No sabes cuál te conviene? Lo vemos en la llamada.',
    items: [
      {
        title: 'Landing',
        text: 'Una sola página para vender un servicio, lanzar un producto o recoger contactos de una campaña.',
        includes: ['Diseño a partir de tu marca', 'Textos revisados para que se entiendan', 'Formulario o WhatsApp conectado', 'SEO básico y analítica'],
      },
      {
        title: 'Web en WordPress',
        text: 'Para negocios que quieren cambiar textos, fotos y entradas del blog sin depender de nadie.',
        includes: ['Diseño propio, sin plantilla comprada', 'Editor visual (Elementor Pro) para cambiarla tú', 'En dos idiomas si lo necesitas', 'Una sesión para enseñarte a editarla', 'SEO técnico y local'],
        featured: true,
      },
      {
        title: 'Tienda en Shopify',
        text: 'Para vender online con una tienda que lleves tú: productos, pedidos y pagos desde el panel de Shopify.',
        includes: ['Tema adaptado a tu marca, sin apps de más', 'Fichas de producto y colecciones', 'Pagos y envíos configurados', 'Una sesión para enseñarte a gestionarla'],
      },
      {
        title: 'Web a medida',
        text: 'Para startups, productos y webs que tienen que cargar al instante, crecer o hacer cosas que WordPress no hace bien.',
        includes: ['Diseño en Figma con sistema de componentes', 'Desarrollo en Next.js, publicada en Vercel', 'Velocidad y accesibilidad medidas con Lighthouse', 'Preparada para Google y para los buscadores con IA'],
      },
    ],
  },
  faqs: [
    { q: '¿Cuánto cuesta una web?', a: 'Depende de cuántas páginas tenga, de si ya tienes textos y fotos y de la vía que elijas. Después de la llamada te mando un presupuesto cerrado.' },
    { q: '¿Cuánto se tarda?', a: 'Depende del tipo de web, y el calendario va en la propuesta. Lo que más alarga un proyecto es esperar textos y fotos, así que si los tienes listos va mucho más rápido.' },
    { q: '¿Podré cambiar cosas yo?', a: 'En WordPress, sí: te la dejo preparada y te enseño a editar textos, fotos y entradas. En una web a medida dejamos editable lo que vayas a cambiar a menudo y el resto lo hago yo.' },
    { q: '¿Quién escribe los textos?', a: 'Si los tienes, los reviso para que se entiendan y posicionen. Si no, los escribimos juntos a partir de una conversación sobre tu negocio.' },
    { q: '¿Y el dominio y el hosting?', a: 'Van a tu nombre desde el principio. Te ayudo a contratarlos o me encargo yo, pero la web es tuya.' },
    { q: '¿Qué pasa cuando ya está publicada?', a: 'Puedes llevarla tú o dejarme el mantenimiento: actualizaciones, copias de seguridad y cambios pequeños cada mes.' },
    { q: '¿Haces tiendas online?', a: 'Sí, en Shopify, porque te deja vender y gestionar pedidos sin depender de mí. Si ya tienes tienda, puedo rediseñarla sin perder productos ni posicionamiento.' },
    { q: '¿Trabajas solo en Málaga?', a: 'Trabajo en remoto con clientes de cualquier sitio. Si estás en Málaga, la primera reunión puede ser en persona.' },
  ],
  seo: {
    title: 'Diseño web en Málaga · Rodrigo Sánchez',
    description: 'Diseño y desarrollo de webs en WordPress, tiendas en Shopify y webs a medida en Next.js, preparadas para Google. Desde Málaga, en remoto o en persona.',
  },
}

// ───────────────────────────────── SEO y GEO
const seo: ServicePage = {
  slug: 'seo',
  filter: 'seo',
  cases: ['rank-me-higher', 'push'],
  title: 'SEO y GEO',
  summary: 'Posicionamiento en Google, en Google Maps y en las respuestas de ChatGPT o Perplexity.',
  eyebrow: 'SEO y GEO · Málaga y en remoto',
  h1: 'Que te encuentren en Google y en las respuestas de ChatGPT.',
  // Alternativa: 'Sal cuando alguien busca lo que vendes.'
  lead: 'Reviso tu web, arreglo lo que frena el posicionamiento y preparo el contenido para que Google lo enseñe y los buscadores con IA lo citen. Cada cambio te lo explico.',
  cta: cta('seo'),
  cta2: 'Ver proyectos de SEO →',
  casesLabel: 'Proyectos de SEO',
  explainer: {
    label: 'Qué es el GEO',
    title: 'Cada vez más gente le pregunta a una IA en vez de buscar en Google.',
    text: 'GEO es preparar tu web para que ChatGPT, Perplexity o Gemini te mencionen cuando alguien pregunta por lo que haces. Se apoya en lo mismo que el SEO: una web rápida y ordenada que responde claro a las preguntas de tus clientes.',
  },
  forWho: {
    label: 'Es para ti si…',
    items: [
      'Tu web existe, pero no sale cuando buscas lo que vendes.',
      'Pagas anuncios para tener visitas y quieres depender menos de ellos.',
      'Tu competencia aparece en Google Maps y tú no.',
      'Le preguntas a ChatGPT por tu sector y nombra a otros.',
    ],
  },
  packages: {
    label: 'Qué puedo hacer por ti',
    title: 'Lo que necesitas depende de cómo esté tu web hoy.',
    note: 'Si no sabes por dónde empezar, empieza por la auditoría: te dice qué falla y en qué orden arreglarlo.',
    items: [
      {
        title: 'Auditoría SEO y GEO',
        text: 'Un informe con todo lo que frena tu posicionamiento, ordenado por lo que más se nota.',
        includes: ['Revisión técnica: velocidad, indexación y estructura', 'Palabras clave por las que puedes competir', 'Cómo te ven Google y los buscadores con IA', 'Plan de acción: lo aplicas tú o lo hago yo'],
      },
      {
        title: 'SEO local',
        text: 'Para negocios con local o que trabajan en una zona: Google Maps, reseñas y búsquedas «cerca de mí».',
        includes: ['Perfil de Google Business revisado y completo', 'Una página por servicio y por zona', 'Datos estructurados del negocio', 'Un plan para conseguir más reseñas'],
        featured: true,
      },
      {
        title: 'SEO continuo',
        text: 'Trabajo mensual con contenido nuevo, mejoras técnicas y un informe que se entiende sin ser experto.',
        includes: ['Artículos y páginas pensados para posicionar', 'Seguimiento en Google Search Console', 'Ajustes para buscadores con IA', 'Informe mensual en lenguaje llano'],
        time: 'Mes a mes',
      },
    ],
  },
  faqs: [
    { q: '¿Cuándo se ven resultados?', a: 'Los arreglos técnicos se notan en semanas. Subir puestos en búsquedas con competencia suele llevar de tres a seis meses.' },
    { q: '¿Me garantizas salir el primero?', a: 'No, porque la posición la decide Google y quien te la garantice no está siendo honesto. Lo que sí tendrás cada mes es qué se ha hecho y qué ha cambiado.' },
    { q: '¿Necesito una web nueva?', a: 'Casi nunca de entrada. Primero reviso la que tienes y, si la base no aguanta, te lo explico con datos.' },
    { q: '¿Hay que hacer algo distinto para salir en ChatGPT?', a: 'Buena parte es lo mismo que el SEO. Lo que cambia es la forma del contenido: respuestas directas, datos estructurados y que tu negocio aparezca mencionado en otras webs de confianza.' },
    { q: '¿Hay permanencia?', a: 'No. El SEO continuo va mes a mes, aunque recomiendo al menos tres meses para ver la tendencia.' },
  ],
  seo: {
    title: 'SEO y GEO en Málaga · Rodrigo Sánchez',
    description: 'Posicionamiento en Google, Google Maps y buscadores con IA como ChatGPT y Perplexity. Auditoría, SEO local y trabajo mensual desde Málaga.',
  },
}

// ───────────────────────────────── Branding
const branding: ServicePage = {
  slug: 'branding',
  filter: 'branding',
  cases: ['salma', 'malaga-tech'],
  title: 'Branding',
  summary: 'Logotipo, isotipo e identidad lista para usar en la web, en redes y en el local.',
  eyebrow: 'Branding · Málaga y en remoto',
  h1: 'Una marca que se recuerda y funciona en todas partes.',
  lead: 'Diseño el logotipo, el isotipo, los colores y la tipografía, y te los entrego listos para la web, las redes, el rótulo y la factura. Con un manual corto que entiende cualquiera.',
  cta: cta('branding'),
  cta2: 'Ver proyectos de branding →',
  casesLabel: 'Proyectos de branding',
  forWho: {
    label: 'Es para ti si…',
    items: [
      'Vas a abrir y todavía no tienes logo.',
      'Tu logo lo hizo alguien hace años y ya no te representa.',
      'Cada cosa que publicas parece de una marca distinta.',
      'Vas a hacer la web y quieres que la marca esté antes.',
    ],
  },
  packages: {
    label: 'Qué puedo hacer por ti',
    title: 'Solo el logo o la marca entera.',
    items: [
      {
        title: 'Logotipo e isotipo',
        text: 'La base: el logo completo, la versión corta para perfiles y favicon, y sus colores.',
        includes: ['Dos o tres direcciones para elegir', 'Versiones en color, negro y blanco', 'Archivos para web e imprenta', 'Guía de uso de una página'],
      },
      {
        title: 'Identidad completa',
        text: 'El logo y todo lo que hace falta para usarlo bien: colores, tipografías y cómo combinarlos.',
        includes: ['Paleta con el contraste comprobado para que todo se lea', 'Tipografías y tamaños de texto', 'Tarjeta, firma de email y rótulo', 'Manual de marca'],
        featured: true,
      },
    ],
    note: '¿La marca va a vivir sobre todo en Instagram? Mira también redes sociales: el kit de plantillas sale de la identidad.',
  },
  faqs: [
    { q: '¿Cuántas propuestas veo?', a: 'Dos o tres direcciones al principio. Elegimos una y la afinamos con las rondas de cambios que fijemos en la propuesta.' },
    { q: '¿Me quedo con los archivos editables?', a: 'Sí, todo es tuyo: archivos vectoriales, el archivo de diseño y las fuentes con su licencia.' },
    { q: '¿Cuánto se tarda?', a: 'Depende del alcance. El calendario va en la propuesta, con una fecha para cada entrega.' },
    { q: '¿Y si todavía no tengo nombre?', a: 'Te ayudo a buscarlo y a comprobar que el dominio y los perfiles de redes están libres.' },
  ],
  seo: {
    title: 'Branding e identidad de marca en Málaga · Rodrigo Sánchez',
    description: 'Logotipo, isotipo, colores, tipografía y manual de marca listos para web, redes y local. Desde Málaga, en remoto o en persona.',
  },
}

// ───────────────────────────────── Redes sociales
const redes: ServicePage = {
  slug: 'redes-sociales',
  filter: 'redes-sociales',
  cases: ['salma'],
  title: 'Redes sociales',
  summary: 'Plantillas, calendario, diseño de publicaciones y edición de reels para Instagram.',
  eyebrow: 'Redes sociales · Málaga y en remoto',
  h1: 'Un Instagram que se reconoce y un calendario que se cumple.',
  lead: 'Preparo qué publicar y cuándo, y diseño las piezas con la imagen de tu marca: posts, carruseles, historias y reels. Tú lo apruebas antes de que salga nada.',
  cta: cta('redes-sociales'),
  cta2: 'Ver proyectos de redes →',
  casesLabel: 'Proyectos de redes sociales',
  forWho: {
    label: 'Es para ti si…',
    items: [
      'Publicas cuando te acuerdas y cada post parece de una marca distinta.',
      'Vas a abrir y quieres llegar con gente que ya te sigue.',
      'Grabas vídeos con el móvil, pero no tienes tiempo de editarlos.',
      'No sabes qué publicar para que te escriban.',
    ],
  },
  packages: {
    label: 'Qué puedo hacer por ti',
    title: 'Desde plantillas para que publiques tú hasta llevarlo yo cada mes.',
    items: [
      {
        title: 'Kit de marca para redes',
        text: 'Plantillas con tu marca para que publiques tú y todo se vea de la misma casa.',
        includes: ['Colores, tipografías y logo adaptados a Instagram', 'Plantillas de post, carrusel, historia y portada de reel', 'Foto de perfil y portadas de destacadas', 'Guía de uso'],
      },
      {
        title: 'Gestión mensual',
        text: 'Me encargo del contenido cada mes: qué publicar, cuándo y con qué diseño.',
        includes: ['Temas de contenido y calendario del mes', 'Diseño de posts, carruseles e historias', 'Texto de cada publicación', 'Repaso mensual de lo que ha funcionado'],
        time: 'Mes a mes',
        featured: true,
      },
      {
        title: 'Edición de reels',
        text: 'Tú grabas con el móvil y yo lo convierto en reels con subtítulos y tu marca.',
        includes: ['Montaje y ritmo', 'Subtítulos con tu tipografía', 'Portada del reel', 'Listo para publicar'],
      },
    ],
  },
  faqs: [
    { q: '¿Publicas tú o publico yo?', a: 'Como prefieras. Puedo dejarlo programado o entregarte cada pieza con su texto y su hora para que la publiques tú.' },
    { q: '¿Qué redes llevas?', a: 'Sobre todo Instagram, y también Facebook y LinkedIn si tu público está allí.' },
    { q: '¿Tengo que grabar yo los vídeos?', a: 'Sí, porque nadie conoce tu día a día como tú. Te digo qué planos grabar y cómo, y del resto me encargo yo.' },
    { q: '¿Hay permanencia?', a: 'No. La gestión va mes a mes, aunque recomiendo al menos tres meses para que el calendario dé resultados.' },
  ],
  seo: {
    title: 'Gestión de redes sociales en Málaga · Rodrigo Sánchez',
    description: 'Plantillas de marca, calendario, diseño de publicaciones y edición de reels para Instagram. Desde Málaga, en remoto o en persona.',
  },
}

/** Textos comunes de la plantilla de servicio. */
export const serviceLabels = {
  forWhoTitle: 'Es para ti si…', // h2 a la izquierda, puntos a la derecha
  featured: 'Recomendado', // etiqueta del paquete destacado
  casesLink: 'Ver todos →',
  faqTitle: 'Preguntas frecuentes',
}

export const servicePages: ServicePage[] = [disenoWeb, seo, branding, redes]
export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug)

// ───────────────────────────────── /servicios (índice)
export const servicesIndex = {
  seo: {
    title: 'Servicios · Rodrigo Sánchez',
    description: 'Diseño web, SEO y GEO, branding y redes sociales para negocios y marcas. Desde Málaga, en remoto o en persona.',
  },
  title: 'Servicios',
  lead: 'Webs, posicionamiento, marca y redes para negocios que quieren conseguir clientes por internet. Lo hago yo de principio a fin: hablas siempre con la persona que hace el trabajo.',
  // Cada servicio sale de servicePages (title + summary + enlace "Ver servicio →").
  linkLabel: 'Ver servicio →',
  cta: { label: 'Pide presupuesto →', href: '/contacto' },
  agencyNote: { text: '¿Eres una agencia? También trabajo en marca blanca, con tu equipo y tus herramientas.', link: { label: 'Cómo colaboro con agencias →', href: '/agencias' } },
}

/** "Qué hago" de la home: a dónde enlaza cada fila. */
export const homeServiceLinks: Record<string, string> = {
  producto: '/proyectos?servicio=producto',
  web: '/servicios/diseno-web',
  'sistemas-de-diseno': '/proyectos?servicio=sistemas-de-diseno',
  seo: '/servicios/seo',
  branding: '/servicios/branding',
  'redes-sociales': '/servicios/redes-sociales',
}
/** Fila nueva para site.home.services */
export const homeRedesRow = { slug: 'redes-sociales', title: 'Redes sociales', text: 'Plantillas, calendario y reels para Instagram con la imagen de tu marca.' }

// ───────────────────────────────── /agencias
export const agencies = {
  seo: {
    title: 'Diseño y desarrollo para agencias · Rodrigo Sánchez',
    description: 'Diseñador de producto que también programa. Colaboro con agencias en marca blanca: UX/UI, sistemas de diseño, Next.js, WordPress y SEO.',
  },
  eyebrow: 'Para agencias',
  h1: 'Un diseñador que también programa, para cuando a tu agencia le falta una mano.',
  lead: 'Diseño en Figma y lo llevo a código en Next.js o WordPress. Me integro en tu equipo y en tus herramientas, trabajo con tu marca y, si lo prefieres, tu cliente no sabrá que existo.',
  ctas: [
    { label: 'Cuéntame el proyecto ↓', href: '#formulario' },
    { label: 'Ver proyectos →', href: '/proyectos' },
  ],
  covers: {
    label: 'Qué cubro',
    items: [
      { title: 'UX/UI y producto', text: 'Apps, webs y kioscos, de la investigación a la pantalla final.' },
      { title: 'Sistemas de diseño', text: 'Tokens y componentes en Figma que pasan a código con el mismo nombre.' },
      { title: 'Desarrollo', text: 'Next.js y Tailwind, o WordPress con Elementor Pro.' },
      { title: 'SEO y GEO técnico', text: 'Estructura, velocidad y datos estructurados para posicionar.' },
    ],
    extra: 'También identidad y piezas para redes cuando el proyecto lo pide.',
  },
  rules: {
    label: 'Cómo colaboro',
    items: [
      'Trabajo con el nombre de tu agencia o con el mío, como prefieras.',
      'Antes de empezar cerramos alcance, fecha de entrega y quién valida.',
      'Firmo NDA desde el primer día.',
      'Uso tus herramientas: tu Figma, tu Slack, tu repositorio y tu gestor de tareas.',
      'Hablo con tu cliente solo si me lo pides.',
      'Tus clientes son tuyos: no les ofrezco mis servicios por mi cuenta.', // Sin plazo en la web (17 oct): el plazo de no captación va en el contrato de cada agencia.
    ],
  },
  formats: {
    label: 'Formatos',
    items: [
      { title: 'Proyecto cerrado', text: 'Alcance, plazo y precio fijos desde el principio.' },
      { title: 'Por días', text: 'Para picos de trabajo o una fase concreta de un proyecto.' },
      { title: 'Bolsa mensual', text: 'Horas reservadas cada mes para tu agencia, con prioridad.' },
    ],
  },
  proof: {
    label: 'Ya he trabajado así',
    text: 'En Garaje de Ideas diseñé para Catalonia Hotels, Burger King, Popeyes y RBI, y desde 2022 trabajo con Rank Me Higher, una agencia de SEO de Londres.',
    cases: ['catalonia', 'burger-king', 'rbi', 'rank-me-higher'],
  },
  /** Si tiene texto, se pinta junto a los CTA ("Disponible desde …"). null = no se muestra. */
  availability: null as string | null,
  form: {
    id: 'formulario',
    label: 'Contacto',
    title: 'Cuéntame el proyecto',
    lead: 'Te respondo en un día laborable con disponibilidad y tarifa.',
    fields: [
      { name: 'agencia', label: 'Agencia', type: 'text', required: true, placeholder: 'Nombre de la agencia' },
      { name: 'nombre', label: 'Tu nombre', type: 'text', required: true, placeholder: 'Nombre y apellido' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'tu@agencia.com' },
      { name: 'web', label: 'Web de la agencia (opcional)', type: 'url', required: false, placeholder: 'https://' },
      {
        name: 'trabajo', label: 'Qué necesitas', type: 'chips', multiple: true, required: true,
        options: ['UX/UI', 'Sistema de diseño', 'Desarrollo Next.js', 'Desarrollo WordPress', 'SEO y GEO', 'Branding', 'Redes sociales'],
      },
      { name: 'formato', label: 'Formato (opcional)', type: 'radio', required: false, options: ['Proyecto cerrado', 'Por días', 'Bolsa mensual', 'Aún no lo sé'] },
      { name: 'cuando', label: 'Para cuándo (opcional)', type: 'select', required: false, placeholder: 'Elige una opción', options: ['Cuanto antes', 'Este mes', 'El mes que viene', 'Sin fecha todavía'] },
      { name: 'mensaje', label: 'Proyecto', type: 'textarea', required: true, placeholder: 'Cliente o sector, qué hay que hacer y en qué punto está.' },
    ],
    privacy: 'Acepto la política de privacidad. Mis datos solo se usan para responderme.', // «política de privacidad» enlaza a /privacidad
    submit: 'Pedir disponibilidad y tarifa',
    success: {
      label: 'Enviado',
      title: 'Recibido. Te escribo en un día laborable con disponibilidad y tarifa.',
      text: 'Si es urgente, escríbeme a rodrigo@oi0.es.',
      link: { label: 'Ver proyectos →', href: '/proyectos' },
    },
    error: 'No se ha podido enviar. Escríbeme a rodrigo@oi0.es y lo vemos.',
    alt: '¿Prefieres el email? rodrigo@oi0.es',
  },
}

// ───────────────────────────────── Formulario de /contacto (clientes directos)
// ?servicio=<slug> preselecciona el servicio y pone "Sobre: <servicio>" encima, como ?proyecto=.
export const contactForm = {
  id: 'formulario',
  title: 'Pide presupuesto',
  lead: 'Cuéntame qué necesitas y te respondo en un día laborable.',
  fields: [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono (opcional)', type: 'tel', required: false },
    {
      name: 'servicio', label: 'Qué necesitas', type: 'select', required: true, placeholder: 'Elige una opción', // sin valor por defecto salvo ?servicio=
      options: [
        { value: 'diseno-web', label: 'Diseño web' },
        { value: 'seo', label: 'SEO y GEO' },
        { value: 'branding', label: 'Branding' },
        { value: 'redes-sociales', label: 'Redes sociales' },
        { value: 'otro', label: 'Otra cosa' },
      ],
    },
    { name: 'web', label: 'Tu web actual (opcional)', type: 'url', required: false, placeholder: 'https://' },
    { name: 'cuando', label: 'Para cuándo (opcional)', type: 'select', required: false, placeholder: 'Elige una opción', options: ['Cuanto antes', 'Este mes', 'En dos o tres meses', 'Sin fecha todavía'] },
    { name: 'mensaje', label: 'Tu proyecto', type: 'textarea', required: true, placeholder: 'A qué te dedicas, qué necesitas y qué no te convence de lo que tienes ahora.' },
  ],
  privacy: 'Acepto la política de privacidad. Mis datos solo se usan para responderme.', // «política de privacidad» enlaza a /privacidad
  submit: 'Pedir presupuesto',
  success: {
    label: 'Enviado',
    title: 'Recibido. Te escribo en un día laborable.',
    text: 'Si es urgente, escríbeme a rodrigo@oi0.es. Mientras tanto, puedes ver lo que he hecho para otros.',
    link: { label: 'Ver proyectos →', href: '/proyectos' },
  },
  error: 'No se ha podido enviar. Escríbeme a rodrigo@oi0.es y lo vemos.',
}

// ───────────────────────────────── Mensajes de error de los formularios (cliente y servidor)
export const formErrors = {
  nombre: 'Escribe tu nombre.',
  agencia: 'Escribe el nombre de la agencia.',
  email: 'Escribe un email válido, por ejemplo nombre@dominio.com.',
  mensaje: 'Cuéntame algo del proyecto, aunque sea una frase.',
  trabajo: 'Elige al menos una opción.',
  privacidad: 'Marca la casilla para que pueda responderte.',
  sending: 'Enviando…',
}

// ───────────────────────────────── /privacidad (Rodrigo revisa el texto; no es asesoría legal)
export const privacyPage = {
  seo: { title: 'Política de privacidad', description: 'Qué datos recojo en oi0.es, para qué y cómo pedir que los borre.' },
  updated: 'Actualizada en octubre de 2026',
  title: 'Política de privacidad',
  lead: 'Qué datos recojo cuando me escribes, para qué los uso y cómo puedes pedir que los borre.',
  sections: [
    { title: 'Quién trata tus datos', text: 'Rodrigo Sánchez Romero. Puedes escribirme a rodrigo@oi0.es y tienes mis datos completos en el aviso legal.' }, // «aviso legal» enlaza a /aviso-legal
    { title: 'Para qué los uso', text: 'Para responder a tu mensaje y, si me lo pides, preparar un presupuesto. Nada más: no hay boletín ni listas de correo.' },
    { title: 'Por qué puedo usarlos', text: 'Porque me das tu consentimiento al marcar la casilla del formulario.' },
    { title: 'Cuánto tiempo los guardo', text: 'El necesario para responderte. Si trabajamos juntos, lo que exija la ley para facturas y contratos.' },
    { title: 'Con quién los comparto', text: 'Con nadie, salvo los servicios que hacen funcionar la web: Resend, que envía el formulario a mi correo, y Vercel, que aloja la web. Las dos están en Estados Unidos y adheridas al Marco de Privacidad de Datos UE-EE. UU.' },
    { title: 'Tus derechos', text: 'Puedes pedirme ver, corregir o borrar tus datos, oponerte a que los use o llevártelos, escribiendo a rodrigo@oi0.es. Si crees que no lo hago bien, puedes reclamar ante la Agencia Española de Protección de Datos.' },
    { title: 'Analítica', text: 'La web usa Vercel Analytics, que mide visitas sin cookies y sin identificarte.' },
  ],
}

// ───────────────────────────────── /aviso-legal (LSSI, art. 10; Rodrigo revisa el texto; no es asesoría legal)
export const legalPage = {
  seo: { title: 'Aviso legal', description: 'Quién está detrás de oi0.es y las condiciones para usar la web.' },
  updated: 'Actualizado en octubre de 2026',
  title: 'Aviso legal',
  lead: 'Quién está detrás de oi0.es y las condiciones para usar la web.',
  sections: [
    { title: 'Quién soy', text: 'Rodrigo Sánchez Romero, diseñador y desarrollador web autónomo. NIF: 77173072E. Domicilio: Av. de Sor Teresa Prat, 15, 29003 Málaga. Email: rodrigo@oi0.es.' }, // Domicilio: dirección del coworking (decisión de Rodrigo, 20 oct)
    { title: 'Qué es esta web', text: 'El portfolio de mi trabajo y la forma de contactarme para encargos de diseño web, SEO, branding y redes sociales. Aquí no se vende nada: cada encargo se acuerda por escrito.' },
    { title: 'Uso de la web', text: 'Puedes navegar y compartir cualquier página. Lo que no se permite es usar la web o sus formularios para enviar spam, intentar entrar en partes privadas o hacer algo que la dañe.' },
    { title: 'Propiedad de los contenidos', text: 'Los textos, el diseño y el código de esta web son míos. Los proyectos que enseño se hicieron para clientes y agencias: sus marcas, logos e imágenes son de sus dueños y salen aquí solo para mostrar mi trabajo. Si quieres usar algo, pregúntame.' },
    { title: 'Enlaces a otras webs', text: 'Enlazo a webs de clientes y de otros servicios. No controlo lo que publican ni respondo de su contenido.' },
    { title: 'Ley aplicable', text: 'Esta web se rige por la ley española.' },
    { title: 'Datos y cookies', text: 'Cómo trato lo que me envías por el formulario está en la política de privacidad. La web no usa cookies de seguimiento.' }, // «política de privacidad» enlaza a /privacidad
  ],
}

/** Enlaces legales del pie, en la fila del copyright. */
export const legalLinks = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Privacidad', href: '/privacidad' },
]

// ───────────────────────────────── 404 (app/not-found.tsx)
export const notFoundPage = {
  label: 'Error 404',
  title: 'Esta página no existe.',
  lead: 'Puede que la dirección esté mal escrita o que la página haya cambiado de sitio.',
  cta: { label: 'Ver proyectos →', href: '/proyectos' },
  cta2: { label: 'Ir al inicio →', href: '/' },
  note: '¿Buscabas algo concreto? Escríbeme a rodrigo@oi0.es.', // debajo de los enlaces
}
