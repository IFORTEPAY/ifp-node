import {
	BodyAddressDetails,
	BodyCardDetails,
	BodyCustomerDetails,
	BodyItemDetails,
	BodyPaymentDetails,
	BodyTokenDetails,
	RequestAddressDetails,
	RequestCardDetails,
	RequestCharge,
	RequestCustomerDetails,
	RequestItemDetails,
	RequestTokenDetails,
} from "./type";

export const mapCardDetails = (
	request: RequestCardDetails | RequestTokenDetails
): BodyCardDetails | BodyTokenDetails => {
	if ("token" in request) {
		const result: BodyTokenDetails = {
			token: request.token,
			card_cvn: request.cvv,
		};
		return result;
	}

	const result: BodyCardDetails = {
		card_holder_name: request.name,
		card_number: request.number,
		card_expired_month: request.expMonth,
		card_expired_year: request.expYear,
		card_cvn: request.cvv,
	};
	return result;
};

export const mapPaymentDetails = (
	request: RequestCharge
): BodyPaymentDetails => {
	const result: BodyPaymentDetails = {
		amount: request.amount,
		transaction_description: request.description,
	};
	if (request.expired) {
		result.expired_time = request.expired;
	}
	return result;
};

export const mapCustomerDetails = (
	request: RequestCustomerDetails
): BodyCustomerDetails => {
	const result: BodyCustomerDetails = {
		full_name: request.name,
		phone: request.phone,
		email: request.email,
		ip_address: request.ipAddress,
	};
	return result;
};

export const mapItemDetails = (
	request: RequestItemDetails[]
): BodyItemDetails[] => {
	const result = request.map((item): BodyItemDetails => {
		const data: BodyItemDetails = {
			item_id: item.id,
			name: item.name,
			amount: item.amount,
			qty: item.qty,
		};
		if (item.description) {
			data.description = item.description;
		}
		return data;
	});
	return result;
};

export const mapAddressDetails = (
	request: RequestAddressDetails
): BodyAddressDetails => {
	const result: BodyAddressDetails = {
		address: request.address,
		city: request.city,
		postal_code: request.postalCode,
		country: request.country,
	};
	if (request.name) {
		result.full_name = request.name;
	}
	if (request.phone) {
		result.phone = request.phone;
	}
	return result;
};
