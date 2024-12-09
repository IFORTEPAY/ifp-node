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

		const clientData = this.responseClient.data;
		if (typeof clientData === "object" && "html" in clientData) {
			data.html = clientData.html as string;
		}

		if (typeof clientData === "object" && "link" in clientData) {
			data.link = clientData.link as string;
		}

		this.response.data = data as T;
		return this;
	}
}

export function cardResponseConstructor<T>(
	res: PGClientResponse<T>
): CardResponse<T> {
	return new CardResponse<T>(res);
}
