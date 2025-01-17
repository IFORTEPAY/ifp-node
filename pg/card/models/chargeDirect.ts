import {
	BodyCardDetails,
	BodyCharge,
	BodyTokenDetails,
	RequestCardDetails,
	RequestCharge,
	RequestTokenDetails,
} from "./charge";

// REQUEST BODY CHARGE DIRECT METHODS
export interface RequestChargeDirect
	extends Omit<RequestCharge, "responseType"> {}

export interface RequestCardDetailsV2 extends Omit<RequestCardDetails, "cvv"> {
	cvv?: string;
}

export interface RequestTokenDetailsV2
	extends Omit<RequestTokenDetails, "cvv"> {
	cvv?: string;
}

export interface RequestChargeDirectV2
	extends Omit<RequestChargeDirect, "cardDetails"> {
	cardDetails: RequestCardDetailsV2 | RequestTokenDetailsV2;
}

// REQUEST BODY CHARGE DIRECT MIDDLEWARE
export interface BodyChargeDirect extends BodyCharge {}

export interface BodyCardDetailsV2 extends Omit<BodyCardDetails, "card_cvn"> {
	card_cvn?: string;
}

export interface BodyTokenDetailsV2 extends Omit<BodyTokenDetails, "card_cvn"> {
	card_cvn?: string;
}

export interface BodyChargeDirectV2
	extends Omit<BodyChargeDirect, "card_details"> {
	card_details: BodyCardDetailsV2 | BodyTokenDetailsV2;
}

// RESPONSE DATA CHARGE DIRECT MIDDLEWARE
export interface TransactionDataChargeDirectJSON {
	external_id?: string;
	receipt_no?: string;
	order_id?: string;
	transaction_id?: string;
	approval_code?: string;
}

export interface ResponseDataChargeDirectJSON {
	token: string;
	status: string;
	transaction_code: string;
	transaction_description: string;
	transaction_data?: TransactionDataChargeDirectJSON;
}

// RESPONSE DATA CHARGE DIRECT METHODS
export interface TransactionDataChargeDirect {
	externalId?: string;
	receiptNo?: string;
	orderId?: string;
	transactionId?: string;
	approvalCode?: string;
}

export interface ResponseDataChargeDirect {
	token: string;
	status: string;
	transactionCode: string;
	transactionDescription: string;
	transactionData?: TransactionDataChargeDirect;
}
