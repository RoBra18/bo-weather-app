import type { FC } from 'react';
import type { CityWeatherForecast } from '../../../types/forecast';
import { formatTemp, getWeatherIconMeta } from '../../../utils/weatherIconMapper';

export interface CitySearchProps {
  allForecasts: CityWeatherForecast[];
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  unit: 'C' | 'F';
}

/**
 * Grilla interactiva de las 9 ciudades capitales de Bolivia.
 */
export const CitySearch: FC<CitySearchProps> = ({
  allForecasts,
  selectedCityId,
  onSelectCity,
  unit,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-[18px] md:text-headline-md text-on-surface font-semibold">
          Capitales Departamentales
        </h2>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Selecciona una ciudad
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" id="cities-grid">
        {allForecasts.map(({ city, current }) => {
          const isSelected = city.id === selectedCityId;

          const tempVal = current ? formatTemp(current.temp, unit) : '--';
          const iconMeta = current
            ? getWeatherIconMeta(current.weatherCode)
            : { iconName: 'cloud', colorClass: 'text-primary' };
          const conditionText = current ? current.weatherCondition.main : 'Sin datos';

          return (
            <button
              key={city.id}
              type="button"
              id={`card-${city.id}`}
              onClick={() => onSelectCity(city.id)}
              className={`city-selector-card text-left transition-all rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer group ${
                isSelected
                  ? 'bg-surface-container-lowest border-2 border-primary bg-primary-fixed/10 ring-2 ring-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-low'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-title-sm text-title-sm font-medium transition-colors ${
                      isSelected ? 'text-primary font-bold' : 'text-on-surface group-hover:text-primary'
                    }`}
                  >
                    {city.name}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {conditionText}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-metric-tabular text-on-surface text-[20px] font-bold">
                  {tempVal}°{unit}
                </span>
                <span className={`material-symbols-outlined text-[22px] ${iconMeta.colorClass}`}>
                  {iconMeta.iconName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
