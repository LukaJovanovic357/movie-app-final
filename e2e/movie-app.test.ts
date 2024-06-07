import { test } from '@playwright/test';

test('go to page home page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('click view more and go to view page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'View More' }).click();
  await page.goto('http://localhost:5173/movies/7451');
});

test('expand view more', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('.hover\\:cursor-pointer').first().click();
  await page.getByText('An airliner filled with 800').click();
});

test('go to the next page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('2', { exact: true }).click();
});

test('go to the prev page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('2', { exact: true }).click();
  await page.getByText('1', { exact: true }).click();
});

test('go to movie and play trailer', async ({ page }) => {
  await page.goto('http://localhost:5173/movies/141');
  await page.frameLocator('iframe').getByLabel('Play', { exact: true }).click();
});

test('test scroll down button', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Top Rated' }).click();
  await page.getByRole('img', { name: 'arrow-down' }).click();
});
