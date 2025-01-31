import {PGResponseConstructor} from "../../utils/response";
import {PGClientResponse} from "../../utils/type";
import {
	ResponseDataCharge,
	ResponseDataChargeDirect,
	ResponseDataChargeDirectJSON,
	TransactionDataChargeDirect,
} from "../models";

export class CardResponse<T, U> extends PGResponseConstructor<T, U> {
	constructor(resClient: PGClientResponse<T>) {
		super(resClient);
	}

	getCharge() {
		if (!this.responseClient.data) {
			return this;
		}

		const data = {} as ResponseDataCharge;

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataCharge;
		if (clientData?.html) {
			data.html = clientData.html;
		}

		if (clientData?.link) {
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

		const data = {} as ResponseDataChargeDirect;

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

		const transactionData = {} as TransactionDataChargeDirect;

		if (clientData?.transaction_data?.external_id) {
			transactionData.externalId = clientData.transaction_data.external_id;
		}

		if (clientData?.transaction_data?.receipt_no) {
			transactionData.receiptNo = clientData.transaction_data.receipt_no;
		}

		if (clientData?.transaction_data?.order_id) {
			transactionData.orderId = clientData.transaction_data.order_id;
		}

		if (clientData?.transaction_data?.transaction_id) {
			transactionData.transactionId =
				clientData.transaction_data.transaction_id;
		}

		if (clientData?.transaction_data?.approval_code) {
			transactionData.approvalCode = clientData.transaction_data.approval_code;
		}

		if (transactionData) {
			data.transactionData = transactionData;
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
