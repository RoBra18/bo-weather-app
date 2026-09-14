/**
 * Condición meteorológica legible mapeada desde el código WMO de Open-Meteo.
 */
export interface WeatherCondition {
  code: number;
  main: string;
  description: string;
  icon?: string;
}

/**
 * Datos observados del clima actual en tiempo real provenientes de Open-Meteo.
 */
export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherCondition: WeatherCondition;
  time?: string;
}

/**
 * Representación a nivel de aplicación del pronóstico diario para 7 días.
 */
export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherCondition: WeatherCondition;
  precipitationProbability: number;
}
