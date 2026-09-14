import { ENV } from '../../config/env';

export async function httpClient<T>(_endpoint: string, _options?: RequestInit): Promise<T> {
  console.log('HttpClient initialized with base URL:', ENV.API_BASE_URL);
  throw new Error('HttpClient method not implemented yet.');
}
