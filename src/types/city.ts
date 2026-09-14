/**
 * Tipos y modelos de ciudades y geolocalización.
 */
export interface City {
  id?: string | number;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
