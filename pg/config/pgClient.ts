import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../util/constant";
import { sendInternalServerError } from "../util/response";
import { PGConfig } from "./pgConfig";
import { PGClientOptions, PGClientResponse } from "../util/type";

export class PGClient {
  private client: AxiosInstance;
  pgConfig: PGConfig;
  pgClientOptions: PGClientOptions;

  constructor(config: PGConfig) {
    this.client = axios.create();
    this.pgConfig = config;
    this.pgClientOptions = { path: "" };
  }

  setOptionPath(path: string) {
    this.pgClientOptions.path = path;
  }

  setOptionHeaders(header: object) {
    this.pgClientOptions.headers = header;
  }

  setOptionParams(param: string) {
    this.pgClientOptions.params = param;
  }

  setOptionBody(body: object) {
    this.pgClientOptions.body = body;
  }

  async post<T>(): Promise<PGClientResponse<T>> {
    try {
      const url = this.getFullUrl();
      const options: AxiosRequestConfig = {
        timeout: this.pgConfig.timeout,
      };
      if (this.pgClientOptions.headers) {
        options.headers = this.pgClientOptions.headers;
      }
      const body = this.pgClientOptions.body ?? {};
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
    const base = this.pgConfig.isProduction ? BASE_URL.PROD : BASE_URL.STAGE;
    const url = base + this.pgClientOptions.path;
    return url;
  };
}
