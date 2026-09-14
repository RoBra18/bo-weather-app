import type { FC, ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
}

/**
 * Contenedor principal con márgenes y ancho limitado.
 */
export const Container: FC<ContainerProps> = ({ children }) => {
  return <main>{children}</main>;
};
