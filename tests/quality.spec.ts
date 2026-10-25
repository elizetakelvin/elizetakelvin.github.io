import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`layout sem overflow e acessibilidade básica em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(report.violations).toEqual([])
    await page.screenshot({ path: testInfo.outputPath(`layout-${width}.png`), fullPage: true })
    if (width < 1024) {
      await page.getByRole('button', { name: 'Abrir menu' }).click()
      const menuReport = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      expect(menuReport.violations).toEqual([])
      await page.screenshot({ path: testInfo.outputPath(`menu-${width}.png`) })
    }
  })
}

test('movimento reduzido desativa rolagem suave e transições', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  await expect(page.locator('.button-primary')).toHaveCSS('transition-duration', '0s')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')
})

test('texto ampliado a 200% continua legível e sem overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 900 })
  await page.goto('/')
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Cursos e certificações' })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('texto-200.png'), fullPage: true })
})

test('build carrega recursos locais e não emite erros no console', async ({ page, request }) => {
  const errors: string[] = []
  const external: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('requestfailed', req => errors.push(req.url()))
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
  page.on('request', req => { if (new URL(req.url()).origin !== 'http://127.0.0.1:4173') external.push(req.url()) })
  const response = await page.goto('/')
  expect(response!.ok()).toBe(true)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const html = await response!.text()
  expect(html).toContain('lang="pt-BR"')
  expect(html).toContain('name="description"')
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
    const resource = await request.get(match[1])
    expect(resource.ok(), match[1]).toBe(true)
    expect(await resource.text()).not.toContain('<!doctype html>')
  }
  expect(external).toEqual([])
  expect(errors).toEqual([])
})
