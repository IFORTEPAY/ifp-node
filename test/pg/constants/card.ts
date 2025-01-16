import {
	RequestCharge,
	RequestChargeDirect,
	RequestChargeDirectV2,
	ResponseDataChargeDirectJSON,
} from "../../../pg/card/models";

export const REQUEST_CARD_CHARGE: RequestCharge = {
	externalId: "externalId0000001",
	orderId: "orderId000000001",
	paymentMode: "CLOSE",
	paymentChannel: "BCAPG",
	amount: 15000,
	cardDetails: {
		name: "Anon",
		number: "1889800000001234",
		expMonth: "01",
		expYear: "2039",
		cvv: "101",
	},
	customerDetails: {
		name: "anon",
		phone: "081234567890",
		email: "anon@example.com",
		ipAddress: "10.100.10.10",
	},
	callbackUrl: "https://google.com",
	returnUrl: "https://google.com",
	description: "payment test sdk local",
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
		name: "Anon",
		number: "1889800000001234",
		expMonth: "01",
		expYear: "2039",
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
