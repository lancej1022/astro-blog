import { test, expect } from "@playwright/test";
import { SITE } from "~/config";

test("Skip to content anchor is the first link in the DOM", async ({ page, browserName }) => {
  test.skip(
    browserName === "webkit",
    "Tab navigation is not enabled by default in Safari, which means this test cannot pass in that browser"
  );

  await page.goto("/");
  const skipToContentLink = page.locator("#skip-to-content");
  await page.keyboard.press("Tab");
  await expect(skipToContentLink).toBeFocused();
});

test("Displays site title properly", async ({ page }) => {
  await page.goto("/");
  const siteTitleRegex = new RegExp(SITE.title + "$");
  await expect(page.getByRole("link", { name: siteTitleRegex })).toBeVisible();
});

test("Renders all nav menu items", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation");

  const postsLink = nav.getByRole("link", { name: "Posts" });
  await expect(postsLink).toBeVisible();
  await expect(postsLink).toHaveAttribute("href", "/posts");

  const tagsLink = nav.getByRole("link", { name: "Tags" });
  await expect(tagsLink).toBeVisible();
  await expect(tagsLink).toHaveAttribute("href", "/tags");

  const aboutLink = nav.getByRole("link", { name: "About" });
  await expect(aboutLink).toBeVisible();
  await expect(aboutLink).toHaveAttribute("href", "/about");
  // TODO: assert on search button + RSS button
});

// TODO: assert light/dark toggle works as expected
