import type { FC, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Componente UI contenedor de Tarjeta.
 */
export const Card: FC<CardProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};
