import { site } from '@/content/site'

export default function HomePage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-32">
        <p className="label text-fg-secondary">{site.home.eyebrow}</p>
        <h1 className="text-h1 max-w-media-l mt-4">{site.home.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text mt-6">{site.home.lead}</p>
      </section>
    </main>
  )
}
