import { test, expect } from "@playwright/test";
import { GovHomePage } from "../pages/govHomePage";
import { BASE_URL, URLS } from "../utils/consts";
import { ResultsPage } from "../pages/searchResultsPage";

test.describe("Gov.pl home page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should load homepage properly", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Verify main page structure is visible", async () => {
      await expect(page).toHaveTitle("Portal Gov.pl");
      await expect(home.header).toBeVisible();
      await expect(home.searchInput).toBeVisible();
    });
  });

  test("Dla Obywatela tab is open by default and has content", async ({
    page,
  }) => {
    const home = GovHomePage(page);

    await test.step("Specific page content is visible", async () => {
      await expect(home.tabObywatel).toBeVisible();
      await expect(home.dokumentyDlaObywatela).toBeVisible();
    });
  });

  test("should navigate to tab: Dla Przedsiębiorcy", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Specific page content is visible", async () => {
      await home.tabPrzedsiebiorca.click();
      await expect(home.tarczaAntykryzysowa).toBeVisible();
    });
  });

  test("should navigate to tab: Dla Urzędnika", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Urzędnika", async () => {
      await home.tabUrzednik.click();
      await expect(home.tarczaAntykryzysowa).toBeVisible();
      await expect(home.sprawyPubliczne).toBeVisible();
    });
  });

  test("should navigate to tab: Dla Rolnika", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Rolnika", async () => {
      await home.tabRolnik.click();
      await expect(home.ubezpieczeniaSpoleczne).toBeVisible();
    });
  });
});
