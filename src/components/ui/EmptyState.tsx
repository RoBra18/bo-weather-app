import type { FC } from 'react';

export interface EmptyStateProps {
  onRetry?: () => void;
}

/**
 * Empty state component rendered when no weather data is available.
 */
export const EmptyState: FC<EmptyStateProps> = ({ onRetry }) => {
  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-sm border border-surface-container-low flex flex-col items-center text-center gap-5 my-6">
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant flex-shrink-0">
        <span className="material-symbols-outlined text-[36px]">device_thermostat</span>
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
          Sin información del clima
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          No hay datos meteorológicos disponibles en este momento. Por favor, intenta de nuevo.
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span>Actualizar</span>
        </button>
      )}
    </section>
  );
};
