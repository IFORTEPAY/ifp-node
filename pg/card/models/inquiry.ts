import {
	BodyAddressDetails,
	BodyCardDetails,
	BodyCustomerDetails,
	BodyItemDetails,
	BodyPaymentOptions,
	RequestAddressDetails,
	RequestCardDetails,
	RequestCustomerDetails,
	RequestItemDetails,
	RequestPaymentOptions,
} from "./charge";

// REQUEST BODY INQUIRY METHODS
export interface RequestInquiry {
	externalId: string;
	orderId: string;
	transactionId: string;
}

// REQUEST BODY INQUIRY MIDDLEWARE
export interface BodyInquiry {
	external_id: string;
	order_id: string;
	transaction_id: string;
}

// RESPONSE DATA INQUIRY MIDDLEWARE
export interface ResponsePaymentDetailsJSON {
	amount: number;
	fee_amount: number;
	total_amount: number;
	total_paid_amount: number;
	is_customer_paying_fee: boolean;
	paid_time: number;
	expired_time: number;
	transaction_description: string;
}

export interface ResponseItemDetailsJSON extends Partial<BodyItemDetails> {}

export interface ResponseCustomerDetailsJSON
	extends Partial<BodyCustomerDetails> {}

export interface ResponseAddressDetailsJSON
	extends Partial<BodyAddressDetails> {}

export interface ResponseCardDetailsJSON extends Partial<BodyCardDetails> {
	token?: string;
	card_brand?: string;
}

export interface ResponsePaymentOptionsJSON
	extends Partial<BodyPaymentOptions> {
	acquirer_issuer_relation?: string;
}

export interface ResponseDataInquiryJSON {
	approval_code?: string;
	merchant_id: string;
	mis_version: string;
	transaction_id: string;
	source?: string;
	external_id: string;
	order_id: string;
	receipt_no: string;
	response_code: string;
	currency: string;
	payment_method: string;
	payment_channel: string;
	transaction_status: string;
	host_response_code: string;
	message: string;
	callback_url: string;
	return_url: string;
	installment_tenor?: number;
	payment_mode: string;
	payment_details: ResponsePaymentDetailsJSON;
	item_details?: ResponseItemDetailsJSON[];
	customer_details: ResponseCustomerDetailsJSON;
	billing_address?: ResponseAddressDetailsJSON;
	shipping_address?: ResponseAddressDetailsJSON;
	card_details: ResponseCardDetailsJSON;
	payment_options?: ResponsePaymentOptionsJSON;
}

// RESPONSE DATA INQUIRY METHODS
export interface ResponsePaymentDetails {
	amount: number;
	feeAmount: number;
	totalAmount: number;
	totalPaidAmount?: number;
	isCustomerPayingFee: boolean;
	paidTime?: number;
	expiredTime: number;
	transactionDescription: string;
}

export interface ResponseItemDetails extends Partial<RequestItemDetails> {}

export interface ResponseCustomerDetails
	extends Partial<RequestCustomerDetails> {}

export interface ResponseAddressDetails
	extends Partial<RequestAddressDetails> {}

export interface ResponseCardDetails extends Partial<RequestCardDetails> {
	token?: string;
	cardBrand?: string;
}

export interface ResponsePaymentOptions extends Partial<RequestPaymentOptions> {
	acquirerIssuerRelation?: string;
}

export interface ResponseDataInquiry {
	approvalCode?: string;
	merchantId: string;
	misVersion: string;
	transactionId: string;
	source?: string;
	externalId: string;
	orderId: string;
	receiptNo: string;
	responseCode: string;
	currency: string;
	paymentMethod: string;
	paymentChannel: string;
	transactionStatus: string;
	hostResponseCode: string;
	message: string;
	callbackUrl: string;
	returnUrl: string;
	installmentTenor?: number;
	paymentMode: string;
	paymentDetails: ResponsePaymentDetails;
	itemDetails?: ResponseItemDetails[];
	customerDetails: ResponseCustomerDetails;
	billingAddress?: ResponseAddressDetails;
	shippingAddress?: ResponseAddressDetails;
	cardDetails: ResponseCardDetails;
	paymentOptions?: ResponsePaymentOptions;
}
