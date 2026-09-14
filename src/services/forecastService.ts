import type { CityWeatherForecast } from '../types/forecast';


export async function getForecastByCity(_city: string): Promise<CityWeatherForecast> {
  // Pendiente de implementar lógica completa de llamada a API
  throw new Error('getForecastByCity not implemented yet.');
}

export async function getForecastByCoords(_lat: number, _lon: number): Promise<CityWeatherForecast> {
  // Pendiente de implementar lógica completa de llamada a API
  throw new Error('getForecastByCoords not implemented yet.');
}
