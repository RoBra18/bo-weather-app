import { useMemo, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CitySearch } from './features/cities/components/CitySearch';
import { ForecastList } from './features/forecast/components/ForecastList';
import { useBoliviaForecast } from './features/forecast/hooks/useForecast';
import { CurrentWeatherCard } from './features/weather/components/CurrentWeatherCard';

export function App() {
  const [selectedCityId, setSelectedCityId] = useState<string>('cochabamba');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // Consume el servicio existente a través del custom hook del dominio
  const { data } = useBoliviaForecast();

  // Obtiene el pronóstico de la ciudad seleccionada
  const selectedForecast = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((item) => item.city.id === selectedCityId) || data[0];
  }, [data, selectedCityId]);

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Header unit={unit} onUnitChange={setUnit} />

      <main className="w-full pt-16 flex-1 bg-surface">
        <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin py-8 md:py-12 flex flex-col gap-10">
          {/* Tarjeta del clima actual de la ciudad seleccionada */}
          <CurrentWeatherCard cityForecast={selectedForecast} unit={unit} />

          {/* Selector e información de las 9 ciudades capitales */}
          <CitySearch
            allForecasts={data}
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
            unit={unit}
          />

          {/* Lista del pronóstico de 7 días */}
          <ForecastList cityForecast={selectedForecast} unit={unit} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
