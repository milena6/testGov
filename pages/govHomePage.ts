import { Page } from "@playwright/test";

export function GovHomePage(page: Page) {
  const searchInput = page.getByPlaceholder(
    "Szukaj usług, informacji, wiadomości"
  );
  const searchButton = page.getByRole("button", { name: "Szukaj" });
  const header = page.getByText("Załatwiaj sprawy urzędowe");
  const tabObywatel = page.getByRole("link", { name: "Usługi dla obywatela" });
  const tabPrzedsiebiorca = page.getByRole("link", {
    name: "Usługi dla Przedsiębiorcy",
  });
  const tarczaAntykryzysowa = page.getByText("Tarcza Antykryzysowa");
  const tabUrzednik = page.getByRole("link", { name: "Usługi dla Urzędnika" });
  const tabRolnik = page.getByRole("link", { name: "Usługi dla Rolnika" });

  return {
    searchInput,
    searchButton,
    header,
    tabObywatel,
    tabPrzedsiebiorca,
    tarczaAntykryzysowa,
    tabUrzednik,
    tabRolnik,
  };
}
