'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CaseNavbar } from '@/components/case/CaseNavbar'
import { Ficha } from '@/components/case/Ficha'
import { cn } from '@/lib/utils'
import type { Project } from '@/content/types'

export function CaseHeader({ project }: { project: Project }) {
  // Proyectos de marca: la ficha sale abierta por defecto (en linea, debajo de la barra).
  const [open, setOpen] = useState(project.kind === 'brand')
  const [stuck, setStuck] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const [navHeight, setNavHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const fixedNavRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const reducedMotion = useReducedMotion()
  const transitionClass = reducedMotion ? '' : 'transition-all duration-[250ms] ease-out'

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

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    const observer = new ResizeObserver(([entry]) => setContentHeight(entry.contentRect.height))
    observer.observe(content)
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

  const navOut = !(stuck && navVisible)
  const barTopOffset = stuck && navVisible ? navHeight : 0

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
            onClick={() => setOpen((v) => !v)}
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

      <div
        id={panelId}
        ref={panelRef}
        tabIndex={-1}
        inert={!open}
        className={cn(
          'z-20 bg-project text-on-project overflow-y-auto',
          stuck ? 'fixed left-0 right-0 shadow-media' : 'relative',
          reducedMotion ? undefined : 'transition-[max-height,opacity] duration-[250ms] ease-out'
        )}
        style={{
          top: stuck ? barTopOffset + barHeight : undefined,
          maxHeight: !open ? '0px' : stuck ? `min(${contentHeight}px, 70vh)` : `${contentHeight}px`,
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="page-x pt-6 pb-8">
          <Ficha ficha={project.ficha} nda={project.nda} />
        </div>
      </div>
    </>
  )
}
