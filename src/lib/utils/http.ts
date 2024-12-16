import { corsConfig } from '../config/cors';

export const createHeaders = (additionalHeaders: Record<string, string> = {}): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...additionalHeaders
  });
  return headers;
};

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred'
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const createRequestOptions = (
  method: string,
  data?: unknown,
  additionalHeaders: Record<string, string> = {}
): RequestInit => {
  return {
    method,
    headers: createHeaders(additionalHeaders),
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined
  };
};