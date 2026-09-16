import type { City } from './city';
import type { CurrentWeather, DailyForecast } from './weather';

export interface CityWeatherForecast {
  city: City;
  current: CurrentWeather;
  forecast: DailyForecast[];
}
