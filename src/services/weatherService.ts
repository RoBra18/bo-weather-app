import type { CurrentWeather } from '../types/weather';


export async function getCurrentWeatherByCity(_city: string): Promise<CurrentWeather> {
  // Pendiente de implementar lógica completa de llamada a API
  throw new Error('getCurrentWeatherByCity not implemented yet.');
}

export async function getCurrentWeatherByCoords(_lat: number, _lon: number): Promise<CurrentWeather> {
  // Pendiente de implementar lógica completa de llamada a API
  throw new Error('getCurrentWeatherByCoords not implemented yet.');
}
