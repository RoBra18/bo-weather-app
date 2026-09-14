import type { FC } from 'react';
import type { CityWeatherForecast } from '../../../types/forecast';
import { ForecastCard } from './ForecastCard';

export interface ForecastListProps {
  cityForecast: CityWeatherForecast | null;
  unit: 'C' | 'F';
}

/**
 * Renders the 7-day extended forecast list using the reusable ForecastCard component.
 */
export const ForecastList: FC<ForecastListProps> = ({ cityForecast, unit }) => {
  if (!cityForecast || !cityForecast.forecast || cityForecast.forecast.length === 0) {
    return null;
  }

  const { city, forecast } = cityForecast;

  // Temperature extrema calculations for range bar visualization
  const overallMin = Math.min(...forecast.map((d) => d.minTemp));
  const overallMax = Math.max(...forecast.map((d) => d.maxTemp));

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
        {forecast.map((dayItem, index) => (
          <ForecastCard
            key={dayItem.date}
            dayItem={dayItem}
            index={index}
            overallMin={overallMin}
            overallMax={overallMax}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
};
