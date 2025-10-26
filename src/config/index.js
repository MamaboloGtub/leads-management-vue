// Configuration utility for environment variables
export const config = {
  apiPHPBaseUrl: import.meta.env.VITE_API_PHP_BASE_URL || 'http://localhost:8888/api',
  apiFluxBaseUrl: import.meta.env.VITE_API_FLUX_BASEURL || '/api',

  appName: import.meta.env.VITE_APP_NAME || 'Leads Management System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
