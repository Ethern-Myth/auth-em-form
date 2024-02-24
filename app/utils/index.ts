import { Page } from "@playwright/test";

export async function setupPage(page: Page, url: string) {
	await page.goto(url);
	// You can add more setup steps here if needed
}
