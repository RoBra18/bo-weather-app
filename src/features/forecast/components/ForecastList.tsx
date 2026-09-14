import type { FC } from 'react';
import type { CityWeatherForecast } from '../../../types/forecast';
import { formatDayLabel, formatTemp, getWeatherIconMeta } from '../../../utils/weatherIconMapper';

export interface ForecastListProps {
  cityForecast: CityWeatherForecast | null;
  unit: 'C' | 'F';
}

/**
 * Muestra la lista del pronóstico extendido de 7 días para la ciudad seleccionada.
 */
export const ForecastList: FC<ForecastListProps> = ({ cityForecast, unit }) => {
  if (!cityForecast || !cityForecast.forecast || cityForecast.forecast.length === 0) {
    return null;
  }

  const { city, forecast } = cityForecast;

  // Cálculo para las barras dinámicas de temperatura
  const overallMin = Math.min(...forecast.map((d) => d.minTemp));
  const overallMax = Math.max(...forecast.map((d) => d.maxTemp));
  const tempRange = overallMax - overallMin || 1;

  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container-low flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="font-headline-md text-[18px] md:text-headline-md text-on-surface font-semibold">
          Pronóstico para los próximos 7 días
        </h2>
        <span className="font-body-sm text-body-sm text-on-surface-variant" id="forecast-target-city">
          {city.name}
        </span>
      </div>

      <div className="flex flex-col divide-y divide-surface-container-low">
        {forecast.map((dayItem, index) => {
          const dayInfo = formatDayLabel(dayItem.date, index);
          const iconMeta = getWeatherIconMeta(dayItem.weatherCode);

          const displayMin = formatTemp(dayItem.minTemp, unit);
          const displayMax = formatTemp(dayItem.maxTemp, unit);

          // Posicionamiento de la barra de rango de temperatura
          const leftPct = Math.max(5, Math.min(80, Math.round(((dayItem.minTemp - overallMin) / tempRange) * 60)));
          const widthPct = Math.max(20, Math.min(100 - leftPct, Math.round(((dayItem.maxTemp - dayItem.minTemp) / tempRange) * 80)));

          const precipProbability = dayItem.precipitationProbability ?? 0;
          const isHighRain = precipProbability >= 50;

          return (
            <div key={dayItem.date} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-36 sm:w-44 flex-shrink-0">
                <span
                  className={`font-title-sm text-title-sm w-16 ${
                    dayInfo.isToday ? 'text-primary font-bold' : 'text-on-surface'
                  }`}
                >
                  {dayInfo.label}
                </span>
                <span className={`material-symbols-outlined text-[20px] ${iconMeta.colorClass}`}>
                  {iconMeta.iconName}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface hidden md:inline truncate">
                  {dayItem.weatherCondition.description}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-sm">
                <span className="font-metric-tabular text-metric-tabular text-on-surface-variant w-8 text-right">
                  {displayMin}°
                </span>
                <div className="flex-1 bg-surface-container-low rounded-full h-2 relative overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-primary to-[#F59E0B]"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  ></div>
                </div>
                <span className="font-metric-tabular text-metric-tabular text-on-surface font-semibold w-8 text-left">
                  {displayMax}°
                </span>
              </div>

              <div
                className={`flex items-center gap-1.5 font-metric-tabular text-body-sm w-20 justify-end flex-shrink-0 ${
                  isHighRain ? 'text-primary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-primary">
                  {isHighRain ? 'thunderstorm' : 'rainy'}
                </span>
                <span>{precipProbability}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
