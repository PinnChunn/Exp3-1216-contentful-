// Utility functions for URL handling
export const sanitizeUrl = (url: string | undefined): string => {
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};