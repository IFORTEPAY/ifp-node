import {
	RequestCharge,
	RequestChargeDirect,
	RequestChargeDirectV2,
	RequestInquiry,
	ResponseDataChargeDirectJSON,
	ResponseDataInquiryJSON,
} from "../../../pg/card/models";
import {PGClientResponse} from "../../../pg/utils/type";

export const REQUEST_CARD_CHARGE: RequestCharge = {
	externalId: "externalId0000001",
	orderId: "orderId000000001",
	paymentMode: "CLOSE",
	paymentChannel: "BCAPG",
	amount: 15000,
	cardDetails: {
		cardHolderName: "Anon",
		cardNumber: "1889800000001234",
		cardExpiredMonth: "01",
		cardExpiredYear: "2039",
		cardCvn: "101",
	},
	customerDetails: {
		fullName: "anon",
		phone: "081234567890",
		email: "anon@example.com",
		ipAddress: "10.100.10.10",
	},
	callbackUrl: "https://google.com",
	returnUrl: "https://google.com",
	transactionDescription: "payment test sdk local",
};

export const RESPONSE_CARD_CHARGE = {
	HTML: "<div><p>dummy html result</p></div>",
	LINK: "https://dummy-link-result.com",
};

export const REQUEST_CARD_CHARGE_DIRECT_V1: RequestChargeDirect = {
	...REQUEST_CARD_CHARGE,
};

export const REQUEST_CARD_CHARGE_DIRECT_V2: RequestChargeDirectV2 = {
	...REQUEST_CARD_CHARGE,
	cardDetails: {
		cardHolderName: "Anon",
		cardNumber: "1889800000001234",
		cardExpiredMonth: "01",
		cardExpiredYear: "2039",
	},
	paymentChannel: "BCACC",
};

export const RESPONSE_CARD_CHARGE_DIRECT_V1: ResponseDataChargeDirectJSON = {
	token: "b0e3db06-1bde-49f8-bba6-471bc7cd9d18",
	status: "SUCCESS",
	transaction_code: "00",
	transaction_description:
		"Approved: The transaction charge direct v1 was successful",
	transaction_data: {
		external_id: "externalId0000001",
		receipt_no: "412710059461",
		order_id: "orderId000000001",
		transaction_id: "4eab1441-8308-4fa0-91b8-969973e0b0fd",
		approval_code: "059461",
	},
};

export const RESPONSE_CARD_CHARGE_DIRECT_V2: ResponseDataChargeDirectJSON = {
	...RESPONSE_CARD_CHARGE_DIRECT_V1,
	transaction_description:
		"Approved: The transaction charge direct v2 was successful",
};

export const REQUEST_CARD_INQUIRY_VALID: RequestInquiry = {
	externalId: "externalId0000001",
	orderId: "orderId000000001",
	transactionId: "transactionId000000001",
};

export const REQUEST_CARD_INQUIRY_INVALID: RequestInquiry = {
	externalId: "externalId0000002",
	orderId: "orderId000000002",
	transactionId: "transactionId000000002",
};

export const RESPONSE_CARD_INQUIRY_VALID: ResponseDataInquiryJSON = {
	approval_code: "089283",
	merchant_id: "IFP202400000",
	mis_version: "v3",
	transaction_id: "transactionId000000001",
	external_id: "externalId0000001",
	order_id: "orderId000000001",
	receipt_no: "3c6473ac1735528977",
	response_code: "00",
	currency: "IDR",
	payment_method: "CARD",
	payment_channel: "CIMBPG",
	transaction_status: "PAID",
	host_response_code: "00",
	message: "The transaction has been paid.",
	callback_url: "https://google.com",
	return_url: "https://google.com",
	installment_tenor: 0,
	payment_mode: "CLOSE",
	payment_details: {
		amount: 15000,
		expired_time: 1735530237222,
		fee_amount: 0,
		is_customer_paying_fee: false,
		paid_time: 1735530236100,
		total_amount: 15000,
		total_paid_amount: 15000,
		transaction_description: "payment test sdk local",
	},
	item_details: [
		{
			item_id: "Item01",
			name: "Awesome Soft Computer",
			amount: 10000,
			qty: 1,
			description: "3131",
		},
		{
			item_id: "Item02",
			name: "Awesome Soft Display",
			amount: 5000,
			qty: 1,
			description: "3232",
		},
	],
	customer_details: {
		full_name: "john",
		email: "john@example.com",
		phone: "081234567890",
		ip_address: "10.100.10.10",
	},
	card_details: {
		card_holder_name: "JOHN",
		card_number: "188980******1234",
		card_expired_month: "01",
		card_expired_year: "2077",
		token: "9b1bb24e-8f98-4e7d-9a80-834e161bc083",
		card_brand: "VISA",
	},
	payment_options: {
		campaign_code: "000",
		tenor: 0,
		use_rewards: false,
		acquirer_issuer_relation: "off_us",
	},
};

export const RESPONSE_CARD_INQUIRY_INVALID: PGClientResponse<ResponseDataInquiryJSON> =
	{
		response_code: "01",
		response_message: "transaction_id not found",
	};
