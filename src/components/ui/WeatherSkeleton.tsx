import type { FC } from 'react';

/**
 * Skeleton loading component matching the main weather layout structure.
 * Features enhanced contrast tones (surface-container-highest / surface-container-high)
 * for clear visual feedback during data loading.
 */
export const WeatherSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse w-full">
      {/* Hero Card Skeleton */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-surface-container-highest rounded-lg"></div>
            <div className="h-4 w-36 bg-surface-container-high rounded-md"></div>
          </div>
          <div className="h-7 w-32 bg-surface-container-highest rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-5">
            <div className="h-16 w-24 bg-surface-container-highest rounded-xl"></div>
            <div className="flex flex-col gap-2">
              <div className="h-6 w-36 bg-surface-container-highest rounded-md"></div>
              <div className="h-4 w-44 bg-surface-container-high rounded-md"></div>
            </div>
          </div>
          <div className="h-8 w-40 bg-surface-container-highest rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="h-20 bg-surface-container-high rounded-xl p-4"></div>
          <div className="h-20 bg-surface-container-high rounded-xl p-4"></div>
          <div className="h-20 bg-surface-container-high rounded-xl p-4"></div>
        </div>
      </section>

      {/* Cities Grid Skeleton */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-surface-container-highest rounded-md"></div>
          <div className="h-4 w-32 bg-surface-container-high rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-surface-container-lowest rounded-xl border border-surface-container-high p-4 flex items-center justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-surface-container-highest rounded-md"></div>
                <div className="h-3 w-20 bg-surface-container-high rounded-md"></div>
              </div>
              <div className="h-6 w-12 bg-surface-container-highest rounded-md"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 7-Day Forecast List Skeleton */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-container-low flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-64 bg-surface-container-highest rounded-md"></div>
          <div className="h-4 w-28 bg-surface-container-high rounded-md"></div>
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-12 bg-surface-container-high/80 rounded-lg"></div>
          ))}
        </div>
      </section>
    </div>
  );
};
