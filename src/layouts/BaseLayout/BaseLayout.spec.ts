import { test, expect } from "@playwright/test";

test("meta is correct", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Lance Jeffers");
  // TODO: add more assertions on the `meta` attributes, such as anything relevant to language or SEO
});
