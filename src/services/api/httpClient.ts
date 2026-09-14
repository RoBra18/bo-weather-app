import { ENV } from '../../config/env';

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | (string | number)[]>;
}

/**
 * Cliente HTTP genérico y aislado para realizar peticiones a APIs externas.
 */
export async function httpClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  const baseUrl = ENV.OPEN_METEO_BASE_URL;

  let urlString = endpoint.startsWith('http')
    ? endpoint
    : `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  if (params) {
    const url = new URL(urlString);
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    urlString = url.toString();
  }

  try {
    const response = await fetch(urlString, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData?.reason) {
          errorMessage = errorData.reason;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // En caso de que el cuerpo de error no sea JSON válido
      }
      throw new Error(`Open-Meteo API Error: ${errorMessage}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ha ocurrido un error inesperado al conectar con el servicio de clima.');
  }
}
