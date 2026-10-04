// Tipos de contenido del portfolio. Espejo de los componentes Case/* y Site/* de Figma.
// v2 (5 oct 2026): proyectos de marca (kind: 'brand'), tarjetas Site/WorkCard y filtros por servicio.

export type ProjectKey =
  | 'catalonia'
  | 'bk'
  | 'push'
  | 'rbi'
  | 'santalucia'
  | 'rank'
  | 'salma'
  | 'malaga-tech'
  | 'laskurain'

export type Img = {
  src: string // ruta en /public
  w: number
  h: number
  alt: string
  /** 'contain' = la imagen se ve entera sobre fondo (FIT en Figma). Por defecto 'cover'. */
  fit?: 'cover' | 'contain'
}

/** Filtros de /proyectos (?servicio=…). El orden es el de los chips. */
export type Service =
  | 'producto'
  | 'web'
  | 'sistemas-de-diseno'
  | 'ux-ui'
  | 'seo'
  | 'branding'
  | 'redes-sociales'

/** Variantes de Case/Media */
export type MediaLayout = 'bleed' | 'full' | 'pair' | 'browser' | 'phones' | 'video'

export type MediaItem = { layout: MediaLayout; images: Img[]; caption?: string }

export type Block =
  | { type: 'cover'; image: Img } // Case/Media · Sangrado, justo bajo la cabecera
  | { type: 'statement'; label?: string; text: string } // Case/Statement
  | { type: 'figures'; label?: string; items: Figure[] } // Case/Figures (2–4)
  | { type: 'gallery'; items: MediaItem[] } // Case/Media apilados, gap = gutter, sin padding vertical
  | {
      type: 'decision' // Case/Decision
      order: 'text-media' | 'media-text'
      number: string
      title: string
      text: string
      image: Img
      caption?: string
    }
  | { type: 'quote'; text: string; author: string } // Case/Quote (solo citas reales)
  | {
      type: 'outcome' // Case/Outcome
      variant: 'data' | 'learning'
      label: string
      title: string
      text: string
      items?: Figure[]
    }

export type Figure = { value: string; label: string; provisional?: boolean }

export type FichaRow = { label: string; content: string; href?: string }

/**
 * Tarjeta de /proyectos y de la home (Site/WorkCard).
 * El ancho NO va aquí: lo decide la posición en la rejilla (filas alternas 8+4 / 4+8).
 * Por eso cada proyecto da una imagen para tarjeta ancha y otra para estrecha.
 */
export type Card = {
  /** Servicios en texto, debajo del nombre. Ej.: "Web · SEO · Producto · XR" */
  services: string
  /** Frase que sustituye a los servicios en hover. */
  tagline: string
  /** Tarjeta ancha (8 col, 16:10). */
  wide?: Img
  /** Tarjeta estrecha (4 col, ~4:5). fit 'contain' = imagen entera sobre project-tint. */
  narrow?: Img
  /** Proyectos de marca: logo SVG centrado sobre project-accent (en lugar de wide/narrow). */
  logo?: Img
}

export type Project = {
  slug: string // /proyectos/[slug]
  key: ProjectKey // data-project
  /** 'case' = caso completo. 'brand' = página corta: cabecera con ficha abierta + pareja de imágenes + siguiente. */
  kind: 'case' | 'brand'
  title: string
  subtitle: string
  sector: string
  role: string
  year: string
  nda: boolean
  services: Service[]
  card: Card
  /** Meta corta (compatibilidad; la WorkCard usa card.services) */
  cardMeta: string
  /** Meta larga (JSON-LD y listados) */
  rowMeta: string
  ficha: FichaRow[]
  blocks: Block[]
  seo: { title: string; description: string }
}
