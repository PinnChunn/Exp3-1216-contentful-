/**
 * Type-safe object utilities
 */

/**
 * Safely get a nested value from an object using a path string
 */
export const getNestedValue = <T>(obj: any, path: string, defaultValue?: T): T => {
  try {
    return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
  } catch {
    return defaultValue as T;
  }
};

/**
 * Remove undefined and null values from an object
 */
export const cleanObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value != null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Deep merge two objects
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] || {}, value);
    } else {
      result[key] = value as any;
    }
  });
  
  return result;
};