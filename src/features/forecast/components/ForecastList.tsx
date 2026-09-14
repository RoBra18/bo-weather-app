import type { FC } from 'react';
import type { CityForecast } from '../../../types/forecast';

export interface ForecastListProps {
  forecast?: CityForecast | null;
}

/**
 * Componente visual para mostrar la lista de pronósticos meteorológicos.
 */
export const ForecastList: FC<ForecastListProps> = () => {
  return (
    <div>
      {/* Componente base sin implementar lógica visual aún */}
      <p>Pronóstico extendido (placeholder)</p>
    </div>
  );
};
