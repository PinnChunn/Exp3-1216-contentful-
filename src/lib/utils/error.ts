// Utility functions for error handling
export const serializeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const createApiError = (message: string, originalError?: unknown): string => {
  const errorMessage = serializeError(originalError);
  console.error(`${message}:`, errorMessage);
  return 'An error occurred. Please try again later.';
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.name === 'NetworkError' || error.message.includes('network'));
};

export const isCorsError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.name === 'SecurityError' || error.message.includes('CORS'));
};