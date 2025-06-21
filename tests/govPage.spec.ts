import { test, expect } from "@playwright/test";
import { GovHomePage } from "../pages/govHomePage";
import { BASE_URL, URLS } from "../utils/consts";
import { ResultsPage } from "../pages/searchResultsPage";

test.describe("Gov.pl Home Page Tests", () => {
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

  test("should perform search and show results", async ({ page }) => {
    const home = GovHomePage(page);
    const resultsPage = ResultsPage(page);
    const searchTerm = "paszport";

    await test.step(`Search for term: ${searchTerm}`, async () => {
      await home.searchInput.fill(searchTerm);
      await home.searchButton.click();
      await expect(page).toHaveURL(
        `${URLS.BASE_URL}/web/gov/szukaj?query=${searchTerm}`
      );
      await expect(page.getByText(searchTerm)).toBeVisible();
      await expect(resultsPage.noResults).not.toBeVisible();
    });
  });

  test("should navigate to tab: Dla Obywatela", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Obywatela", async () => {
      await expect(home.tabObywatel).toBeVisible();
      await home.tabObywatel.click();
      await expect(page).toHaveURL(URLS.DLA_OBYWATELA);
    });
  });

  test("should navigate to tab: Dla Przedsiębiorcy", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Przedsiębiorcy -> Tarcza Antykryzysowa", async () => {
      await expect(home.tabPrzedsiebiorca).toBeVisible();
      await home.tabPrzedsiebiorca.click();
      await expect(page).toHaveURL(/przedsiebiorcy/);
      await expect(home.main).toBeVisible();
    });
  });

  test("should navigate to tab: Dla Urzędnika", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Urzędnika", async () => {
      await expect(home.tabUrzednik).toBeVisible();
      await home.tabUrzednik.click();
      await expect(page).toHaveURL(/urzednika/);
      await expect(home.main).toBeVisible();
    });
  });

  test("should navigate to tab: Dla Rolnika", async ({ page }) => {
    const home = GovHomePage(page);

    await test.step("Navigate to tab: Dla Rolnika", async () => {
      await expect(home.tabRolnik).toBeVisible();
      await home.tabRolnik.click();
      await expect(page).toHaveURL(/rolnika/);
      await expect(home.main).toBeVisible();
    });
  });
});
