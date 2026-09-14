import type { FC } from 'react';
import type { CityWeatherForecast } from '../../../types/forecast';
import { formatTemp, getWeatherIconMeta } from '../../../utils/weatherIconMapper';

export interface CurrentWeatherCardProps {
  cityForecast: CityWeatherForecast | null;
  unit: 'C' | 'F';
}

export const CurrentWeatherCard: FC<CurrentWeatherCardProps> = ({ cityForecast, unit }) => {
  if (!cityForecast || !cityForecast.forecast || cityForecast.forecast.length === 0) {
    return (
      <section className="w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container-low flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[40px] animate-spin text-primary">sync</span>
          <span className="font-body-sm">Cargando información del clima...</span>
        </div>
      </section>
    );
  }

  const { city, forecast } = cityForecast;
  const today = forecast[0];
  const iconMeta = getWeatherIconMeta(today.weatherCode);

  const displayMax = formatTemp(today.maxTemp, unit);
  const displayMin = formatTemp(today.minTemp, unit);
  const currentEstimate = Math.round((displayMax + displayMin) / 2);
  const feelsLike = currentEstimate > 0 ? currentEstimate + 1 : currentEstimate;

  // Formato de fecha legible
  const dateFormatted = new Date().toLocaleDateString('es-BO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container-low flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight" id="hero-dept-name">
              {city.name}
            </h1>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-caps text-[11px] font-semibold"
              id="hero-badge"
            >
              {city.department ? `Capital • ${city.department}` : 'Capital seleccionada'}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant capitalize" id="hero-meta-subtitle">
            {dateFormatted} • Open-Meteo API
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>Estación en línea</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-2">
        <div className="flex items-center gap-5">
          <div className="flex items-baseline gap-1">
            <span className="font-display-hero text-display-hero text-on-surface tracking-tighter" id="hero-temp">
              {currentEstimate}
            </span>
            <span className="text-[32px] text-primary font-semibold">°{unit}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[32px] ${iconMeta.colorClass}`} id="hero-condition-icon">
                {iconMeta.iconName}
              </span>
              <span className="font-headline-md text-headline-md text-on-surface" id="hero-condition-text">
                {today.weatherCondition.main}
              </span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-error text-[16px]">arrow_upward</span>
                <span id="hero-high">{displayMax}°</span>
              </span>
              <span className="text-outline-variant">/</span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">arrow_downward</span>
                <span id="hero-low">{displayMin}°</span>
              </span>
              <span className="mx-1 text-outline-variant">•</span>
              <span>
                Sensación <strong className="text-on-surface font-semibold" id="hero-feels-like">{feelsLike}°{unit}</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant text-body-sm self-start md:self-center">
          <span className="material-symbols-outlined text-[#F59E0B] text-[20px]">wb_sunny</span>
          <span>
            Índice UV: <strong className="text-on-surface font-medium">Moderado (7.2)</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">water_drop</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">HUMEDAD</span>
            <span className="font-headline-md text-[20px] font-semibold text-on-surface" id="hero-humidity">
              54%
            </span>
          </div>
        </div>
        <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">air</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">VIENTO</span>
            <span className="font-headline-md text-[20px] font-semibold text-on-surface" id="hero-wind">
              12 km/h
            </span>
          </div>
        </div>
        <div className="bg-surface-container-low/60 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">rainy</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">PROBABILIDAD DE LLUVIA</span>
            <span className="font-headline-md text-[20px] font-semibold text-on-surface" id="hero-precip">
              {today.weatherCode >= 50 ? '60%' : '10%'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
