import { expect, test } from '@playwright/test'
import { contactHref } from '../src/data/contact'

test('contatos reais produzem links utilizáveis', () => {
  expect(contactHref('email', ' pessoa@example.org ')).toBe('mailto:pessoa@example.org')
  expect(contactHref('phone', '+55 (11) 91234-5678')).toBe('tel:+5511912345678')
  expect(contactHref('linkedin', 'https://www.linkedin.com/in/perfil-teste/')).toBe('https://www.linkedin.com/in/perfil-teste/')
})

test('campos ausentes, placeholders e contatos inválidos não produzem links', () => {
  for (const kind of ['email', 'phone', 'linkedin'] as const) {
    for (const value of [undefined, '', ' ', '[A preencher]', 'javascript:alert(1)']) {
      expect(contactHref(kind, value)).toBeUndefined()
    }
  }
  for (const email of ['a@b', 'a@example.org?subject=spam', 'a@example.org\r\nBcc:b@example.org']) {
    expect(contactHref('email', email)).toBeUndefined()
  }
  for (const phone of ['123', '5511912345678', '+00000000000', '+55abc11912345678']) {
    expect(contactHref('phone', phone)).toBeUndefined()
  }
  for (const url of ['http://linkedin.com/in/teste', 'https://linkedin.com.evil.org/in/teste', 'https://www.linkedin.com/', 'https://user:pass@linkedin.com/in/teste']) {
    expect(contactHref('linkedin', url)).toBeUndefined()
  }
})

test('página identifica a falta de contatos sem criar links fictícios', async ({ page }) => {
  await page.goto('/#contato')
  const contact = page.getByRole('region', { name: 'Contato', exact: true })
  await expect(contact.getByRole('link')).toHaveCount(0)
  await expect(contact.getByText('[A preencher]', { exact: true })).toHaveCount(3)
})
