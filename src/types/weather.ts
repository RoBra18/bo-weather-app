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
 * Representación a nivel de aplicación del pronóstico diario de 7 días.
 */
export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherCondition: WeatherCondition;
}
