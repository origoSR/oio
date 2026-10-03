'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { CaseNavbar } from '@/components/case/CaseNavbar'
import { Ficha } from '@/components/case/Ficha'
import type { Project } from '@/content/types'

export function CaseHeader({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 })
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
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      if (buttonRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const metaLabel = [project.nda ? 'Confidencial · NDA' : null, project.sector, project.role, project.year]
    .filter(Boolean)
    .join(' · ')

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

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div
        ref={barRef}
        data-stuck={stuck ? '' : undefined}
        className="sticky top-0 z-40 bg-project text-on-project border-t border-on-project/20 py-4 page-x grid-page"
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
            + Ficha del proyecto
          </button>
        </div>
        <div className="col-span-2 lg:col-span-6">
          <p className="label hidden md:block text-left">{metaLabel}</p>
          <p className="label md:hidden text-right">
            {stuck ? (project.nda ? `Confidencial · NDA · ${project.sector}` : project.sector) : metaLabel}
          </p>
        </div>
      </div>

      <div className={stuck ? 'relative' : undefined}>
        <div
          id={panelId}
          ref={panelRef}
          tabIndex={-1}
          hidden={!open}
          inert={!open}
          className={
            stuck
              ? 'absolute left-0 right-0 top-0 z-30 bg-project text-on-project page-x pt-6 pb-8 overflow-y-auto transition-[opacity] duration-300 ease-out'
              : 'bg-project text-on-project page-x pt-6 pb-8 transition-[opacity] duration-300 ease-out'
          }
          style={stuck ? { maxHeight: `calc(100dvh - ${barHeight}px)` } : undefined}
        >
          <Ficha ficha={project.ficha} nda={project.nda} />
        </div>
      </div>
    </>
  )
}
