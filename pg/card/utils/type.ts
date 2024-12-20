import {PGHeaders} from "../../util/type";

type ResponseTypeCharge = "html" | "url";

export interface RequestCardDetails {
	name: string;
	number: string;
	expMonth: string;
	expYear: string;
	cvv: string;
}

export interface RequestTokenDetails {
	token: string;
	cvv: string;
}

export interface RequestCustomerDetails {
	name: string;
	phone: string;
	email: string;
	ipAddress: string;
}

export interface RequestAddressDetails {
	name?: string;
	phone?: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface RequestItemDetails {
	id: string;
	name: string;
	amount: number;
	qty: number;
	description?: string;
}

export interface RequestPaymentOptions {
	useRewards?: boolean;
	campaignCode?: string;
	tenor?: number;
	ruleCode?: string;
}

export interface RequestCharge {
	externalId: string;
	orderId: string;
	currency?: string;
	paymentMode?: string;
	paymentChannel: string;
	amount: number;
	description: string;
	cardDetails: RequestCardDetails | RequestTokenDetails;
	itemDetails?: RequestItemDetails[];
	customerDetails: RequestCustomerDetails;
	billingAddress?: RequestAddressDetails;
	shippingAddress?: RequestAddressDetails;
	callbackUrl: string;
	returnUrl: string;
	responseType?: ResponseTypeCharge;
	additionalData?: string;
	storeToken?: boolean;
	paymentOptions?: RequestPaymentOptions;
}

export interface BodyCardDetails {
	card_holder_name: string;
	card_number: string;
	card_expired_month: string;
	card_expired_year: string;
	card_cvn: string;
}

export interface BodyTokenDetails {
	token: string;
	card_cvn: string;
}

export interface BodyPaymentDetails {
	amount: number;
	transaction_description: string;
}

export interface BodyCustomerDetails {
	full_name: string;
	phone: string;
	email: string;
	ip_address: string;
}

export interface BodyAddressDetails {
	full_name?: string;
	phone?: string;
	address: string;
	city: string;
	postal_code: string;
	country: string;
}

export interface BodyItemDetails {
	item_id: string;
	name: string;
	amount: number;
	qty: number;
	description?: string;
}

export interface BodyPaymentOptions {
	use_rewards?: boolean;
	campaign_code?: string;
	tenor?: number;
	rule_code?: string;
}

export interface BodyCharge {
	external_id: string;
	order_id: string;
	currency: string;
	payment_method: string;
	payment_channel: string;
	payment_mode: string;
	payment_details: BodyPaymentDetails;
	card_details: BodyCardDetails | BodyTokenDetails;
	customer_details: BodyCustomerDetails;
	item_details?: BodyItemDetails[];
	billing_address?: BodyAddressDetails;
	shipping_address?: BodyAddressDetails;
	callback_url: string;
	return_url: string;
	additional_data?: string;
	store_token?: boolean;
	payment_options?: BodyPaymentOptions;
}

export interface ResponseDataCharge {
	html?: string;
	link?: string;
}

export interface RequestChargeDirect
	extends Omit<RequestCharge, "responseType"> {}

export interface BodyChargeDirect extends BodyCharge {}

export interface TransactionDataChargeDirectJSON {
	external_id?: string;
	receipt_no?: string;
	order_id?: string;
	transaction_id?: string;
	approval_code?: string;
	// question: what type is eci?
}
export interface ResponseDataChargeDirectJSON {
	token: string;
	status: string;
	transaction_code: string;
	transaction_description: string;
	transaction_data?: TransactionDataChargeDirectJSON;
}

export interface TransactionDataChargeDirect {
	externalId?: string;
	receiptNo?: string;
	orderId?: string;
	transactionId?: string;
	approvalCode?: string;
	// question: what type is eci?
}
export interface ResponseDataChargeDirect {
	token: string;
	status: string;
	transactionCode: string;
	transactionDescription: string;
	transactionData?: TransactionDataChargeDirect;
}

export interface RequestHeaderCard {
	externalId: string;
	orderId: string;
	subMerchantId?: string;
	responseType?: ResponseTypeCharge;
}

export interface HeaderCard extends PGHeaders {
	"response-type"?: ResponseTypeCharge;
}
