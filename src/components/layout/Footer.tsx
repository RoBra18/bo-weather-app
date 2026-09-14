import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-surface-container-low/70 py-space-xl">
      <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-on-surface-variant text-body-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-on-surface">Bolivia Weather Forecast</span>
          <span>•</span>
          <span>Datos meteorológicos abiertos</span>
        </div>
        <span className="text-label-caps text-[12px]">
          &copy; {new Date().getFullYear()} Estado Plurinacional de Bolivia
        </span>
      </div>
    </footer>
  );
};
