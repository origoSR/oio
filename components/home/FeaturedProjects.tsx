'use client'

import { ProjectCard } from './ProjectCard'

const featuredProjects = [
  {
    id: 1,
    projectId: 'push',
    title: 'Push',
    hoverImage: '/bluesky.png',
    description: 'Push es una plataforma XR diseñada para ayudar a las personas a trabajar sus fobias mediante experiencias inmersivas de exposición gradual.',
    year: '2024 - Actualidad',
    country: 'Málaga',
    type: 'Cofundador. Diseño y desarrollo de software',
    tools: ['Figma', 'v0', 'Cursor', 'Lovable', 'Unity', 'SEMRush'],
    behanceUrl: null,
  },
  {
    id: 2,
    projectId: 'catalonia',
    title: 'Catalonia Hotels',
    hoverImage: '/catalonia_ruido.png',
    description: 'Rediseño integral de la web de Catalonia Hotels para mejorar navegación, diseño, claridad y conversión.',
    year: '2023',
    country: 'Garaje de Ideas, Madrid',
    type: 'UX/UI Design, Design Systems',
    tools: ['Figma', 'SEMRush'],
    behanceUrl: null,
  },
  {
    id: 5,
    projectId: 'bk',
    title: 'Burger King / Popeyes',
    hoverImage: '/bk_ruido.png',
    description: 'Rediseño completo del proceso de compra de la app y de los kioskos para optimizar velocidad, consistencia visual y experiencia del usuario.',
    year: '2024',
    country: 'Garaje de Ideas, Madrid',
    type: 'UX/UI Design',
    tools: ['Figma', 'Photoshop', 'VS Code'],
    behanceUrl: null,
  },
  {
    id: 3,
    projectId: 'rank',
    title: 'Rank Me Higher',
    hoverImage: '/astronauta.png',
    description: 'Nueva identidad enfocada en el diseño y arquitectura web para una agencia de SEO orientada a claridad, estructura y resultados medibles.',
    year: '2022 - Actualidad',
    country: 'Londres',
    type: 'UX/UI Design, SEO, GEO',
    tools: ['Figma', 'Wordpress', 'Shopify', 'SEMRush'],
    behanceUrl: null,
  },
  {
    id: 4,
    projectId: 'talengo',
    title: 'Talengo',
    hoverImage: '/talengo_hero.png',
    description: 'Plataforma de RRHH impulsada por IA diseñada para mejorar la gestión del talento y la experiencia del usuario interno.',
    year: '2024',
    country: 'Madrid',
    type: 'Product design, Design Systems',
    tools: ['Figma', 'Lovable', 'Cursor', 'Power BI'],
    behanceUrl: null,
  },
  {
    id: 6,
    projectId: 'rbi',
    title: 'RBI',
    hoverImage: '/rbi_ruido.png',
    description: 'Rediseño funcional y visual de la app interna de empleados orientado a mejorar accesos, flujos y usabilidad general.',
    year: '2024',
    country: 'Garaje de Ideas, Madrid',
    type: 'UX/UI Design',
    tools: ['Figma', 'Photoshop'],
    behanceUrl: null,
  },
  {
    id: 7,
    projectId: 'santalucia',
    title: 'Santalucía Impulsa',
    hoverImage: '/card_santalucia.png',
    description: 'App accesible para personas mayores, diseñada para simplificar tareas diarias y mejorar la autonomía del usuario.',
    year: '2023',
    country: 'Madrid',
    type: 'UX/UI Design',
    tools: ['Figma'],
    behanceUrl: null,
  },
]

const PROJECT_ORDER = ['push', 'catalonia', 'bk', 'rank', 'talengo', 'rbi', 'santalucia']

export function FeaturedProjects() {
  const orderedProjects = PROJECT_ORDER.map((id) =>
    featuredProjects.find((p) => p.projectId === id)
  ).filter(Boolean)

  return (
    <section className="bg-transparent">
      <div className="w-full">
        <div className="w-full h-px bg-white/20" />
        {orderedProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard
              id={project.id}
              title={project.title}
              hoverImage={project.hoverImage}
              projectId={project.projectId}
              description={project.description}
              year={project.year}
              country={project.country}
              type={project.type}
              tools={project.tools}
              behanceUrl={project.behanceUrl}
            />
            <div className="w-full h-px bg-white/20" />
          </div>
        ))}
      </div>
    </section>
  )
}
