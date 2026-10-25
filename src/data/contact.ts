export type ContactKind = 'email' | 'phone' | 'linkedin'

export function httpsUrl(value?: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value.trim())
    if (url.protocol === 'https:' && !url.username && !url.password) return url.href
  } catch { /* Endereço incompleto: exibir como pendência. */ }
  return undefined
}

export function contactHref(kind: ContactKind, value?: string): string | undefined {
  const text = value?.trim()
  if (!text) return undefined
  if (kind === 'email') {
    if (/^[a-z0-9.!#$%&'*+/=^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(text)) {
      return `mailto:${text}`
    }
  }
  if (kind === 'phone' && /^\+[\d\s().-]+$/.test(text)) {
    const digits = text.replace(/[\s().-]/g, '')
    if (/^\+[1-9]\d{7,14}$/.test(digits)) return `tel:${digits}`
  }
  if (kind === 'linkedin') {
    const href = httpsUrl(text)
    if (href) {
      const url = new URL(href)
      if (['www.linkedin.com', 'linkedin.com'].includes(url.hostname) && /^\/in\/[^/]+\/?$/.test(url.pathname)) return href
    }
  }
  return undefined
}
