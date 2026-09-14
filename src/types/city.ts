/**
 * Tipos y modelos de ciudades y geolocalización.
 */
export interface City {
  id: string;
  name: string;
  department?: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
