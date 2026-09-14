import type { City } from '../../../types/city';

/**
 * Custom hook para gestionar la búsqueda y resultados de ciudades.
 */
export function useCitySearch() {
  const cities: City[] = [];
  const loading = false;
  const error: string | null = null;

  const search = (_query: string) => {
    // Pendiente de implementación
  };

  return { cities, loading, error, search };
}
