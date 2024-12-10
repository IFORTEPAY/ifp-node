import {PGResponseConstructor} from "../../util/response";
import {PGClientResponse} from "../../util/type";
import {ResponseDataCharge} from "./type";

export class CardResponse<T> extends PGResponseConstructor<T> {
	constructor(res: PGClientResponse<T>) {
		super(res);
	}

	getCharge() {
		if (!this.responseClient.data) {
			return this;
		}

		const data: ResponseDataCharge = {
			html: "",
			link: "",
		};

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataCharge;
		if (clientData && clientData.html) {
			data.html = clientData.html;
		}

		if (clientData && clientData.link) {
			data.link = clientData.link;
		}

		const dataParsed = data as unknown;
		this.response.data = dataParsed as T;
		return this;
	}
}

export function cardResponseConstructor<T>(
	res: PGClientResponse<T>
): CardResponse<T> {
	return new CardResponse<T>(res);
}
