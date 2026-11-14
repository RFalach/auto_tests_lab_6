import { test, expect } from '@playwright/test';
import { USERS } from './data';

test.describe('Бічне меню', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(USERS.standard.username);
    await page.locator('[data-test="password"]').fill(USERS.standard.password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('відкриває меню з пунктами', async ({ page }) => {
    const menu = page.locator('.bm-menu-wrap');
    await expect(menu).toBeHidden();

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(menu).toBeVisible();

    await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
  });

  test('вихід через Logout повертає на сторінку входу', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('.bm-menu-wrap')).toBeVisible();

    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
