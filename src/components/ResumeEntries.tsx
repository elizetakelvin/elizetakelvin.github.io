import { httpsUrl } from '../data/contact'
import type { Course, Education, Experience, SkillGroup } from '../data/profile'
import { Pending } from './Section'

export function ExperienceEntries({ items }: { items?: Experience[] }) {
  if (!items?.length) return <Pending label="Cargos, empresas, períodos e principais atividades" />

  return (
    <div className="timeline">
      {items.map((item, index) => (
        <article className="timeline-entry" key={index}>
          <div className="entry-heading">
            <h3>{item.role}</h3>
            {item.period && <span className="entry-period">{item.period}</span>}
          </div>
          {item.company && <p className="entry-institution">{item.company}</p>}
          {item.description && <p className="entry-description">{item.description}</p>}
          {!!item.highlights?.length && (
            <ul className="highlights">
              {item.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  )
}

export function EducationEntries({ items }: { items?: Education[] }) {
  if (!items?.length) return <Pending label="Curso, instituição e período de formação" />

  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <article key={index}>
          <div className="entry-heading">
            <h3>{item.title}</h3>
            {item.period && <span className="entry-period">{item.period}</span>}
          </div>
          {item.institution && <p className="entry-institution">{item.institution}</p>}
          {item.description && <p className="entry-description">{item.description}</p>}
        </article>
      ))}
    </div>
  )
}

export function SkillEntries({ groups }: { groups?: SkillGroup[] }) {
  const visible = groups?.filter((group) => group.items.length)
  if (!visible?.length) return <Pending label="Competências técnicas e comportamentais" />

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {visible.map((group, index) => (
        <div key={index}>
          <h3>{group.title}</h3>
          <ul className="skill-list flex flex-wrap gap-2">
            {group.items.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function CourseEntries({ items }: { items?: Course[] }) {
  if (!items?.length) return <Pending label="Curso, instituição, data e certificação" />

  return (
    <div className="course-list">
      {items.map((item, index) => {
        const credential = httpsUrl(item.credentialUrl)
        return (
          <article className="course-entry" key={index}>
            <div>
              <h3>{item.title}</h3>
              {item.institution && <p className="entry-institution">{item.institution}</p>}
              {credential && (
                <a className="text-link" href={credential}>
                  Ver certificado de {item.title}<span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            {item.period && <span className="entry-period">{item.period}</span>}
          </article>
        )
      })}
    </div>
  )
}
