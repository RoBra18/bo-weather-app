import type { WeatherCondition } from './weather';

/**
 * Tipos y modelos asociados al pronóstico del clima.
 */
export interface ForecastItem {
  timestamp: number;
  dateText: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  condition: WeatherCondition;
}

export interface CityForecast {
  cityId: string | number;
  cityName: string;
  list: ForecastItem[];
}
