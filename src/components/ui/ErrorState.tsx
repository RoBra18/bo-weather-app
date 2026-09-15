import type { FC } from 'react';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * User-friendly Error State component displayed when an API or network request fails.
 * Includes a Retry button to allow recovering without leaving the UI frozen.
 */
export const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <section className="w-full bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-sm border border-error/20 flex flex-col items-center text-center gap-5 my-6">
      <div className="w-16 h-16 rounded-full bg-error-container/40 flex items-center justify-center text-error flex-shrink-0">
        <span className="material-symbols-outlined text-[36px]">cloud_off</span>
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
          No pudimos obtener el clima
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span>Reintentar</span>
        </button>
      )}
    </section>
  );
};
