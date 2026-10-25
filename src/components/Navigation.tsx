import { useEffect, useRef, useState } from 'react'

const sections = [
  ['apresentacao', 'Apresentação'],
  ['sobre', 'Sobre'],
  ['experiencia', 'Experiência'],
  ['formacao', 'Formação'],
  ['competencias', 'Competências'],
  ['cursos', 'Cursos e certificações'],
  ['contato', 'Contato'],
] as const

export function Navigation({ name }: { name?: string }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('apresentacao')
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-10% 0px -60% 0px' })
    for (const [id] of sections) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    // Resolve links diretos após as seções entrarem no DOM.
    const initialAnchor = requestAnimationFrame(() => {
      const destination = document.getElementById(window.location.hash.slice(1))
      destination?.scrollIntoView({ behavior: 'instant' })
      destination?.focus({ preventScroll: true })
    })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(initialAnchor)
    }
  }, [])

  function navigate(id: string) {
    setOpen(false)
    setActive(id)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  return (
    <header className="sidebar" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div className="sidebar-top">
        <a href="#apresentacao" className="identity" onClick={() => navigate('apresentacao')} aria-label="Ir à apresentação">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 25V7h12v8h8v10H6Zm0-10h12m0 0v10M11 11h2m9 8h1" /></svg>
          </span>
          <span className="identity-text"><span className="eyebrow">Perfil profissional</span><span className="identity-name">{name || '[A preencher]'}</span></span>
        </a>
        <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="section-navigation" onClick={() => setOpen(!open)}>
          <span>{open ? 'Fechar' : 'Menu'}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={open ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
        </button>
      </div>
      <nav id="section-navigation" aria-label="Seções do currículo" data-open={open}>
        <p className="nav-caption eyebrow">Explore o currículo</p>
        <ol className="nav-list">
          {sections.map(([id, label], index) => (
            <li key={id}><a href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => navigate(id)}><span className="nav-number" aria-hidden="true">0{index + 1}</span><span>{label}</span><span className="nav-indicator" aria-hidden="true">↗</span></a></li>
          ))}
        </ol>
      </nav>
      <div className="sidebar-bottom"><span className="sidebar-rule" /><p className="eyebrow">Trajetória em perspectiva</p><p>Experiência, conhecimento<br />e próximos passos.</p><span className="sidebar-edition">CURRÍCULO / PORTFÓLIO</span></div>
    </header>
  )
}
