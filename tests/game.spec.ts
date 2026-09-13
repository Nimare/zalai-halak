import { test, expect } from '@playwright/test';
import fishData from '../data/fishes.json' with { type: 'json' };

test('pages, images, navigation and layout work', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && message.text().includes('[vinext]'))
      errors.push(message.text());
  });
  for (const route of ['/', '/forrasok', '/jatek']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole('link', { name: 'Vissza a fesztiválhoz' }).click();
  await expect(page).toHaveURL('/');
  await page
    .getByRole('link', { name: 'Források és impresszum', exact: true })
    .click();
  await expect(page).toHaveURL('/forrasok');
  await page
    .getByRole('link', { name: 'Vissza a főoldalra', exact: true })
    .click();
  await expect(page).toHaveURL('/');
  await page.getByRole('link', { name: 'Játék', exact: true }).click();
  await expect(page).toHaveURL('/jatek');
  for (const path of [
    '/poster.png',
    '/favicon.svg',
    ...fishData.fishes.map((fish) => fish.image),
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect((await request.get('/not-a-real-page')).status()).toBe(404);
  expect(errors).toEqual([]);
});

for (const blockedStorage of [false, true]) {
  test(`complete a beginner game with storage ${blockedStorage ? 'blocked' : 'available'}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    if (blockedStorage)
      await page.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new Error('Storage denied');
          },
        });
      });
    await page.goto('/jatek');
    await page.getByRole('button', { name: /^Kezdő/ }).click();
    const seen = new Set<string>();
    for (let round = 0; round < 20; round++) {
      const photo = page.locator('.fish-photo img');
      const image = await photo.getAttribute('src');
      const fish = fishData.fishes.find((entry) => entry.image === image);
      expect(fish).toBeDefined();
      expect(seen.has(image!)).toBe(false);
      seen.add(image!);
      await expect(photo).toBeVisible();
      await page
        .getByRole('button', { name: fish!.nameHu, exact: true })
        .click();
      await expect(
        page.getByText('Helyes válasz!', { exact: true }),
      ).toBeVisible();
      await page
        .getByRole('button', {
          name: round === 19 ? /Eredmény megtekintése/ : /Következő hal/,
        })
        .click();
    }
    await expect(page.locator('h1')).toHaveText('20 / 20');
    if (!blockedStorage) {
      await page.reload();
      await expect(page.getByRole('button', { name: /^Kezdő/ })).toContainText(
        'Rekord: 20/20',
      );
    }
    expect(errors).toEqual([]);
  });
}

test('expert input and timeout advance correctly', async ({ page }) => {
  await page.goto('/jatek');
  await page.clock.install();
  await page.getByRole('button', { name: /^Szakértő/ }).click();
  const image = await page.locator('.fish-photo img').getAttribute('src');
  const fish = fishData.fishes.find((entry) => entry.image === image)!;
  await page.getByLabel('A hal pontos magyar neve').fill(fish.nameHu);
  await page.getByRole('button', { name: 'Válasz elküldése' }).click();
  await expect(page.getByText('Helyes válasz!', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Következő hal/ }).click();
  // Advance one tick at a time so React commits each scheduled timeout.
  for (let second = 0; second < 30; second++) {
    await page.clock.runFor(1000);
  }
  await expect(page.getByText('Lejárt az idő', { exact: true })).toBeVisible();
  await expect(page.getByRole('progressbar')).toHaveAttribute('value', '0');
});
