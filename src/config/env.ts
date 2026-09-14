/**
 * Configuración de variables de entorno de la aplicación.
 */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_WEATHER_API_BASE_URL || '',
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY || '',
};
