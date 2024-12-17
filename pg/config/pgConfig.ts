import {DEFAULT_CLIENT_TIMEOUT} from "../util/constant";
import {PGConfigOptions} from "../util/type";

export class PGConfig {
	isProduction: boolean;
	isDebugLog: boolean;
	merchantId: string;
	secretUnboundId: string;
	hashKey: string;
	subMerchantId?: string;
	timeout: number;

	constructor(options: PGConfigOptions) {
		this.isProduction = false;
		this.isDebugLog = false;
		this.merchantId = "";
		this.secretUnboundId = "";
		this.hashKey = "";
		this.timeout = DEFAULT_CLIENT_TIMEOUT;

		this.set(options);
	}

	private set(options: PGConfigOptions) {
		if (options.isProduction) {
			this.isProduction = options.isProduction;
		}

		if (options.isDebugLog) {
			this.isDebugLog = options.isDebugLog;
		}

		if (options.timeout && options.timeout > 0) {
			this.timeout = options.timeout;
		}

		if (options.subMerchantId) {
			this.subMerchantId = options.subMerchantId;
		}

		this.merchantId = options?.merchantId;
		this.secretUnboundId = options?.secretUnboundId;
		this.hashKey = options?.hashKey;
	}
}
