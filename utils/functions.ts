import { APIRequestContext } from "@playwright/test";

export async function getSearchCount(
  request: APIRequestContext,
  query: string,
  category = "kategoria",
  page = 1,
  size = 25
): Promise<number> {
  const url = `https://www.gov.pl/api/data/search?query=${encodeURIComponent(
    query
  )}&category=${category}&page=${page}&size=${size}`;

  const response = await request.get(url);
  if (!response.ok()) {
    throw new Error(
      `Failed to fetch data from API: ${response.status()} ${response.statusText()}`
    );
  }

  const json = await response.json();
  return json.count;
}
