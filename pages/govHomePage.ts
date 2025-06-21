import { Page } from "@playwright/test";

export function GovHomePage(page: Page) {
  const searchInput = page.getByPlaceholder(
    "Szukaj usług, informacji, wiadomości"
  );
  const searchButton = page.getByRole("button", { name: "Szukaj" });
  const header = page.getByText("Załatwiaj sprawy urzędowe");
  const tabObywatel = page.getByRole("link", { name: "Dla obywatela" });
  const dokumentyDlaObywatela = page.getByText("Dokumenty i dane osobowe");
  const tabPrzedsiebiorca = page.getByRole("link", {
    name: "Usługi dla Przedsiębiorcy",
  });
  const tarczaAntykryzysowa = page.getByText("Tarcza Antykryzysowa");
  const tabUrzednik = page.getByRole("link", { name: "Dla Urzędnika" });
  const sprawyPubliczne = page.getByText("Sprawy publiczne");
  const tabRolnik = page.getByRole("link", { name: "Dla Rolnika" });
  const ubezpieczeniaSpoleczne = page.getByText("Ubezpieczenia społeczne");

  return {
    searchInput,
    searchButton,
    header,
    tabObywatel,
    dokumentyDlaObywatela,
    tabPrzedsiebiorca,
    tarczaAntykryzysowa,
    tabUrzednik,
    sprawyPubliczne,
    tabRolnik,
    ubezpieczeniaSpoleczne,
  };
}
