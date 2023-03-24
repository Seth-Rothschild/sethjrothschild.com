import { expect, test } from '@playwright/test';

test('index page has Home', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
});
