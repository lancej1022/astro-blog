import { test, expect } from "@playwright/test";

test("Skip to content anchor is the first link in the DOM", async ({ page, browserName }) => {
  test.skip(
    browserName === "webkit",
    "Tab navigation is not enabled by default on Safari, which means this test cannot pass in that browser"
  );

  await page.goto("/");

  const skipToContentLink = page.locator("#skip-to-content");

  await page.keyboard.press("Tab");
  const skipToContentLinkIsFocused = await skipToContentLink.evaluate(
    (node) => document.activeElement === node
  );
  expect(skipToContentLinkIsFocused).toBe(true);
});
