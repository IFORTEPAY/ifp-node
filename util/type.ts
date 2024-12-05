/** STORE GLOBAL TYPE */

export interface ApiConfigOptions {
  isProduction?: boolean;
  isDebugLog?: boolean;
  merchantId: string;
  secretUnboundId: string;
  hashKey: string;
}

export interface ApiClientOptions {
  path: string;
  headers?: object | null;
  params?: string | null;
  body?: object | null;
}

export interface ApiResponse<T> {
  response_code: string;
  response_message: string;
  data?: T | null;
  error?: string;
}
