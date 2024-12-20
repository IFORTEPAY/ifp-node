import {
	BodyAddressDetails,
	BodyCardDetails,
	BodyCustomerDetails,
	BodyItemDetails,
	BodyPaymentDetails,
	BodyPaymentOptions,
	BodyTokenDetails,
	RequestAddressDetails,
	RequestCardDetails,
	RequestCharge,
	RequestCustomerDetails,
	RequestItemDetails,
	RequestPaymentOptions,
	RequestTokenDetails,
} from "./type";
import {PATH, PAYMENT_CHANNEL} from "./constant";

export const mapCardDetails = (
	request: RequestCardDetails | RequestTokenDetails
): BodyCardDetails | BodyTokenDetails => {
	if ("token" in request) {
		const result: BodyTokenDetails = {
			token: request?.token,
			card_cvn: request?.cvv,
		};
		return result;
	}

	const result: BodyCardDetails = {
		card_holder_name: request?.name,
		card_number: request?.number,
		card_expired_month: request?.expMonth,
		card_expired_year: request?.expYear,
		card_cvn: request?.cvv,
	};
	return result;
};

export const mapPaymentDetails = (
	request: RequestCharge
): BodyPaymentDetails => {
	if (!request) {
		return {amount: 0, transaction_description: ""};
	}
	const result: BodyPaymentDetails = {
		amount: request?.amount,
		transaction_description: request?.description,
	};
	return result;
};

export const mapCustomerDetails = (
	request: RequestCustomerDetails
): BodyCustomerDetails => {
	const result: BodyCustomerDetails = {
		full_name: request?.name,
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

export const mapPathChargeDirect = (channel: string): string => {
	const channelV1 = [PAYMENT_CHANNEL.BCAPG, PAYMENT_CHANNEL.CIMBPG];
	if (channelV1.includes(channel?.toUpperCase())) {
		return PATH.CHARGE_DIRECT_V1;
	}
	return PATH.CHARGE_DIRECT_V2;
};
