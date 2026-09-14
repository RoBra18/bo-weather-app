/**
 * Tipos y modelos asociados al clima actual.
 */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  cityId: string | number;
  cityName: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  timestamp: number;
}
