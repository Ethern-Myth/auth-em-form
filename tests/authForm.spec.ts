import { test, expect } from "@playwright/test";
import { setupPage } from "../app/utils";

test.describe("AuthForm UI Test", () => {
	const pageUrl = "http://localhost:3000"; // Update with your page URL

	test.beforeEach(async ({ page }) => {
		await setupPage(page, pageUrl);
	});

	test("Should display AuthForm with default fields", async ({ page }) => {
		// Check if the AuthForm component is rendered
		const authForm = await page.waitForSelector(
			'form[data-testid="auth-form"]'
		);
		expect(authForm).not.toBeNull();

		// Check if the heading text is displayed correctly
		const headingText = await authForm.$eval("h1", (el) => el.textContent);
		expect(headingText).toContain("Sign In"); // Update with your expected heading text

		// Check if default fields are present
		const emailInput = await authForm.waitForSelector('input[name="email"]');
		const passwordInput = await authForm.waitForSelector(
			'input[name="password"]'
		);
		expect(emailInput).not.toBeNull();
		expect(passwordInput).not.toBeNull();

		// You can add more assertions here as needed
	});

	// Add more tests as needed
});
