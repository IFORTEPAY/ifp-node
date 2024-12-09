import {PGResponseConstructor} from "../../util/response";
import {PGClientResponse} from "../../util/type";

export class CardResponse<T> extends PGResponseConstructor<T> {
	constructor(res: PGClientResponse<T>) {
		super(res);
	}

	getCharge() {
		if (!this.responseClient.data) {
			return this;
		}

		const clientData = this.responseClient.data;
		if (typeof clientData === "object" && "html" in clientData) {
			this.response.data = clientData;
		}

		return this;
	}
}

export function cardResponseConstructor<T>(
	res: PGClientResponse<T>
): CardResponse<T> {
	return new CardResponse<T>(res);
}
