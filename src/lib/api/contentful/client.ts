import { createClient } from 'contentful';
import { contentfulConfig } from '../../config/contentful';
import { createHeaders } from '../../utils/http';
import { safeSerialize } from '../../utils/serialization';

// Create a proxy to intercept and clean responses
const createContentfulProxy = (client: any) => {
  return new Proxy(client, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return async (...args: any[]) => {
          const result = await target[prop](...args);
          return safeSerialize(result);
        };
      }
      return target[prop];
    }
  });
};

// Create Contentful client with proper headers and serialization handling
const baseClient = createClient({
  ...contentfulConfig,
  headers: createHeaders({
    'Access-Control-Allow-Origin': '*',
    'X-Contentful-User-Agent': 'exp3-web-app'
  })
});

export const contentfulClient = createContentfulProxy(baseClient);