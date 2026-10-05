'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CaseNavbar } from '@/components/case/CaseNavbar'
import { Ficha } from '@/components/case/Ficha'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/types'

export function CaseHeader({ project }: { project: Project }) {
  // El boton de la barra empieza siempre cerrado. Un unico estado `open` para todo el
  // componente, tambien en proyectos de marca: funcionan igual que los casos completos.
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const [navHeight, setNavHeight] = useState(0)
  // Ficha mas alta que la pantalla, abierta con la barra fija: en vez de una capa fixed
  // (que recortaria sin dejar leerla), se coloca absolute en el sitio del documento donde
  // esta el usuario, para que pueda bajar y leerla entera con el scroll normal de la pagina.
  const [absoluteMode, setAbsoluteMode] = useState(false)
  const [absoluteTop, setAbsoluteTop] = useState(0)
  // Mientras dura el scroll automatico hasta la barra (abrir desde el hero), se ignora el
  // cierre a los 24px. startYRef es la referencia para ese cierre: al abrir con la barra ya
  // fija es el scrollY de ese momento; tras el scroll automatico, se actualiza al terminar.
  const autoScrollingRef = useRef(false)
  const startYRef = useRef(0)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const fixedNavRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bottomSentinelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const reducedMotion = useReducedMotion()
  const transitionClass = reducedMotion ? '' : 'transition-all duration-[250ms] ease-out'
  const navOut = !(stuck && navVisible)
  const barTopOffset = stuck && navVisible ? navHeight : 0

  // Barra pegada: la detecta un sentinel de 1px justo antes.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
        // Al cruzar el umbral en cualquier direccion, se vuelve al estado inicial: solo la barra.
        setNavVisible(false)
      },
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new ResizeObserver(([entry]) => setBarHeight(entry.contentRect.height))
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = fixedNavRef.current
    if (!nav) return
    const observer = new ResizeObserver(([entry]) => setNavHeight(entry.contentRect.height))
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  // Con la barra pegada: al bajar se esconde la navbar fija; al subir ~8px vuelve a aparecer.
  useEffect(() => {
    if (!stuck) return

    let lastY = window.scrollY
    let upAccum = 0

    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastY
      lastY = y

      if (diff > 0.5) {
        upAccum = 0
        setNavVisible(false)
      } else if (diff < -0.5) {
        upAccum += -diff
        if (upAccum >= 8) setNavVisible(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stuck])

  // Se cierra al hacer scroll mas de 24px (en cualquier direccion) desde que se abrio.
  // No aplica en modo absolute (se deja leer con el scroll normal) ni mientras dura el
  // scroll automatico hasta la barra al abrir desde el hero.
  useEffect(() => {
    if (!open || absoluteMode) return

    startYRef.current = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (autoScrollingRef.current) return
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (autoScrollingRef.current) return
        if (Math.abs(window.scrollY - startYRef.current) > 24) setOpen(false)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open, absoluteMode])

  // Modo absolute: se cierra cuando el borde inferior de la ficha sube por encima de la barra.
  useEffect(() => {
    if (!open || !absoluteMode) return
    const el = bottomSentinelRef.current
    if (!el) return

    let wasIntersecting = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wasIntersecting = true
        } else if (wasIntersecting) {
          setOpen(false)
        }
      },
      { rootMargin: `-${barTopOffset + barHeight}px 0px 0px 0px`, threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [open, absoluteMode, barTopOffset, barHeight])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus({ preventScroll: true })
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      if (buttonRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    panelRef.current?.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const metaLabel = [project.nda ? 'Confidencial · NDA' : null, project.sector, project.role, project.year]
    .filter(Boolean)
    .join(' · ')

  // Tras el scroll automatico hasta la barra (abrir desde el hero), con la barra ya fija:
  // misma comprobacion que al abrir con la barra fija, pero medida en fresco (no por estado,
  // que aqui podria venir de antes del scroll).
  const settleAfterAutoScroll = () => {
    if (!autoScrollingRef.current) return
    autoScrollingRef.current = false
    startYRef.current = window.scrollY

    const freshBarHeight = barRef.current?.getBoundingClientRect().height ?? 0
    const measuredHeight = contentRef.current?.getBoundingClientRect().height ?? 0
    const available = window.innerHeight - freshBarHeight
    if (measuredHeight > available) {
      setAbsoluteTop(window.scrollY + freshBarHeight)
      setAbsoluteMode(true)
    }
  }

  // Abrir desde el hero (barra aun no fija): desplaza la pagina hasta el punto exacto en el
  // que la barra queda pegada arriba (como en Bold), ignorando el cierre a los 24px mientras
  // dura. Al terminar (scrollend, con un respaldo de 700ms para Safari), se fija la nueva
  // referencia de scroll y se comprueba si la ficha es demasiado alta para la pantalla.
  const scrollToBar = () => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const targetY = window.scrollY + sentinel.getBoundingClientRect().top

    autoScrollingRef.current = true
    const onScrollEnd = () => {
      window.removeEventListener('scrollend', onScrollEnd)
      settleAfterAutoScroll()
    }
    window.addEventListener('scrollend', onScrollEnd)
    setTimeout(() => {
      window.removeEventListener('scrollend', onScrollEnd)
      settleAfterAutoScroll()
    }, 700)

    window.scrollTo({ top: targetY, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  const handleToggle = () => {
    if (open) {
      setOpen(false)
      return
    }

    if (stuck) {
      // Medido directo del ref (no por estado vía ResizeObserver): con la ficha colapsada
      // a 0 por el grid-template-rows, un ResizeObserver sobre ese contenido no siempre
      // notifica el cambio, pero su alto real sigue siendo correcto en el propio layout.
      const measuredHeight = contentRef.current?.getBoundingClientRect().height ?? 0
      const available = window.innerHeight - barHeight
      if (measuredHeight > available) {
        setAbsoluteTop(window.scrollY + barTopOffset + barHeight)
        setAbsoluteMode(true)
        setOpen(true)
        return
      }
      setAbsoluteMode(false)
      setOpen(true)
      return
    }

    // Barra aun no fija: se abre ya en capa fija y la pagina se desplaza sola hasta que
    // la barra queda pegada arriba del todo (sustituye al despliegue en el flujo).
    setAbsoluteMode(false)
    setOpen(true)
    scrollToBar()
  }

  return (
    <>
      <header className="bg-project text-on-project">
        <CaseNavbar />
        <div className="page-x pt-12 lg:pt-16 pb-12 lg:pb-16">
          <h1 className="max-w-page">
            <span className="block text-h1 text-on-project">{project.title}</span>
            <span className="block text-h1 text-on-project-secondary">{project.subtitle}</span>
          </h1>
        </div>
      </header>

      {/* Navbar fija: aparece al subir ~8px con la barra pegada, se esconde al bajar. */}
      <div
        ref={fixedNavRef}
        inert={navOut}
        className={cn(
          'fixed top-0 left-0 w-full z-40 bg-project text-on-project',
          navOut ? 'pointer-events-none' : undefined,
          transitionClass
        )}
        style={{ transform: navOut ? 'translateY(-100%)' : 'translateY(0)' }}
      >
        <CaseNavbar />
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div
        ref={barRef}
        data-stuck={stuck ? '' : undefined}
        className={cn(
          'sticky z-30 bg-project text-on-project border-t border-on-project/20 py-4 page-x grid-page',
          transitionClass
        )}
        style={{ top: barTopOffset }}
      >
        <div className="col-span-2 lg:col-span-6">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={handleToggle}
            className="text-body font-semibold hover:opacity-70 transition-opacity"
          >
            {open ? '− Ficha del proyecto' : '+ Ficha del proyecto'}
          </button>
        </div>
        <div className="col-span-2 lg:col-span-6">
          <p className="label hidden md:block text-left">{metaLabel}</p>
          <p className="label md:hidden text-right">
            {stuck ? (project.nda ? `Confidencial · NDA · ${project.sector}` : project.sector) : metaLabel}
          </p>
        </div>
      </div>

      {/* Ficha: sin max-height ni scroll interno, mide lo que mida su contenido. Siempre en
          capa debajo de la barra (nunca en el flujo): fixed normalmente, absolute si no cabe
          en pantalla. Si la barra aun no esta fija, abrir dispara el scroll hasta que lo este
          (scrollToBar) y top ya sigue ese cambio en vivo via barTopOffset/barHeight.
          Animacion con grid-template-rows 0fr -> 1fr. */}
      <div
        id={panelId}
        ref={panelRef}
        tabIndex={-1}
        inert={!open}
        className={cn(
          'z-20 bg-project text-on-project shadow-media',
          absoluteMode ? 'absolute left-0 right-0' : 'fixed left-0 right-0'
        )}
        style={{ top: absoluteMode ? absoluteTop : barTopOffset + barHeight }}
      >
        <div
          className="grid"
          style={{
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: reducedMotion ? undefined : 'grid-template-rows 300ms ease',
          }}
        >
          <div className="overflow-hidden" style={{ overflowAnchor: 'none' }}>
            <div ref={contentRef} className="page-x pt-6 pb-8">
              <Ficha ficha={project.ficha} nda={project.nda} />
              <div ref={bottomSentinelRef} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
