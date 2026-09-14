import type { CurrentWeather } from '../../../types/weather';

/**
 * Custom hook para la gestión del estado del clima actual.
 */
export function useCurrentWeather(_cityQuery?: string) {
  const weather: CurrentWeather | null = null;
  const loading = false;
  const error: string | null = null;

  return { weather, loading, error };
}
