import { Page } from "@playwright/test";

export function ResultsPage(page: Page) {
  const noResults = page.getByText("Nie znaleziono wyników");
  const piecsetPlusLink = page.getByText(
    "Poznaj Program „Rodzina 500 plus”: część I"
  );

  return {
    noResults,
    piecsetPlusLink,
  };
}
