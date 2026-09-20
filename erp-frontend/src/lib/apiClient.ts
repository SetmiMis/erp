// erp-frontend/src/lib/apiClient.ts
//
// Single shared fetch wrapper for talking to the erp-backend API.
// Centralizes what used to be duplicated (and inconsistently done) inline in
// individual pages: resolving the API base URL, attaching the auth header,
// and unwrapping the backend's global response envelope
// (`{ success, message, data }`, see erp-backend/src/common/interceptors/transform.interceptor.ts).

import Cookies from 'js-cookie';

/** Resolve the backend base URL, always including the /api prefix (see erp-backend/src/main.ts setGlobalPrefix). */
export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (configured) return configured.replace(/\/$/, '');

  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    // No configured backend URL in production — fall back to same-origin /api.
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/api`;
  }

  // Local dev default: backend runs on port 3001 (see erp-backend/src/main.ts).
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  return `http://${host}:3001/api`;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface Envelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

/**
 * Fetch `endpoint` (relative to the API base URL, e.g. "/items") and return the
 * unwrapped payload. Throws ApiError with the backend's message on failure.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const base = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const token = Cookies.get('token');
  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const response = await fetch(url, { ...options, headers });

  // File-download responses (Excel/PDF exports) aren't JSON — let the caller
  // handle the raw Response instead of trying to parse/unwrap it.
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, response.status);
    }
    return response as unknown as T;
  }

  let parsed: Envelope<T> | T | null = null;
  try {
    const text = await response.text();
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  if (!response.ok) {
    const message =
      (parsed && typeof parsed === 'object' && 'message' in parsed && (parsed as any).message) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  // Unwrap the { success, message, data } envelope when present; otherwise
  // pass the payload through as-is.
  if (parsed && typeof parsed === 'object' && 'success' in parsed) {
    const envelope = parsed as Envelope<T>;
    if (envelope.success === false) {
      throw new ApiError(envelope.message || 'Request failed', response.status);
    }
    return envelope.data as T;
  }

  return parsed as T;
}

export const apiClient = {
  get: <T = any>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T = any>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T = any>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  put: <T = any>(endpoint: string, body?: unknown, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
