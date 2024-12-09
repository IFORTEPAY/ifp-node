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

export interface RequestCharge {
	externalId: string;
	orderId: string;
	currency?: string;
	paymentMode?: string;
	paymentChannel: string;
	amount: number;
	description: string;
	expired?: string;
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
	// todo: add for intallment and promo?
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
	expired_time?: string;
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
	// todo: add for intallment and promo?
}

export interface ResponseDataCharge {
	html: string;
	link: string;
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
