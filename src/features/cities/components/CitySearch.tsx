import type { FC } from 'react';

export interface CitySearchProps {
  onSelectCity?: (cityName: string) => void;
}

/**
 * Componente para el buscador de ciudades.
 */
export const CitySearch: FC<CitySearchProps> = () => {
  return (
    <div>
      {/* Componente base sin implementar lógica visual aún */}
      <p>Buscador de ciudades (placeholder)</p>
    </div>
  );
};
