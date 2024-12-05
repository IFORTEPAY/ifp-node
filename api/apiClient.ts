import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiConfig } from "./apiConfig";
import { ApiClientOptions, ApiResponse } from "../util/type";
import { BASE_URL } from "../util/constant";
import { sendInternalServerError } from "../util/response";

export class ApiClient {
  private client: AxiosInstance;
  apiConfig: ApiConfig;
  apiClientOptions: ApiClientOptions;

  constructor(apiConfig: ApiConfig) {
    this.client = axios.create();
    this.apiConfig = apiConfig;
    this.apiClientOptions = { path: "" };
  }

  setOptionPath(path: string) {
    this.apiClientOptions.path = path;
  }

  setOptionHeaders(header: object) {
    this.apiClientOptions.headers = header;
  }

  setOptionParams(param: string) {
    this.apiClientOptions.params = param;
  }

  setOptionBody(body: object) {
    this.apiClientOptions.body = body;
  }

  async post<T>(): Promise<ApiResponse<T>> {
    try {
      const url = this.getFullUrl();
      const options: AxiosRequestConfig = {
        timeout: 10000,
      };
      if (this.apiClientOptions.headers) {
        options.headers = this.apiClientOptions.headers;
      }
      const body = this.apiClientOptions.body ?? {};
      console.log(url);
      console.log(options);
      console.log(body);
      const response = await this.client.post(url, body, options);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        return err.response.data;
      }
      return sendInternalServerError<T>(err as Error);
    }
  }

  private getFullUrl = (): string => {
    const base = this.apiConfig.isProduction ? BASE_URL.PROD : BASE_URL.STAGE;
    const url = base + this.apiClientOptions.path;
    return url;
  };
}
