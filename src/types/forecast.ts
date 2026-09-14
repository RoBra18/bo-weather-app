import type { City } from './city';
import type { CurrentWeather, DailyForecast } from './weather';

/**
 * Pronóstico meteorológico completo de aplicación para una ciudad.
 * Mantiene la separación lógica entre el clima actual (CurrentWeather) y el pronóstico de 7 días (DailyForecast[]).
 */
export interface CityWeatherForecast {
  city: City;
  current: CurrentWeather;
  forecast: DailyForecast[];
}
