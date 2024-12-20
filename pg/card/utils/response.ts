import {PGResponseConstructor} from "../../util/response";
import {PGClientResponse} from "../../util/type";
import {
	ResponseDataCharge,
	ResponseDataChargeDirect,
	ResponseDataChargeDirectJSON,
} from "./type";

export class CardResponse<T, U> extends PGResponseConstructor<T, U> {
	constructor(resClient: PGClientResponse<T>) {
		super(resClient);
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
		this.response.data = dataParsed as U;
		return this;
	}

	getChargeDirect() {
		if (!this.responseClient.data) {
			return this;
		}

		const data: ResponseDataChargeDirect = {
			token: "",
			status: "",
			transactionCode: "",
			transactionDescription: "",
			transactionData: {
				externalId: "",
				receiptNo: "",
				orderId: "",
				transactionId: "",
				approvalCode: "",
			},
		};

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataChargeDirectJSON;
		if (clientData?.token) {
			data.token = clientData.token;
		}

		if (clientData?.status) {
			data.status = clientData.status;
		}

		if (clientData?.transaction_code) {
			data.transactionCode = clientData.transaction_code;
		}

		if (clientData?.transaction_description) {
			data.transactionDescription = clientData.transaction_description;
		}

		if (clientData?.transaction_data?.external_id) {
			data.transactionData.externalId = clientData.transaction_data.external_id;
		}

		if (clientData?.transaction_data?.receipt_no) {
			data.transactionData.receiptNo = clientData.transaction_data.receipt_no;
		}

		if (clientData?.transaction_data?.order_id) {
			data.transactionData.orderId = clientData.transaction_data.order_id;
		}

		if (clientData?.transaction_data?.transaction_id) {
			data.transactionData.transactionId =
				clientData.transaction_data.transaction_id;
		}

		if (clientData?.transaction_data?.approval_code) {
			data.transactionData.approvalCode =
				clientData.transaction_data.approval_code;
		}

		const dataParsed = data as unknown;
		this.response.data = dataParsed as U;
		return this;
	}
}

export function cardResponseConstructor<T, U>(
	res: PGClientResponse<T>
): CardResponse<T, U> {
	return new CardResponse<T, U>(res);
}
