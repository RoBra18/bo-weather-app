import type { FC } from 'react';

/**
 * Pie de página principal del Layout.
 */
export const Footer: FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Weather App</p>
    </footer>
  );
};
