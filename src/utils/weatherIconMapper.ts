export interface IconMeta {
  iconName: string;
  colorClass: string;
}

/**
 * Mapea un código de clima WMO a un nombre de icono de Material Symbols Outlined y una clase de color.
 */
export function getWeatherIconMeta(code: number): IconMeta {
  switch (code) {
    case 0:
    case 1:
      return { iconName: 'wb_sunny', colorClass: 'text-[#F59E0B]' };
    case 2:
      return { iconName: 'partly_cloudy_day', colorClass: 'text-primary' };
    case 3:
      return { iconName: 'cloud', colorClass: 'text-primary' };
    case 45:
    case 48:
      return { iconName: 'foggy', colorClass: 'text-secondary' };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { iconName: 'rainy', colorClass: 'text-primary' };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { iconName: 'ac_unit', colorClass: 'text-tertiary' };
    case 95:
    case 96:
    case 99:
      return { iconName: 'thunderstorm', colorClass: 'text-primary' };
    default:
      return { iconName: 'wb_sunny', colorClass: 'text-[#F59E0B]' };
  }
}

/**
 * Convierte grados Celsius a Fahrenheit según la unidad seleccionada.
 */
export function formatTemp(celsius: number, unit: 'C' | 'F' = 'C'): number {
  if (unit === 'F') {
    return Math.round(celsius * 1.8 + 32);
  }
  return Math.round(celsius);
}

/**
 * Formatea una fecha YYYY-MM-DD en formato corto como "Hoy 14" o "Mar 15".
 */
export function formatDayLabel(dateStr: string, index: number): { label: string; isToday: boolean } {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const dateObj = new Date(year, month, day);
  const dayNum = dateObj.getDate();

  if (index === 0) {
    return { label: `Hoy ${dayNum}`, isToday: true };
  }

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayName = days[dateObj.getDay()];
  return { label: `${dayName} ${dayNum}`, isToday: false };
}
