import type { FC } from 'react';

export interface HeaderProps {
  unit: 'C' | 'F';
  onUnitChange: (unit: 'C' | 'F') => void;
}

export const Header: FC<HeaderProps> = ({ unit, onUnitChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1140px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-primary-container text-on-primary">
            <span className="material-symbols-outlined text-[26px]">partly_cloudy_day</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-md text-[18px] md:text-headline-md text-on-surface tracking-tight truncate font-bold">
              Bolivia Weather
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Pronóstico de 7 días
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="inline-flex items-center p-0.5 rounded-lg bg-surface-container-low">
            <button
              type="button"
              onClick={() => onUnitChange('C')}
              aria-pressed={unit === 'C'}
              className={`px-2.5 py-1 rounded font-label-caps text-label-caps font-semibold cursor-pointer transition-colors ${
                unit === 'C'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => onUnitChange('F')}
              aria-pressed={unit === 'F'}
              className={`px-2.5 py-1 rounded font-label-caps text-label-caps font-semibold cursor-pointer transition-colors ${
                unit === 'F'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
