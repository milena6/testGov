import { Page } from "@playwright/test";

export function ResultsPage(page: Page) {
  const noResults = page.getByText("Nie znaleziono wyników");
  const piecsetPlusLink = page.getByText(
    "Poznaj Program „Rodzina 500 plus”: część I"
  );
  const filterByJednostkaAdminstracji = page.getByText(
    "Jednostka administracji Naciś"
  );
  const searchInputJednostkaAdministracji = page.getByRole("textbox", {
    name: "szukaj...",
  });
  const filterByOkres = page.getByText("Okres Naciśnij enter aby");
  const wyczyscButton = page
    .locator("#custom-select-period-dropdown")
    .getByText("Wyczyść");

  async function chooseJednostkaAdministracji(jednostka: string) {
    page
      .getByRole("option", { name: `${jednostka}` })
      .locator("label")
      .click();
  }

  async function chooseOkres(okres: string) {
    page
      .getByRole("option", { name: `${okres}` })
      .locator("label")
      .click();
  }
  return {
    noResults,
    piecsetPlusLink,
    filterByJednostkaAdminstracji,
    searchInputJednostkaAdministracji,
    filterByOkres,
    chooseJednostkaAdministracji,
    chooseOkres,
    wyczyscButton,
  };
}
