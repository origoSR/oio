// Textos del sitio (Home, Proyectos, Contacto, menú y pie). Figma: página "Propuesta · Home / Proyectos / Contacto".

export const site = {
  name: 'Rodrigo Sánchez',
  brand: 'oio',
  email: 'rodrigo@oi0.es',
  phone: '+34 669 57 02 60',
  phoneHref: 'tel:+34669570260',
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
    projectsLabel: 'Proyectos seleccionados',
    projectsLink: { label: 'Todos los proyectos →', href: '/proyectos' },
    how: {
      label: 'Cómo trabajo',
      title: 'De Figma a producción, sin traducir nada a mano.',
      steps: [
        { n: '01 · Sistema', title: 'Todo empieza en tokens y componentes', text: 'Color, tipografía y espaciado viven como variables en Figma y con el mismo nombre en el código.' },
        { n: '02 · IA', title: 'Claude en medio del proceso', text: 'Con MCP, Claude lee el archivo de Figma y el repositorio. Me ayuda a montar pantallas, revisar y documentar.' },
        { n: '03 · Código', title: 'Lo diseñado es lo publicado', text: 'Next.js, Tailwind y Vercel. Entrego webs funcionando, no solo pantallas.' },
      ],
      capabilities: 'Producto · UX/UI · Sistemas de diseño · Web · SEO y GEO · XR',
    },
  },

  projectsPage: {
    seo: {
      title: 'Proyectos · Rodrigo Sánchez',
      description: 'Casos de producto, web y sistemas de diseño: Catalonia Hotels, Burger King y Popeyes, Push, RBI, Santalucía y Rank Me Higher.',
    },
    title: 'Proyectos.',
    lead: 'Seis casos de producto, web y sistemas de diseño, de 2022 a hoy.',
    othersLabel: 'Otros proyectos',
    others: [
      { title: 'Talengo', description: 'Plataforma de RRHH con IA. Producto y sistema de diseño.', meta: '2024 · NDA' },
      // TODO Rodrigo: añadir más proyectos pequeños o borrar esta línea.
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
