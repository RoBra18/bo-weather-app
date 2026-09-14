/**
 * Tipos base para respuestas de API y estados de petición.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
