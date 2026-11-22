import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const appPath = (path: string) => `${process.env.PAGES_BASE_PATH ?? ''}${path}`;
const routes = ['/', '/detector', '/ia', '/privacidade', '/oportunidades', '/mentoria'];
for (const route of routes) {
  test(`página ${route}: HTTP, acessibilidade e largura`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(appPath(route));
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test('quiz: erro, acerto, navegação, persistência e reset confirmado', async ({ page }) => {
  await page.goto(appPath('/detector'));
  await page.getByRole('button', { name: 'Clicar para ver', exact: true }).click();
  await expect(page.getByText('Ainda não.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Ignorar e não clicar', exact: true }).click();
  await expect(page.getByText('Correto! Atividade concluída (+20 XP).', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ignorar e não clicar', exact: true })).toBeDisabled();
  await page.getByRole('link', { name: 'ShieldUp', exact: true }).click();
  await expect(page.getByText('20 XP', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('20 XP', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reiniciar progresso' }).click();
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.getByText('20 XP', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reiniciar progresso' }).click();
  await page.getByRole('button', { name: 'Confirmar exclusão' }).click();
  await expect(page.getByText('0 XP', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('0 XP', { exact: true })).toBeVisible();
});
test('link: validação, domínio verdadeiro, sem acesso ao destino', async ({ page }) => {
  await page.goto(appPath('/detector'));
  let externalRequest = false;
  await page.route('https://fraude.example/**', route => { externalRequest = true; return route.abort(); });
  await page.getByRole('button', { name: 'Analisar endereço' }).click();
  await expect(page.getByText('Cole um endereço completo', { exact: false })).toBeVisible();
  await page.getByLabel('Endereço para analisar').fill('https://banco.com@fraude.example');
  await page.getByRole('button', { name: 'Analisar endereço' }).click();
  await expect(page.getByText('fraude.example', { exact: true })).toBeVisible();
  await expect(page.getByText('Há credenciais', { exact: false })).toBeVisible();
  expect(externalRequest).toBe(false);
  await page.getByLabel('Endereço para analisar').fill('https://example.com');
  await page.getByRole('button', { name: 'Analisar endereço' }).click();
  await expect(page.getByText('Isso não significa que o site seja confiável.', { exact: false })).toBeVisible();
});
test('privacidade e prompt concedem XP uma única vez e desbloqueiam conquistas', async ({ page }) => {
  await page.goto(appPath('/privacidade'));
  for (const name of ['Compartilhar CPF em grupo de WhatsApp', 'Postar foto com localização ativada', 'Usar a mesma senha em todos os sites']) {
    await page.getByRole('button', { name, exact: true }).click();
    await page.getByRole('button', { name: 'Entendi, concluir lição' }).click();
    await expect(page.getByRole('button', { name: 'Lição concluída (+10 XP)' })).toBeDisabled();
  }
  await page.goto(appPath('/ia'));
  await page.getByRole('button', { name: 'Concluir exercício' }).click();
  await expect(page.getByRole('status')).toContainText('pelo menos 30 caracteres');
  await page.getByLabel('Seu prompt').fill('Um jovem do interior usando um laptop na varanda de casa, ilustração em aquarela.');
  await page.getByRole('button', { name: 'Concluir exercício' }).click();
  await expect(page.getByRole('button', { name: 'Atividade concluída', exact: true })).toBeDisabled();
  await page.goto(appPath('/'));
  await expect(page.getByText('80 XP', { exact: true })).toBeVisible();
  await expect(page.getByText('Guardião da Privacidade · conquistado', { exact: true })).toBeVisible();
  await expect(page.getByText('Explorador de IA · conquistado', { exact: true })).toBeVisible();
});
test('armazenamento corrompido não quebra a página', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('shieldup-progress-v1', '{bad-json'));
  await page.goto(appPath('/'));
  await expect(page.getByText('0 XP', { exact: true })).toBeVisible();
});
test('armazenamento bloqueado mantém as atividades utilizáveis na sessão', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); }; });
  await page.goto(appPath('/detector'));
  await page.getByRole('button', { name: 'Ignorar e não clicar', exact: true }).click();
  await page.getByRole('link', { name: 'ShieldUp', exact: true }).click();
  await expect(page.getByText('20 XP', { exact: true })).toBeVisible();
});
test('progresso sincroniza entre abas', async ({ page, context }) => {
  await page.goto(appPath('/'));
  const other = await context.newPage();
  await other.goto(appPath('/detector'));
  await other.getByRole('button', { name: 'Ignorar e não clicar', exact: true }).click();
  await expect(page.getByText('20 XP', { exact: true })).toBeVisible();
  await page.evaluate(() => localStorage.removeItem('shieldup-progress-v1'));
  await expect(other.getByRole('button', { name: 'Ignorar e não clicar', exact: true })).toBeEnabled();
  await other.close();
});
test('mentoria informa o estágio real e apresenta roteiros expansíveis', async ({ page }) => {
  await page.goto(appPath('/mentoria'));
  await expect(page.getByText('Não há profissionais verificados', { exact: false })).toBeVisible();
  await page.getByText('Inteligência artificial', { exact: true }).click();
  await expect(page.getByText('Quero entender como a IA funciona', { exact: false })).toBeVisible();
});
test('navegação por teclado tem foco e permite pular para o conteúdo', async ({ page }) => {
  await page.goto(appPath('/'));
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});
test('manifesto aponta para ícone existente e página ausente retorna 404', async ({ page, request }) => {
  await page.goto(appPath('/'));
  const manifestPath = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestPath).toBe(appPath('/manifest.json'));
  const manifest = await request.get(manifestPath!);
  expect(manifest.ok()).toBe(true);
  const data = await manifest.json();
  expect(new URL(data.start_url, manifest.url()).pathname).toBe(appPath('/'));
  for (const icon of data.icons) {
    const url = new URL(icon.src, manifest.url());
    expect(url.pathname).toBe(appPath('/shield.svg'));
    expect((await request.get(url.href)).ok()).toBe(true);
  }
  expect((await request.get(appPath('/pagina-inexistente'))).status()).toBe(404);
});
test('trilha completa chega a 140 XP sem duplicar pontos após recarga', async ({ page }) => {
  await page.goto(appPath('/detector'));
  for (const name of ['Ignorar e não clicar', 'Buscar na fonte oficial', 'Bloquear e denunciar']) await page.getByRole('button', { name, exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Ignorar e não clicar', exact: true })).toBeDisabled();
  await page.goto(appPath('/privacidade'));
  for (const name of ['Compartilhar CPF em grupo de WhatsApp', 'Postar foto com localização ativada', 'Usar a mesma senha em todos os sites']) {
    await page.getByRole('button', { name, exact: true }).click(); await page.getByRole('button', { name: 'Entendi, concluir lição' }).click();
  }
  await page.goto(appPath('/ia'));
  await page.getByLabel('Seu prompt').fill('Uma jovem do interior estudando com um computador na biblioteca, fotografia documental.');
  await page.getByRole('button', { name: 'Concluir exercício' }).click();
  await page.goto(appPath('/'));
  await expect(page.getByText('140 XP', { exact: true })).toBeVisible();
  await expect(page.getByText('7 de 7 atividades concluídas', { exact: false })).toBeVisible();
  await expect(page.getByText('Olho de Lince · conquistado', { exact: true })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze()).violations).toEqual([]);
});
test('navegação e páginas cabem de 320 a 1440 pixels', async ({ page }) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(appPath(route));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} em ${width}px`).toBe(true);
    }
  }
});
