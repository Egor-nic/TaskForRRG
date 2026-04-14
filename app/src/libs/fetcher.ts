
import { API_BASE_URL } from "./api";

type TFetcher = {
  url: string;
  signal?: AbortSignal;
};

export async function fetcher({ url, signal }: TFetcher) {
  const response = await fetch(`${API_BASE_URL}${url}`, { signal });

  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }

  return response;
}
