const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

export const baseApi = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const headers = new Headers();

  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const hasBody = response.status !== 204;
  const data = hasBody ? await response.json() : null;

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String(data.message)
        : "Request failed";

    throw new Error(message);
  }

  return data as T;
};
