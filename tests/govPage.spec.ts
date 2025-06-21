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
    const searchTerm = "500+";

    await test.step(`Search for term: ${searchTerm}`, async () => {
      await home.searchInput.fill(searchTerm);
      await home.searchButton.click();
      await expect(page).toHaveURL(
        `${URLS.BASE_URL}/web/gov/szukaj?query=${searchTerm}`
      );
      await expect(page.getByText(searchTerm)).toBeVisible();
      await expect(resultsPage.noResults).not.toBeVisible();
    });
    await test.step(`Find 500+ article`, async () => {
      await resultsPage.piecsetPlusLink.click();
      await expect(page.url).toBe(URLS.PIECSET_PLUS_ARTICLE);
      await expect(
        page.getByText("Czym jest Program „Rodzina 500 plus”?")
      ).toBeVisible();
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
