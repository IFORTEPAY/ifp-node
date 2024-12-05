import { ApiConfigOptions } from "../util/type";

export class ApiConfig {
  isProduction: boolean;
  isDebugLog: boolean;
  merchantId: string;
  secretUnboundId: string;
  hashKey: string;

  constructor(options: ApiConfigOptions) {
    this.isProduction = false;
    this.isDebugLog = false;
    this.merchantId = "";
    this.secretUnboundId = "";
    this.hashKey = "";

    this.set(options);
  }

  private set(options: ApiConfigOptions) {
    if (options.isProduction) {
      this.isProduction = options.isProduction;
    }

    if (options.isDebugLog) {
      this.isDebugLog = options.isDebugLog;
    }

    this.merchantId = options.merchantId;
    this.secretUnboundId = options.secretUnboundId;
    this.hashKey = options.hashKey;
  }
}
