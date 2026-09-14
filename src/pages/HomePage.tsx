import { useMemo, useState, type FC } from 'react';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { CitySearch } from '../features/cities/components/CitySearch';
import { ForecastList } from '../features/forecast/components/ForecastList';
import { useBoliviaForecast } from '../features/forecast/hooks/useForecast';
import { CurrentWeatherCard } from '../features/weather/components/CurrentWeatherCard';

/**
 * Main HomePage component rendering the weather dashboard layout.
 */
export const HomePage: FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('cochabamba');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Fetch forecast data for Bolivia's 9 capital cities
  const { data } = useBoliviaForecast();

  // Find forecast data for the currently selected city
  const selectedForecast = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((item) => item.city.id === selectedCityId) || data[0];
  }, [data, selectedCityId]);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header bar with unit selector */}
      <Header unit={unit} onUnitChange={setUnit} />

      {/* Main page content container */}
      <main className="w-full pt-16 flex-1 bg-surface">
        <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin py-8 md:py-12 flex flex-col gap-10">
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
        </div>
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
};
