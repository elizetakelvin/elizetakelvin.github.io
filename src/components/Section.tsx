import type { ReactNode } from 'react'

export function Section({ id, number, title, subtitle, children }: {
  id: string
  number: string
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className="resume-section">
      <div className="section-heading"><span className="section-number" aria-hidden="true">{number}</span><div><h2 id={`${id}-title`}>{title}</h2><p>{subtitle}</p></div></div>
      <div className="section-body">{children}</div>
    </section>
  )
}

export function Pending({ label }: { label: string }) {
  return <div className="pending"><span className="pending-mark" aria-hidden="true">—</span><div><p className="pending-label">{label}</p><p className="pending-value">[A preencher]</p></div></div>
}
