// client/src/lib/api.ts — API client for making authenticated requests
const API_BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("sg_token");
}

export async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as any).error || "Request failed");
  }
  return data as T;
}
