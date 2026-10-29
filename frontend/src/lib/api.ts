const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[fetchApi] Error connecting to ${url}:`, error);
    throw error;
  }
}
