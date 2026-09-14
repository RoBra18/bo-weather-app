import { BOLIVIA_CAPITAL_CITIES } from '../../config/cities';
import type { City } from '../../types/city';
import type { CityWeatherForecast } from '../../types/forecast';
import type { CurrentWeather, DailyForecast } from '../../types/weather';
import { httpClient } from './httpClient';
import { mapWmoCodeToCondition } from './weatherCodeMapper';

/**
 * Estructuras internas de respuesta cruda de la API de Open-Meteo.
 */
interface OpenMeteoCurrentData {
  time?: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

interface OpenMeteoDailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max?: number[];
}

interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  current?: OpenMeteoCurrentData;
  daily?: OpenMeteoDailyData;
}

/**
 * Transforma la respuesta cruda de Open-Meteo en el modelo de dominio de la aplicación.
 * Mantiene la separación lógica entre el clima actual real y el pronóstico diario.
 */
function transformOpenMeteoResponse(city: City, raw: OpenMeteoForecastResponse): CityWeatherForecast {
  if (!raw || !raw.current || !raw.daily || !Array.isArray(raw.daily.time)) {
    throw new Error(`Estructura de respuesta inválida de Open-Meteo para la ciudad: ${city.name}`);
  }

  const { current, daily } = raw;
  const currentCode = current.weather_code ?? 0;

  const currentWeather: CurrentWeather = {
    temp: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: currentCode,
    weatherCondition: mapWmoCodeToCondition(currentCode),
    time: current.time,
  };

  const forecast: DailyForecast[] = daily.time.map((date, index) => {
    const code = daily.weather_code?.[index] ?? 0;
    const precipProb = daily.precipitation_probability_max?.[index] ?? 0;

    return {
      date,
      maxTemp: daily.temperature_2m_max?.[index] ?? 0,
      minTemp: daily.temperature_2m_min?.[index] ?? 0,
      weatherCode: code,
      weatherCondition: mapWmoCodeToCondition(code),
      precipitationProbability: Math.round(precipProb),
    };
  });

  return {
    city,
    current: currentWeather,
    forecast,
  };
}

/**
 * Obtiene el clima actual real y el pronóstico de los próximos 7 días para una lista de ciudades.
 * Utiliza los parámetros actuales (current) y diarios (daily) de Open-Meteo en una única consulta batch.
 */
export async function getForecastForCities(cities: City[]): Promise<CityWeatherForecast[]> {
  if (!cities || cities.length === 0) {
    return [];
  }

  const latitudes = cities.map((c) => c.lat);
  const longitudes = cities.map((c) => c.lon);

  const rawResponses = await httpClient<OpenMeteoForecastResponse[] | OpenMeteoForecastResponse>(
    '/forecast',
    {
      params: {
        latitude: latitudes,
        longitude: longitudes,
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'wind_speed_10m',
          'weather_code',
        ],
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_probability_max',
        ],
        timezone: 'auto',
        forecast_days: 7,
      },
    }
  );

  const responseArray = Array.isArray(rawResponses) ? rawResponses : [rawResponses];

  if (responseArray.length !== cities.length) {
    console.warn(
      `Open-Meteo retornó ${responseArray.length} resultados para ${cities.length} ciudades solicitadas.`
    );
  }

  return cities.map((city, index) => {
    const rawData = responseArray[index];
    return transformOpenMeteoResponse(city, rawData);
  });
}

/**
 * Obtiene el clima actual y el pronóstico de 7 días para las 9 ciudades capitales de Bolivia.
 */
export async function getBoliviaCapitalsForecast(): Promise<CityWeatherForecast[]> {
  return getForecastForCities(BOLIVIA_CAPITAL_CITIES);
}

/**
 * Obtiene el clima actual y pronóstico para una ciudad individual.
 */
export async function getForecastByCity(city: City): Promise<CityWeatherForecast> {
  const results = await getForecastForCities([city]);
  if (!results || results.length === 0) {
    throw new Error(`No se pudo obtener el clima para la ciudad ${city.name}`);
  }
  return results[0];
}
