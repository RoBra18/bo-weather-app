import type { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**
 * Componente UI reutilizable de Input de texto.
 */
export const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
};
