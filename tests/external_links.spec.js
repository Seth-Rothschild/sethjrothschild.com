import { expect, test } from '@playwright/test';

test('that each index external link goes to the right place', async ({ context, page }) => {
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
});

test('that each thesis external link goes to the right place', async ({ context, page }) => {
	await testTargetBlank(
		context,
		page,
		'/thesis',
		'Link to PDF',
		'https://dl.tufts.edu/concern/pdfs/bk128p04h'
	);
});
test('that each programming external link goes to the right place', async ({ context, page }) => {
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
