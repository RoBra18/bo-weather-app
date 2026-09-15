/**
 * Utility to map raw technical/API error messages into short, user-friendly messages.
 */
export function mapUserFriendlyErrorMessage(error: string | Error | null | undefined): string {
  if (!error) {
    return 'Ha ocurrido un problema inesperado al cargar la información del clima.';
  }

  const rawMessage = typeof error === 'string' ? error : error.message || '';
  const normalized = rawMessage.toLowerCase();

  if (
    normalized.includes('failed to fetch') ||
    normalized.includes('networkerror') ||
    normalized.includes('network error') ||
    normalized.includes('offline') ||
    normalized.includes('connection')
  ) {
    return 'No pudimos conectar con el servicio meteorológico. Por favor, verifica tu conexión a internet e inténtalo de nuevo.';
  }

  if (normalized.includes('500') || normalized.includes('502') || normalized.includes('503') || normalized.includes('server')) {
    return 'El servidor del clima no está disponible en este momento. Por favor, reinténtalo más tarde.';
  }

  if (normalized.includes('404') || normalized.includes('not found')) {
    return 'No se encontró la información del clima solicitada.';
  }

  if (normalized.includes('inválid') || normalized.includes('invalid') || normalized.includes('incomplet')) {
    return 'Recibimos una respuesta incompleta sobre el clima. Por favor, intenta de nuevo.';
  }

  return 'No se pudo obtener el pronóstico del clima. Por favor, reinténtalo.';
}
