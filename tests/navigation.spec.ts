import { expect, test } from '@playwright/test'

test('menu móvel funciona pelo teclado e fecha ao navegar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Abrir menu' })
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
  const link = page.getByRole('navigation').getByRole('link', { name: 'Experiência', exact: true })
  await link.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#experiencia$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#experiencia')).toBeFocused()
  await expect(link).toBeHidden()
})

test('Escape fecha o menu e devolve o foco ao botão', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'Sobre', exact: true }).focus()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused()
  await expect(page.getByRole('navigation')).toBeHidden()
})

test('primeiro Tab mostra o atalho e permite pular a navegação', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await expect(skip).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
})

test('sair do menu com Tab fecha a lista sem encobrir o foco', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.getByRole('navigation').getByRole('link', { name: 'Contato', exact: true }).focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('navigation')).toBeHidden()
  await expect(page.getByRole('link', { name: 'Informações de contato' })).toBeFocused()
})

test('link direto abre a seção com o título visível', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#experiencia')
  await expect.poll(async () => {
    const box = await page.locator('#experiencia h2').boundingBox()
    return box && box.y >= 80 && box.y < 812
  }).toBe(true)
})

for (const width of [375, 1440]) {
  test(`âncoras nativas e voltar do navegador funcionam em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    for (const id of ['sobre', 'experiencia', 'formacao', 'competencias', 'cursos', 'contato']) {
      if (width < 1024) await page.getByRole('button', { name: 'Abrir menu' }).click()
      await page.getByRole('navigation').locator(`a[href="#${id}"]`).click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect(page.locator(`#${id}`)).toBeFocused()
      const heading = await page.locator(`#${id} h2`).boundingBox()
      expect(heading!.y).toBeGreaterThanOrEqual(width < 1024 ? 80 : 0)
      expect(heading!.y).toBeLessThan(900)
    }
    await page.goBack()
    await expect(page).toHaveURL(/#cursos$/)
  })
}
