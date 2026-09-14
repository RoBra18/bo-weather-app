import { BOLIVIA_CAPITAL_CITIES } from '../../config/cities';
import type { City } from '../../types/city';
import type { CityWeatherForecast } from '../../types/forecast';
import type { DailyForecast } from '../../types/weather';
import { httpClient } from './httpClient';
import { mapWmoCodeToCondition } from './weatherCodeMapper';

/**
 * Estructuras internas de respuesta cruda de la API de Open-Meteo.
 */
interface OpenMeteoCurrentData {
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
}

interface OpenMeteoDailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max?: number[];
  wind_speed_10m_max?: number[];
}

interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  current?: OpenMeteoCurrentData;
  daily?: OpenMeteoDailyData;
}

/**
 * Transforma la respuesta cruda de Open-Meteo en el modelo de dominio de la aplicación.
 */
function transformOpenMeteoResponse(city: City, raw: OpenMeteoForecastResponse): CityWeatherForecast {
  if (!raw || !raw.daily || !Array.isArray(raw.daily.time)) {
    throw new Error(`Estructura de respuesta inválida de Open-Meteo para la ciudad: ${city.name}`);
  }

  const {
    time,
    weather_code,
    temperature_2m_max,
    temperature_2m_min,
    precipitation_probability_max,
    wind_speed_10m_max,
  } = raw.daily;

  const currentHumidity = Math.round(raw.current?.relative_humidity_2m ?? 50);
  const currentWindSpeed = Math.round(raw.current?.wind_speed_10m ?? wind_speed_10m_max?.[0] ?? 12);

  const forecast: DailyForecast[] = time.map((date, index) => {
    const code = weather_code?.[index] ?? 0;
    const precipProb = precipitation_probability_max?.[index] ?? 0;
    const dayWind = wind_speed_10m_max?.[index] ?? currentWindSpeed;

    return {
      date,
      maxTemp: temperature_2m_max?.[index] ?? 0,
      minTemp: temperature_2m_min?.[index] ?? 0,
      weatherCode: code,
      weatherCondition: mapWmoCodeToCondition(code),
      humidity: currentHumidity,
      windSpeed: Math.round(dayWind),
      precipitationProbability: Math.round(precipProb),
    };
  });

  return {
    city,
    currentHumidity,
    currentWindSpeed,
    forecast,
  };
}

/**
 * Obtiene el pronóstico de los próximos 7 días para una lista de ciudades.
 * Utiliza el soporte nativo de múltiples coordenadas de Open-Meteo e incluye humedad, viento y precipitación.
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
        current: ['relative_humidity_2m', 'wind_speed_10m'],
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_probability_max',
          'wind_speed_10m_max',
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
 * Obtiene el pronóstico de 7 días para las 9 ciudades capitales de Bolivia en una sola petición.
 */
export async function getBoliviaCapitalsForecast(): Promise<CityWeatherForecast[]> {
  return getForecastForCities(BOLIVIA_CAPITAL_CITIES);
}

/**
 * Obtiene el pronóstico de 7 días para una ciudad individual.
 */
export async function getForecastByCity(city: City): Promise<CityWeatherForecast> {
  const results = await getForecastForCities([city]);
  if (!results || results.length === 0) {
    throw new Error(`No se pudo obtener el pronóstico para la ciudad ${city.name}`);
  }
  return results[0];
}
