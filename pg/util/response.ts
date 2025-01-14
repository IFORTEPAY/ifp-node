import {PGClientResponse, PGResponse} from "./type";

export class PGResponseConstructor<T, U> {
	response: PGResponse<U>;
	responseClient: PGClientResponse<T>;

	constructor(resClient: PGClientResponse<T>) {
		this.set(resClient);
	}

	private set(resClient: PGClientResponse<T>) {
		if (!resClient || typeof resClient !== "object") {
			const internalError = sendSystemError<T>(
				Error("invalid response client")
			);
			this.responseClient = internalError;
			return this;
		}

		this.responseClient = resClient;
		this.response = {
			responseCode: resClient.response_code,
			responseMessage: resClient.response_message,
		};
		return this;
	}

	getError() {
		if (this.responseClient.error) {
			this.response.error = this.responseClient.error;
		}

		return this;
	}

	build(): PGResponse<U> {
		return this.response;
	}
}

export function sendSystemError<T>(err: Error): PGClientResponse<T> {
	return {
		response_code: "98",
		response_message: "SystemError",
		error: err.message,
	};
}
