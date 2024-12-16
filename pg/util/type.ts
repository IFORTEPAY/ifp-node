/** STORE GLOBAL TYPE */

export interface PGConfigOptions {
	isProduction?: boolean;
	isDebugLog?: boolean;
	merchantId: string;
	secretUnboundId: string;
	hashKey: string;
	subMerchantId?: string;
	timeout?: number;
}

export interface PGClientOptions {
	path: string;
	headers?: object | null;
	params?: string | null;
	body?: object | null;
}

export interface PGClientResponse<T> {
	response_code: string;
	response_message: string;
	data?: T | null;
	error?: string;
}

export interface PGResponse<T> {
	responseCode: string;
	responseMessage: string;
	data?: T | null;
	error?: string;
}

export interface PGHeaders {
	"Content-Type": string;
	"Authorization": string;
	"x-req-signature": string;
	"x-version": string;
	"sub-merchant-id"?: string;
}
