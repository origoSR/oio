import { site } from '@/content/site'

export default function ContactoPage() {
  return (
    <main className="bg-canvas">
      <section className="page-x pt-32 section-y">
        <h1 className="text-display">{site.contact.title}</h1>
        <p className="text-lead text-fg-secondary max-w-text mt-6">{site.contact.lead}</p>
      </section>
    </main>
  )
}
