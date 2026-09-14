import type { CityForecast } from '../../../types/forecast';

/**
 * Custom hook para la gestión del estado del pronóstico del clima.
 */
export function useForecast(_cityQuery?: string) {
  const forecast: CityForecast | null = null;
  const loading = false;
  const error: string | null = null;

  return { forecast, loading, error };
}
