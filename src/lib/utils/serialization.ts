/**
 * Utilities for safe data serialization and handling Symbol properties
 */

type SerializableValue = string | number | boolean | null | undefined | SerializableObject | SerializableArray;
interface SerializableObject { [key: string]: SerializableValue }
interface SerializableArray extends Array<SerializableValue> {}

/**
 * Safely serialize and deserialize data to remove Symbol properties
 */
export const safeSerialize = <T>(data: T): T => {
  try {
    // First attempt: direct JSON serialization
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    // If direct serialization fails, use manual cleaning
    return cleanDataStructure(data);
  }
};

/**
 * Recursively clean a data structure of Symbol properties
 */
const cleanDataStructure = <T>(data: T): T => {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(cleanDataStructure) as unknown as T;
  }

  if (typeof data === 'object') {
    const cleaned: Record<string, any> = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as Record<string, any>)[key];
        
        // Skip Symbol properties
        if (typeof value === 'symbol') {
          continue;
        }
        
        // Recursively clean nested objects and arrays
        cleaned[key] = cleanDataStructure(value);
      }
    }
    
    return cleaned as T;
  }

  // Return primitive values as is
  return data;
};

/**
 * Create a clean copy of an object without Symbol properties
 */
export const createCleanObject = <T extends Record<string, any>>(obj: T): T => {
  return cleanDataStructure(obj);
};

/**
 * Check if a value is serializable
 */
export const isSerializable = (value: any): boolean => {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Convert a value to a serializable format
 */
export const toSerializable = (value: any): SerializableValue => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'symbol') {
    return value.toString();
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Map) {
    return Object.fromEntries(value);
  }

  if (value instanceof Set) {
    return Array.from(value);
  }

  if (Array.isArray(value)) {
    return value.map(toSerializable);
  }

  if (typeof value === 'object') {
    const result: Record<string, SerializableValue> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = toSerializable(value[key]);
      }
    }
    return result;
  }

  return value;
};