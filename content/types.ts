// Tipos de contenido del portfolio. Espejo de los componentes Case/* y Site/* de Figma.

export type ProjectKey = 'catalonia' | 'bk' | 'push' | 'rbi' | 'santalucia' | 'rank'

export type Img = {
  src: string // ruta en /public
  w: number
  h: number
  alt: string
  /** 'contain' = la imagen se ve entera sobre fondo (FIT en Figma). Por defecto 'cover'. */
  fit?: 'cover' | 'contain'
}

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

export type Project = {
  slug: string // /proyectos/[slug]
  key: ProjectKey // data-project
  title: string
  subtitle: string
  sector: string
  role: string
  year: string
  nda: boolean
  /** Meta corta para la tarjeta de la home */
  cardMeta: string
  /** Meta larga para la fila de /proyectos */
  rowMeta: string
  ficha: FichaRow[]
  blocks: Block[]
  seo: { title: string; description: string }
}
