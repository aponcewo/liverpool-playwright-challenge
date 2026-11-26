import { test, expect } from '@playwright/test';

test('Liverpool carga correctamente', async ({ page }) => {
  await page.goto('https://www.liverpool.com.mx/');
  await expect(page).toHaveTitle(/Liverpool/i);
});