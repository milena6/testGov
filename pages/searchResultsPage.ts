import { Page } from "@playwright/test";

export function ResultsPage(page: Page) {
  const noResults = page.getByText("Nie znaleziono wyników");

  return {
    noResults,
  };
}
