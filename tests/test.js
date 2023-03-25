import { expect, test } from '@playwright/test';

test('that the index page has headers', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Mathematics' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Programming' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Curriculum Vitae' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Thesis' })).toBeVisible();
});
test('that each index section has some content', async ({ page }) => {
	await page.goto('/');

	// About
	await expect(page.getByText('Software Engineer')).toBeVisible();
	await expect(page.getByText('Research Scientist')).toBeVisible();

	// Mathematics
	await expect(page.getByText('algebraic groups over finite fields')).toBeVisible();
	await expect(page.getByText('unipotent groups by group extensions')).toBeVisible();

	// Contact
	await expect(page.getByText('gmail: seth.j.rothschild', { exact: true })).toBeVisible();
	await expect(page.getByText('dell: seth.rothschild', { exact: true })).toBeVisible();

	// Programming
	await expect(page.getByText('See my')).toBeVisible();

	// CV
	await expect(page.getByText('Updated March 2023')).toBeVisible();

	// Thesis
	await expect(page.getByText('Updated April 31 2017')).toBeVisible();
});
test('that the programming page has headers', async ({ page }) => {
	await page.goto('/programming');
	await expect(page.getByRole('heading', { name: 'Programming' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'GitHub' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Other' })).toBeVisible();
});
test('that each programming page section has some content', async ({ page }) => {
	await page.goto('/programming');

	// GitHub
	await expect(page.getByText('My Github page can be found')).toBeVisible();
	await expect(page.getByText('Emacs users')).toBeVisible();
	await expect(page.getByText('There are a few fun projects')).toBeVisible();

	// Other
	await expect(page.getByText('When I have the time')).toBeVisible();
});
test('that each link goes to the right place', async ({ page }) => {
	await page.goto('/');
	await page.getByText('programming page.').click();
	await expect(page).toHaveURL('/programming');
});
