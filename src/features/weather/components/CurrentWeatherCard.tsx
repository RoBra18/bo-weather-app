import type { FC } from 'react';
import type { CurrentWeather } from '../../../types/weather';

export interface CurrentWeatherCardProps {
  weather?: CurrentWeather | null;
}

/**
 * Componente visual para mostrar el clima actual de una ciudad.
 */
export const CurrentWeatherCard: FC<CurrentWeatherCardProps> = () => {
  return (
    <div>
      {/* Componente base sin implementar lógica visual aún */}
      <p>Clima actual (placeholder)</p>
    </div>
  );
};
