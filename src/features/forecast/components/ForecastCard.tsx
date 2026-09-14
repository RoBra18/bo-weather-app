import type { FC } from 'react';
import type { DailyForecast } from '../../../types/weather';
import { formatDayLabel, formatTemp, getWeatherIconMeta } from '../../../utils/weatherIconMapper';

export interface ForecastCardProps {
  dayItem: DailyForecast;
  index: number;
  overallMin: number;
  overallMax: number;
  unit: 'C' | 'F';
}

/**
 * Reusable component for rendering an individual day forecast item row.
 */
export const ForecastCard: FC<ForecastCardProps> = ({
  dayItem,
  index,
  overallMin,
  overallMax,
  unit,
}) => {
  const dayInfo = formatDayLabel(dayItem.date, index);
  const iconMeta = getWeatherIconMeta(dayItem.weatherCode);

  const displayMin = formatTemp(dayItem.minTemp, unit);
  const displayMax = formatTemp(dayItem.maxTemp, unit);

  // Dynamic temperature bar range calculation
  const tempRange = overallMax - overallMin || 1;
  const leftPct = Math.max(5, Math.min(80, Math.round(((dayItem.minTemp - overallMin) / tempRange) * 60)));
  const widthPct = Math.max(
    20,
    Math.min(100 - leftPct, Math.round(((dayItem.maxTemp - dayItem.minTemp) / tempRange) * 80))
  );

  const precipProbability = dayItem.precipitationProbability ?? 0;
  const isHighRain = precipProbability >= 50;

  return (
    <div className="py-3.5 flex items-center justify-between gap-4">
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
};
