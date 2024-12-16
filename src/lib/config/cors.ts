// CORS configuration
export const corsConfig = {
  allowedOrigins: [
    'stackblitz.io',
    'stackblitz.com',
    'bolt.new',
    'exp32024.web.app',
    'exp32024.firebaseapp.com',
    'exp3.org',
    'netlify.app',
    'localhost',
    'webcontainer.io'
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
} as const;

export const isAllowedOrigin = (origin: string): boolean => {
  return corsConfig.allowedOrigins.some(allowed => 
    origin.includes(allowed) || origin === 'null'
  );
};