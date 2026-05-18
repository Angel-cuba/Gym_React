const buildRapidApiHeaders = (host: string): HeadersInit => {
  const headers: Record<string, string> = {
    "X-RapidAPI-Host": host,
  };

  if (process.env.REACT_APP_RAPID_API_KEY) {
    headers["X-RapidAPI-Key"] = process.env.REACT_APP_RAPID_API_KEY;
  }

  return headers;
};

export const exerciseOptions: RequestInit = {
  method: "GET",
  headers: buildRapidApiHeaders("exercisedb.p.rapidapi.com"),
};

export const youtubeOptions: RequestInit = {
  method: "GET",
  headers: buildRapidApiHeaders("youtube-search-and-download.p.rapidapi.com"),
};

export async function fetchData<T>(
  url: string,
  options: RequestInit
): Promise<T | null> {
  if (url.includes("rapidapi.com") && !process.env.REACT_APP_RAPID_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn("Using local fallback data", error);
    return null;
  }
}
