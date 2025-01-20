import {
	BodyAddressDetails,
	BodyCardDetails,
	BodyCardDetailsV2,
	BodyCustomerDetails,
	BodyItemDetails,
	BodyPaymentDetails,
	BodyPaymentOptions,
	BodyTokenDetails,
	BodyTokenDetailsV2,
	RequestAddressDetails,
	RequestCardDetails,
	RequestCardDetailsV2,
	RequestCustomerDetails,
	RequestItemDetails,
	RequestPaymentOptions,
	RequestTokenDetails,
	RequestTokenDetailsV2,
} from "../models";

export const mapCardDetails = (
	request: RequestCardDetails | RequestTokenDetails
): BodyCardDetails | BodyTokenDetails => {
	if ("token" in request) {
		const result: BodyTokenDetails = {
			token: request?.token,
			card_cvn: request?.cardCvn,
		};
		return result;
	}

	const result: BodyCardDetails = {
		card_holder_name: request?.cardHolderName,
		card_number: request?.cardNumber,
		card_expired_month: request?.cardExpiredMonth,
		card_expired_year: request?.cardExpiredYear,
		card_cvn: request?.cardCvn,
	};
	return result;
};

export const mapCardDetailsV2 = (
	request: RequestCardDetailsV2 | RequestTokenDetailsV2
): BodyCardDetailsV2 | BodyTokenDetailsV2 => {
	if ("token" in request) {
		const result: BodyTokenDetailsV2 = {
			token: request?.token,
		};
		if (request?.cardCvn) {
			result.card_cvn = request?.cardCvn;
		}
		return result;
	}

	const result: BodyCardDetailsV2 = {
		card_holder_name: request?.cardHolderName,
		card_number: request?.cardNumber,
		card_expired_month: request?.cardExpiredMonth,
		card_expired_year: request?.cardExpiredYear,
	};
	if (request?.cardCvn) {
		result.card_cvn = request?.cardCvn;
	}
	return result;
};

export const mapPaymentDetails = (
	amount: number,
	description: string
): BodyPaymentDetails => {
	const result: BodyPaymentDetails = {
		amount: amount ?? 0,
		transaction_description: description ?? "",
	};
	return result;
};

export const mapCustomerDetails = (
	request: RequestCustomerDetails
): BodyCustomerDetails => {
	const result: BodyCustomerDetails = {
		full_name: request?.fullName,
		phone: request?.phone,
		email: request?.email,
		ip_address: request?.ipAddress,
	};
	return result;
};

export const mapItemDetails = (
	request: RequestItemDetails[]
): BodyItemDetails[] => {
	const result = request.map((item): BodyItemDetails => {
		const data: BodyItemDetails = {
			item_id: item.itemId,
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
	if (request.fullName) {
		result.full_name = request.fullName;
	}
	if (request.phone) {
		result.phone = request.phone;
	}
	return result;
};

export const mapPaymentOptions = (
	request: RequestPaymentOptions
): BodyPaymentOptions => {
	const result: BodyPaymentOptions = {};
	if (request.useRewards) {
		result.use_rewards = request.useRewards;
	}
	if (request.campaignCode) {
		result.campaign_code = request.campaignCode;
	}
	if (request.tenor) {
		result.tenor = request.tenor;
	}
	if (request.ruleCode) {
		result.rule_code = request.ruleCode;
	}
	return result;
};
