import Link from 'next/link'
import type { site } from '@/content/site'

type ContactCardContent = (typeof site)['projectsPage']['contactCard']

/** Tarjeta que cierra la rejilla de /proyectos cuando el numero de proyectos visibles es impar. */
export function ContactGridCard({ contact }: { contact: ContactCardContent }) {
  return (
    <Link href={contact.href} className="group block">
      <div className="relative w-full h-[300px] lg:h-[540px] bg-inverse text-fg-on-inverse p-8 lg:p-12 flex flex-col justify-end">
        <h4 className="text-h4">{contact.title}</h4>
        <p className="text-body text-fg-on-inverse-secondary mt-2 max-w-text">{contact.text}</p>
      </div>
      <h4 className="text-h4 mt-4">{contact.label}</h4>
      <p className="text-body text-fg-secondary mt-1">{contact.meta}</p>
    </Link>
  )
}
