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
});
test('that each programming page section has some content', async ({ page }) => {
	await page.goto('/programming');

	// GitHub
	await expect(page.getByText('My Github page can be found')).toBeVisible();
	await expect(page.getByText('Emacs users')).toBeVisible();
	await expect(page.getByText('There are a few fun projects')).toBeVisible();
});
test('that each link goes to the right place', async ({ context, page }) => {
	// Programming
	await page.goto('/');
	await page.getByText('programming page.').click();
	await expect(page).toHaveURL('/programming');

	await page.goto('/');
	await page.getByText('programming', { exact: true }).click();
	await expect(page).toHaveURL('/programming');

	// External Links
	await testTargetBlank(
		context,
		page,
		'/',
		'Extreme Programming',
		'https://en.wikipedia.org/wiki/Extreme_programming'
	);
	await testTargetBlank(context, page, '/', 'Feature Labs', 'https://www.featurelabs.com/open/');
	await testTargetBlank(
		context,
		page,
		'/',
		'Featuretools.',
		'https://github.com/alteryx/featuretools'
	);
	await testTargetBlank(context, page, '/', 'Github', 'https://github.com/Seth-Rothschild');

	await testTargetBlank(
		context,
		page,
		'/',
		'George McNinch',
		'https://math.tufts.edu/people/faculty/george-mcninch'
	);
	await testTargetBlank(context, page, '/', 'Tufts University', 'https://www.tufts.edu');

	await testTargetBlank(
		context,
		page,
		'/programming',
		'here.',
		'https://github.com/Seth-Rothschild'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'henchman',
		'https://github.com/alteryx/henchman'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'Featuretools,',
		'https://github.com/alteryx/featuretools'
	);

	await testTargetBlank(
		context,
		page,
		'/programming',
		'configuration,',
		'https://github.com/Seth-Rothschild/.emacs.d'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'LaTeX Thesis and Presentation Template',
		'https://github.com/Seth-Rothschild/Thesis-and-Presentation-templates'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'contacts manager page,',
		'https://github.com/Seth-Rothschild/contacts_info'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'assigning seats',
		'https://github.com/Seth-Rothschild/seatingchart-helper'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'thrill digger',
		'https://github.com/Seth-Rothschild/thrill_digger_tdd'
	);
	await testTargetBlank(
		context,
		page,
		'/programming',
		'Wordle',
		'https://github.com/Seth-Rothschild/wordle_strategy_evaluation'
	);
});
async function testTargetBlank(context, page, start, text, end) {
	const pagePromise = context.waitForEvent('page');
	await page.goto(start);
	await page.getByText(text).click();
	const newPage = await pagePromise;
	await newPage.waitForLoadState();
	await expect(newPage).toHaveURL(end);
}
