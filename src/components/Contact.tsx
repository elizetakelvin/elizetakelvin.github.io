import { contactHref } from '../data/contact'
import type { ContactKind } from '../data/contact'
import type { Profile } from '../data/profile'

const channels: { kind: ContactKind; label: string; detail: string }[] = [
  { kind: 'email', label: 'E-mail', detail: 'Enviar uma mensagem' },
  { kind: 'phone', label: 'Telefone', detail: 'Entrar em contato' },
  { kind: 'linkedin', label: 'LinkedIn', detail: 'Ver perfil profissional' },
]

export function Contact({ contact }: { contact?: Profile['contact'] }) {
  return (
    <dl className="contact-grid grid gap-6 sm:grid-cols-3">
      {channels.map(({ kind, label, detail }) => {
        const value = contact?.[kind]?.trim()
        const href = contactHref(kind, value)
        return (
          <div key={kind} className="contact-channel">
            <dt>{label}</dt>
            <dd>
              {href ? (
                <a href={href} className="contact-link" aria-label={`${label}: ${value}`}>
                  <span>{kind === 'linkedin' ? 'Ver perfil' : value}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : <span className="contact-pending">[A preencher]</span>}
            </dd>
            {href && <p className="contact-detail">{detail}</p>}
          </div>
        )
      })}
    </dl>
  )
}

