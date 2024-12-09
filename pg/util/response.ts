import {PGClientResponse, PGResponse} from "./type";

export class PGResponseConstructor<T> {
	response: PGResponse<T>;
	responseClient: PGClientResponse<T>;

	constructor(res: PGClientResponse<T>) {
		this.set(res);
	}

	private set(res: PGClientResponse<T>) {
		if (!res || typeof res !== "object") {
			const internalError = sendInternalServerError<T>(
				Error("invalid response client")
			);
			this.responseClient = internalError;
			return this;
		}

		this.responseClient = res;
		this.response = {
			responseCode: res.response_code,
			responseMessage: res.response_message,
		};
		return this;
	}

	getError() {
		if (this.responseClient.error) {
			this.response.error = this.responseClient.error;
		}

		return this;
	}

	build(): PGResponse<T> {
		return this.response;
	}
}

export function sendInternalServerError<T>(err: Error): PGClientResponse<T> {
	return {
		response_code: "98",
		response_message: "internal server error",
		error: err.message,
	};
}
