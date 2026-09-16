import { BOLIVIA_CAPITAL_CITIES } from '../../config/cities';
import type { City } from '../../types/city';

export function getBoliviaCapitalCities(): City[] {
  return BOLIVIA_CAPITAL_CITIES;
}

export function getCityById(id: string): City | undefined {
  return BOLIVIA_CAPITAL_CITIES.find((c) => c.id === id);
}

export function searchCities(query: string): City[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return BOLIVIA_CAPITAL_CITIES;

  return BOLIVIA_CAPITAL_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(normalized) ||
      (city.department && city.department.toLowerCase().includes(normalized))
  );
}
