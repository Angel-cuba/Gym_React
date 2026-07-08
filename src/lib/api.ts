let getTokenFn: (() => Promise<string | null>) | null = null;

export function setTokenProvider(fn: () => Promise<string | null>) {
  getTokenFn = fn;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getTokenFn ? await getTokenFn() : null;

  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  if (res.status === 204) return undefined as unknown as T;
  return res.json();
}
