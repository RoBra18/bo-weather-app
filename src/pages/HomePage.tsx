import { useMemo, useState, type FC } from 'react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { WeatherSkeleton } from '../components/ui/WeatherSkeleton';
import { CitySearch } from '../features/cities/components/CitySearch';
import { ForecastList } from '../features/forecast/components/ForecastList';
import { useBoliviaForecast } from '../features/forecast/hooks/useForecast';
import { CurrentWeatherCard } from '../features/weather/components/CurrentWeatherCard';
import { mapUserFriendlyErrorMessage } from '../utils/errorMessageMapper';

/**
 * Main HomePage component rendering the weather dashboard layout with comprehensive
 * error handling, skeleton loading, empty state, and retry action.
 */
export const HomePage: FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('cochabamba');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Consume forecast data from Open-Meteo with loading, error, and refetch handler
  const { data, loading, error, refetch } = useBoliviaForecast();

  // Selected city forecast calculation
  const selectedForecast = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((item) => item.city.id === selectedCityId) || data[0];
  }, [data, selectedCityId]);

  const userFriendlyErrorMsg = mapUserFriendlyErrorMessage(error);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header bar with unit selector */}
      <Header unit={unit} onUnitChange={setUnit} />

      {/* Main page content container */}
      <main className="w-full pt-16 flex-1 bg-surface">
        <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin py-8 md:py-12 flex flex-col gap-10">
          
          {/* Subtle error banner when refetching fails while previous data is visible */}
          {error && data && data.length > 0 && (
            <div className="w-full bg-error-container/30 border border-error/30 rounded-xl p-4 flex items-center justify-between gap-4 text-on-surface">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-[22px]">warning</span>
                <span className="font-body-sm text-body-sm">{userFriendlyErrorMsg}</span>
              </div>
              <button
                type="button"
                onClick={refetch}
                className="px-3 py-1.5 rounded-lg bg-error text-on-error font-title-sm text-label-caps font-semibold cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Conditional rendering based on data state */}
          {loading && (!data || data.length === 0) ? (
            <WeatherSkeleton />
          ) : error && (!data || data.length === 0) ? (
            <ErrorState message={userFriendlyErrorMsg} onRetry={refetch} />
          ) : !data || data.length === 0 ? (
            <EmptyState onRetry={refetch} />
          ) : (
            <>
              {/* Hero card showing selected city current weather */}
              <CurrentWeatherCard cityForecast={selectedForecast} unit={unit} />

              {/* Departmental capitals selector grid */}
              <CitySearch
                allForecasts={data}
                selectedCityId={selectedCityId}
                onSelectCity={setSelectedCityId}
                unit={unit}
              />

              {/* 7-day extended forecast list */}
              <ForecastList cityForecast={selectedForecast} unit={unit} />
            </>
          )}
        </div>
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
};
