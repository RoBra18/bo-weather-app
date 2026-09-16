import { useEffect, useState } from 'react';
import { getBoliviaCapitalsForecast, getForecastByCity } from '../../../services/api/weatherService';
import type { City } from '../../../types/city';
import type { CityWeatherForecast } from '../../../types/forecast';


export function useBoliviaForecast() {
  const [data, setData] = useState<CityWeatherForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async () => {
    setLoading(true);
    setError(null);
    try {
      const forecasts = await getBoliviaCapitalsForecast();
      setData(forecasts);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al obtener el pronóstico';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return { data, loading, error, refetch: fetchForecast };
}


export function useCityForecast(city: City | null) {
  const [forecast, setForecast] = useState<CityWeatherForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchForecast = async () => {
      try {
        const res = await getForecastByCity(city);
        if (isMounted) {
          setForecast(res);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Error al obtener el pronóstico';
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchForecast();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return { forecast, loading, error };
}
