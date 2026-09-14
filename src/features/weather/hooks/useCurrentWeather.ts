import { useCityForecast } from '../../forecast/hooks/useForecast';
import type { City } from '../../../types/city';

/**
 * Custom hook para la gestión del clima actual de una ciudad.
 */
export function useCurrentWeather(city: City | null) {
  const { forecast, loading, error } = useCityForecast(city);
  return { weather: forecast, loading, error };
}
