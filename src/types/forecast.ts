import type { City } from './city';
import type { DailyForecast } from './weather';

/**
 * Pronóstico meteorológico de aplicación para una ciudad.
 */
export interface CityWeatherForecast {
  city: City;
  currentHumidity?: number;
  currentWindSpeed?: number;
  forecast: DailyForecast[];
}
