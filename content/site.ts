// Textos del sitio (Home, Proyectos, Contacto, menú y pie). Figma: páginas «Home», «Proyectos» y «Contacto».
// v2 · 17 oct 2026: sincronizado con Figma y con la revisión de copys aprobada (IDs H1–H8, P1–P2, K2 del doc «Revisión de copys · oi0.es»).

export const site = {
  name: 'Rodrigo Sánchez',
  brand: 'oio',
  email: 'rodrigo@oi0.es',
  linkedin: 'https://www.linkedin.com/in/rodrigosanchezromero',
  location: 'Málaga y en remoto',

  nav: [
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Contacto', href: '/contacto' },
  ],

  home: {
    seo: {
      // Sin tocar en esta revisión: el title aún dice «Diseñador de producto» y la etiqueta, «Diseño y desarrollo web».
      title: 'Rodrigo Sánchez · Diseñador de producto',
      description: 'Diseño productos digitales y webs, y los llevo hasta el código. Sistemas de diseño, UX/UI y SEO desde Málaga.',
    },
    eyebrow: 'Rodrigo Sánchez · Diseño y desarrollo web · Málaga',
    title: 'Diseño webs y productos digitales, y los programo yo.',
    lead: 'Webs, producto digital, marca, SEO y redes para negocios y startups. Lo diseño y lo programo yo, así que lo que apruebas es lo que se publica.',
    ctas: [
      { label: 'Escríbeme →', href: '/contacto' },
      { label: 'Ver proyectos →', href: '/proyectos' },
    ],
    projectsLabel: 'Proyectos destacados',
    projectsLink: { label: 'Ver los 9 proyectos →', href: '/proyectos' }, // el número se calcula con projects.length
    servicesLabel: 'Qué hago',
    // El enlace de cada fila sale de homeServiceLinks (content/services.ts):
    // las que tienen página de servicio usan «Ver servicio →»; producto y sistemas de diseño, «Ver proyectos →».
    services: [
      { slug: 'producto', title: 'Producto', text: 'Apps y herramientas, de la investigación a la pantalla final.' },
      { slug: 'web', title: 'Web', text: 'Webs y landings que se entienden y venden.' },
      { slug: 'sistemas-de-diseno', title: 'Sistemas de diseño', text: 'Tokens y componentes que comparten Figma y el código.' },
      { slug: 'seo', title: 'SEO y GEO', text: 'Que te encuentren en Google y en las respuestas de ChatGPT.' },
      { slug: 'branding', title: 'Branding', text: 'Logotipo, colores y tipografía, listos para la web, las redes y el local.' },
      { slug: 'redes-sociales', title: 'Redes sociales', text: 'Plantillas, calendario y reels para Instagram con la imagen de tu marca.' },
    ],
    servicesLinkLabel: 'Ver proyectos →',
    serviceLinkLabel: 'Ver servicio →',
    how: {
      label: 'Cómo trabajo',
      title: 'Diseño y código salen de la misma mano.',
      steps: [
        { n: '01 · Sistema', title: 'Primero, el sistema', text: 'Colores, tipografías y espacios se definen una vez, y el código usa los mismos nombres. Por eso la web se ve igual que el diseño que apruebas.' },
        { n: '02 · Código', title: 'El código lo escribo yo', text: 'Programo cada pantalla en Next.js o en WordPress, según el proyecto. Ningún otro equipo reinterpreta el diseño.' },
        { n: '03 · Publicación', title: 'Lo diseñado es lo publicado', text: 'Publico la web y te la entrego funcionando, rápida y preparada para salir en Google.' },
      ],
    },
  },

  projectsPage: {
    seo: {
      title: 'Proyectos · Rodrigo Sánchez',
      description: 'Proyectos de producto, web, sistemas de diseño y branding: Catalonia Hotels, Push, RBI, Burger King y Popeyes, Santalucía, Rank Me Higher, Salma, Málaga Tech y Laskurain.',
    },
    title: 'Proyectos',
    lead: 'Webs, apps, sistemas de diseño y marcas que he hecho con agencias o directamente para el cliente.',
    filters: [
      { slug: null, label: 'Todos' },
      { slug: 'producto', label: 'Producto' },
      { slug: 'web', label: 'Web' },
      { slug: 'sistemas-de-diseno', label: 'Sistemas de diseño' },
      { slug: 'ux-ui', label: 'UX/UI' },
      { slug: 'seo', label: 'SEO' },
      { slug: 'branding', label: 'Branding' },
      { slug: 'redes-sociales', label: 'Redes sociales' },
    ],
    othersLabel: 'Otros proyectos',
    others: [
      {
        title: 'Talengo',
        description: 'Plataforma de recursos humanos con IA. Producto y sistema de diseño.',
        meta: '2024 · NDA',
        cta: { label: 'Te lo enseño en una llamada →', href: '/contacto?proyecto=talengo' },
      },
    ],
  },

  contact: {
    seo: {
      title: 'Contacto · Rodrigo Sánchez',
      description: 'Cuéntame tu proyecto: webs, producto digital, sistemas de diseño y SEO. Desde Málaga, en remoto o en persona.',
    },
    title: 'Hablemos.',
    lead: 'Cuéntame tu proyecto y te respondo en un día laborable.',
    // El formulario es contactForm (content/services.ts).
    emailLabel: 'O escríbeme directamente',
    copyLabel: 'Copiar email',
    copiedLabel: 'Copiado',
    columns: [
      { label: 'Qué hago', lines: ['Diseño web', 'SEO y GEO', 'Branding', 'Redes sociales', 'Producto digital y UX/UI', 'Sistemas de diseño'] },
      {
        label: 'Cómo trabajo',
        lines: ['Desde Málaga, en remoto o en persona', 'Proyectos cerrados o colaboración continua', 'Con clientes directos y con agencias'],
        // «agencias» de la última línea enlaza a /agencias.
        links: { agencias: '/agencias' },
      },
      { label: 'Otros canales', lines: ['LinkedIn →'] },
    ],
  },

  footer: {
    label: 'Contacto',
    title: '¿Hablamos?',
    agencies: { label: 'Para agencias →', href: '/agencias' },
  },
} as const
