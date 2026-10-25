import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from '@playwright/test'
import App from '../src/App'
import type { Profile } from '../src/data/profile'

test('campos opcionais podem ser omitidos sem remover os destinos de navegação', async ({ page }) => {
  await page.setContent(renderToStaticMarkup(createElement(App, { profile: {} })))
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('[A preencher]')
  for (const id of ['apresentacao', 'sobre', 'experiencia', 'formacao', 'competencias', 'cursos', 'contato']) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1)
  }
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="linkedin.com"]')).toHaveCount(0)
  expect(await page.locator('body').innerText()).not.toMatch(/undefined|null/)
})

test('dados preenchidos aparecem com contatos e certificado funcionais', async ({ page }) => {
  const fixture: Profile = {
    name: '[Nome de teste]',
    title: '[Título de teste]',
    about: ['[Apresentação de teste]'],
    experience: [{ role: '[Cargo de teste]', highlights: ['[Atividade de teste]'] }],
    education: [{ title: '[Formação de teste]' }],
    skills: [{ title: '[Grupo de teste]', items: ['[Competência de teste]'] }],
    courses: [{ title: '[Curso de teste]', credentialUrl: 'https://example.org/certificado' }],
    contact: { email: 'pessoa@example.org', phone: '+5511912345678', linkedin: 'https://www.linkedin.com/in/perfil-teste/' },
  }
  await page.setContent(renderToStaticMarkup(createElement(App, { profile: fixture })))
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(fixture.name!)
  await expect(page.getByRole('heading', { name: '[Cargo de teste]', exact: true })).toBeVisible()
  await expect(page.getByText('[Competência de teste]', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /E-mail:/ })).toHaveAttribute('href', 'mailto:pessoa@example.org')
  await expect(page.getByRole('link', { name: /Telefone:/ })).toHaveAttribute('href', 'tel:+5511912345678')
  await expect(page.getByRole('link', { name: /LinkedIn:/ })).toHaveAttribute('href', fixture.contact!.linkedin!)
  await expect(page.getByRole('link', { name: /Ver certificado/ })).toHaveAttribute('href', 'https://example.org/certificado')
})
