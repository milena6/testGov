import { test, expect, request } from "@playwright/test";
import { GovHomePage } from "../pages/govHomePage";
import { BASE_URL, URLS } from "../utils/consts";
import { ResultsPage } from "../pages/searchResultsPage";
import { getSearchCount } from "../utils/functions";

test.describe("Search tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
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
  test("should perform search and filter results by jednostka administracji", async ({
    page,
    request,
  }) => {
    const home = GovHomePage(page);
    const resultsPage = ResultsPage(page);
    const searchTerm = "paszport";

    await test.step(`Search for ${searchTerm}`, async () => {
      await home.searchInput.fill(searchTerm);
      await home.searchButton.click();
      const countBefore = await getSearchCount(request, searchTerm);

      await test.step(`Filter the results`, async () => {
        await resultsPage.filterByJednostkaAdminstracji.click();
        await resultsPage.searchInputJednostkaAdministracji.fill(
          "Pomorski Urząd Wojewódzki"
        );
        await resultsPage.chooseJednostkaAdministracji(
          "Pomorski Urząd Wojewódzki w Gdańsku"
        );
        const countAfter = await getSearchCount(request, searchTerm);
        expect(countAfter).toBeLessThan(countBefore);

        await page
          .getByRole("link", { name: "Szybki paszport tymczasowy w" })
          .click();
        await expect(
          page.getByText(
            "Szybki paszport tymczasowy w Porcie Lotniczym Gdańsk im. Lecha Wałęsy"
          )
        ).toBeVisible();
      });
    });
  });
  test("should perform search, filter and clear results by okres", async ({
    page,
    request,
  }) => {
    const home = GovHomePage(page);
    const resultsPage = ResultsPage(page);
    const searchTerm = "paszport";

    let countBefore: number;
    let countAfter: number;

    await test.step(`Search for ${searchTerm}`, async () => {
      await home.searchInput.fill(searchTerm);
      await home.searchButton.click();
      countBefore = await getSearchCount(request, searchTerm);
    });
    await test.step(`Filter the results`, async () => {
      await resultsPage.filterByOkres.click();
      await resultsPage.chooseOkres("Ostatni rok");
      countAfter = await getSearchCount(request, searchTerm);
      expect(countAfter).toBeLessThan(countBefore);
    });
    await test.step(`Revert filtering by okres`, async () => {
      await resultsPage.wyczyscButton.click();
      const countAfterWyczysc = await getSearchCount(request, searchTerm);
      expect(countAfter).toBeGreaterThan(countAfterWyczysc);
      expect(countAfterWyczysc).toBe(countBefore);
    });
  });
});
