export interface WeatherCondition {
  code: number;
  main: string;
  description: string;
  icon?: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherCondition: WeatherCondition;
  time?: string;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  weatherCondition: WeatherCondition;
  precipitationProbability: number;
}
