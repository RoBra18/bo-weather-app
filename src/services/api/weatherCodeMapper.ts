import type { WeatherCondition } from '../../types/weather';

/**
 * Mapea los códigos de clima WMO de Open-Meteo a condiciones meteorológicas legibles.
 */
export function mapWmoCodeToCondition(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return { code, main: 'Despejado', description: 'Cielo despejado', icon: '01d' };
    case 1:
      return { code, main: 'Mayormente despejado', description: 'Principalmente despejado', icon: '02d' };
    case 2:
      return { code, main: 'Parcialmente nublado', description: 'Parcialmente nublado', icon: '03d' };
    case 3:
      return { code, main: 'Nublado', description: 'Cielo cubierto / nublado', icon: '04d' };
    case 45:
    case 48:
      return { code, main: 'Niebla', description: 'Niebla y escarcha depositada', icon: '50d' };
    case 51:
    case 53:
    case 55:
      return { code, main: 'Llovizna', description: 'Llovizna ligera a moderada', icon: '09d' };
    case 56:
    case 57:
      return { code, main: 'Llovizna helada', description: 'Llovizna helada', icon: '09d' };
    case 61:
    case 63:
    case 65:
      return { code, main: 'Lluvia', description: 'Lluvia de intensidad variable', icon: '10d' };
    case 66:
    case 67:
      return { code, main: 'Lluvia helada', description: 'Lluvia helada', icon: '10d' };
    case 71:
    case 73:
    case 75:
      return { code, main: 'Nieve', description: 'Caída de nieve de diversa intensidad', icon: '13d' };
    case 77:
      return { code, main: 'Granizo ligero', description: 'Granizo pequeño o cinarra', icon: '13d' };
    case 80:
    case 81:
    case 82:
      return { code, main: 'Chubascos', description: 'Chubascos de lluvia', icon: '09d' };
    case 85:
    case 86:
      return { code, main: 'Chubascos de nieve', description: 'Chubascos de nieve', icon: '13d' };
    case 95:
      return { code, main: 'Tormenta', description: 'Tormenta eléctrica', icon: '11d' };
    case 96:
    case 99:
      return { code, main: 'Tormenta con granizo', description: 'Tormenta eléctrica con granizo', icon: '11d' };
    default:
      return { code, main: 'Desconocido', description: 'Condición meteorológica no clasificada', icon: '01d' };
  }
}
