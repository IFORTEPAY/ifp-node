import {RequestCharge} from "../../../pg/card/utils/type";

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
