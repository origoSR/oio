// Textos del sitio (Home, Proyectos, Contacto, menú y pie). Figma: página "Propuesta · Home / Proyectos / Contacto".

export const site = {
  name: 'Rodrigo Sánchez',
  brand: 'oio',
  email: 'rodrigo@oi0.es',
  linkedin: 'https://www.linkedin.com/in/rodrigosanchezromero',
  location: 'Málaga · En remoto',

  nav: [
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],

  home: {
    seo: {
      title: 'Rodrigo Sánchez · Diseñador de producto',
      description: 'Diseño productos digitales y webs, y los llevo hasta el código. Sistemas de diseño, UX/UI y SEO desde Málaga.',
    },
    eyebrow: 'Rodrigo Sánchez · Diseñador de producto · Málaga',
    title: 'Diseño productos digitales y webs, y los llevo hasta el código.',
    lead: 'Sistemas de diseño, UX/UI y SEO para marcas y startups. Trabajo con Figma, Claude y Next.js para que lo que diseño sea lo que se publica.',
    ctas: [
      { label: 'Ver proyectos →', href: '/proyectos' },
      { label: 'Escríbeme →', href: '/contacto' },
    ],
    projectsLabel: 'Proyectos destacados',
    projectsLink: { label: 'Ver los 9 proyectos →', href: '/proyectos' }, // el número se calcula con projects.length
    servicesLabel: 'Qué hago',
    services: [
      { slug: 'producto', title: 'Producto', text: 'Apps y herramientas, de la investigación a la pantalla final.' },
      { slug: 'web', title: 'Web', text: 'Webs y landings que se entienden y venden.' },
      { slug: 'sistemas-de-diseno', title: 'Sistemas de diseño', text: 'Tokens y componentes que comparten Figma y el código.' },
      { slug: 'seo', title: 'SEO', text: 'Estructura, contenido y rendimiento para que te encuentren, también en buscadores con IA.' },
      { slug: 'branding', title: 'Branding', text: 'Identidad, logotipo e isotipo para marcas.' },
    ],
    servicesLinkLabel: 'Ver proyectos →',
    how: {
      label: 'Cómo trabajo',
      title: 'De Figma a producción, sin traducir nada a mano.',
      steps: [
        { n: '01 · Sistema', title: 'Todo empieza en tokens y componentes', text: 'Color, tipografía y espaciado viven como variables en Figma y con el mismo nombre en el código.' },
        { n: '02 · IA', title: 'Claude en medio del proceso', text: 'Con MCP, Claude lee el archivo de Figma y el repositorio. Me ayuda a montar pantallas, revisar y documentar.' },
        { n: '03 · Código', title: 'Lo diseñado es lo publicado', text: 'Next.js, Tailwind y Vercel. Entrego webs funcionando, no solo pantallas.' },
      ],
    },
  },

  projectsPage: {
    seo: {
      title: 'Proyectos · Rodrigo Sánchez',
      description: 'Proyectos de producto, web, sistemas de diseño y branding: Catalonia Hotels, Push, RBI, Burger King y Popeyes, Santalucía, Rank Me Higher, Salma, Málaga Tech y Laskurain.',
    },
    title: 'Proyectos',
    filters: [
      { slug: null, label: 'Todos' },
      { slug: 'producto', label: 'Producto' },
      { slug: 'web', label: 'Web' },
      { slug: 'sistemas-de-diseno', label: 'Sistemas de diseño' },
      { slug: 'ux-ui', label: 'UX/UI' },
      { slug: 'seo', label: 'SEO' },
      { slug: 'branding', label: 'Branding' },
    ],
    othersLabel: 'Otros proyectos',
    others: [
      {
        title: 'Talengo',
        description: 'Plataforma de RRHH con IA. Producto y sistema de diseño.',
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
    emailLabel: 'Escríbeme',
    copyLabel: 'Copiar email',
    copiedLabel: 'Copiado',
    columns: [
      { label: 'Qué hago', lines: ['Webs y landings que venden', 'Producto digital y UX/UI', 'Sistemas de diseño', 'SEO y GEO'] },
      { label: 'Cómo trabajo', lines: ['Desde Málaga, en remoto o en persona', 'Proyectos cerrados o colaboración continua', 'Con agencias y con clientes directos'] },
    ],
  },

  footer: {
    label: 'Contacto',
    title: '¿Hablamos?',
  },
} as const
