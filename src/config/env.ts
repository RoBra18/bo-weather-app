/**
 * Configuración de variables de entorno de la aplicación.
 */
export const ENV = {
  OPEN_METEO_BASE_URL: import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.open-meteo.com/v1',
};
