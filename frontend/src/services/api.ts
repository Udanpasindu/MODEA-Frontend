function apiBase(value: string | undefined): string {
  const configured = value?.trim() || '/api/v1';

  // Accept either the backend origin or the complete API base URL. This keeps
  // a Vercel value such as https://backend.example.com from producing requests
  // to https://backend.example.com/products (the API is mounted at /api/v1).
  if (/^https?:\/\//i.test(configured)) {
    const url = new URL(configured);
    const path = url.pathname.replace(/\/$/, '');
    return `${url.origin}${path || '/api/v1'}`;
  }

  const path = configured.replace(/\/$/, '');
  return path || '/api/v1';
}

const BASE = apiBase(import.meta.env.VITE_API_BASE_URL);

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body?.error?.message || 'Something went wrong');
  }
  if (response.status === 204) return undefined as T;

  const body = await response.json();
  return body.data as T;
}
