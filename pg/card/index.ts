import {PGClient} from "../config/pgClient";
import {
	CONTENT_TYPE_JSON,
	CURRENCY,
	MIS_VERSION_3,
	PAYMENT_METHOD,
} from "../utils/constant";
import {generateAuth, generateSignature} from "../utils/helper";
import {PGResponse} from "../utils/type";
import {
	BodyCardDetails,
	BodyCardDetailsV2,
	BodyCharge,
	BodyChargeDirect,
	BodyChargeDirectV2,
	BodyCustomerDetails,
	BodyTokenDetails,
	BodyTokenDetailsV2,
	HeaderCard,
	RequestCharge,
	RequestChargeDirect,
	RequestChargeDirectV2,
	RequestHeaderCard,
	ResponseDataCharge,
	ResponseDataChargeDirect,
	ResponseDataChargeDirectJSON,
} from "./models";
import {PATH, PAYMENT_MODE} from "./utils/constant";
import {
	mapAddressDetails,
	mapCardDetails,
	mapCardDetailsV2,
	mapCustomerDetails,
	mapItemDetails,
	mapPaymentDetails,
	mapPaymentOptions,
} from "./utils/helper";
import {cardResponseConstructor} from "./utils/response";

/**
 * @description Card Payment method endpoint features
 */
export class Card {
	private pgClient: PGClient;

	constructor(pgClient: PGClient) {
		this.pgClient = pgClient;
	}

	/**
	 * @description get headers for client request
	 * @param {RequestHeaderCard} req
	 */
	private getRequestHeaders(req: RequestHeaderCard) {
		const pgConfig = this.pgClient.pgConfig;

		const auth = generateAuth(pgConfig.merchantId, pgConfig.secretUnboundId);
		const signature = generateSignature(
			req?.externalId,
			req?.orderId,
			pgConfig.hashKey
		);
		const header: HeaderCard = {
			"Content-Type": CONTENT_TYPE_JSON,
			"Authorization": auth,
			"x-req-signature": signature,
			"x-version": MIS_VERSION_3,
		};

		if (req.subMerchantId) {
			header["sub-merchant-id"] = req.subMerchantId;
		}

		if (req.responseType) {
			header["response-type"] = req.responseType;
		}

		this.pgClient.setOptionHeaders(header);
	}

	/**
	 * @description non direct payment 3DS using OTP verification
	 * @param {RequestCharge} request
	 * @returns {Promise<PGResponse<ResponseDataCharge>>}
	 */
	async charge(
		request: RequestCharge
	): Promise<PGResponse<ResponseDataCharge>> {
		this.pgClient.setOptionPath(PATH.CHARGE);

		const paymentDetails = mapPaymentDetails(
			request?.amount,
			request?.transactionDescription
		);

		let cardDetails = {} as BodyTokenDetails | BodyCardDetails;
		if (request?.cardDetails) {
			cardDetails = mapCardDetails(request.cardDetails);
		}

		let customerDetails = {} as BodyCustomerDetails;
		if (request?.customerDetails) {
			customerDetails = mapCustomerDetails(request.customerDetails);
		}

		const body: BodyCharge = {
			external_id: request?.externalId,
			order_id: request?.orderId,
			currency: request?.currency ?? CURRENCY.IDR,
			payment_method: PAYMENT_METHOD.CARD,
			payment_channel: request?.paymentChannel,
			payment_mode: request?.paymentMode ?? PAYMENT_MODE.CLOSE,
			callback_url: request?.callbackUrl,
			return_url: request?.returnUrl,
			card_details: cardDetails,
			payment_details: paymentDetails,
			customer_details: customerDetails,
		};

		if (request?.itemDetails && request.itemDetails.length > 0) {
			const requestItem = mapItemDetails(request.itemDetails);
			body.item_details = requestItem;
		}

		if (request?.billingAddress) {
			const billingAddress = mapAddressDetails(request.billingAddress);
			body.billing_address = billingAddress;
		}

		if (request?.shippingAddress) {
			const shippingAddress = mapAddressDetails(request.shippingAddress);
			body.shipping_address = shippingAddress;
		}

		if (request?.paymentOptions) {
			body.payment_options = mapPaymentOptions(request.paymentOptions);
		}

		if (request?.additionalData) {
			body.additional_data = request.additionalData;
		}

		if (typeof request?.storeToken == "undefined") {
			body.store_token = true;
		} else {
			body.store_token = request.storeToken;
		}

		this.pgClient.setOptionBody(body);

		const requestHeader: RequestHeaderCard = {
			externalId: request?.externalId,
			orderId: request?.orderId,
		};

		if (request?.responseType) {
			requestHeader.responseType = request.responseType;
		}

		if (this.pgClient.pgConfig.subMerchantId) {
			requestHeader.subMerchantId = this.pgClient.pgConfig.subMerchantId;
		}

		this.getRequestHeaders(requestHeader);

		try {
			const clientResponse = await this.pgClient.post<ResponseDataCharge>();
			if (clientResponse.error || !clientResponse.data) {
				throw clientResponse;
			}
			const constructor = cardResponseConstructor<
				ResponseDataCharge,
				ResponseDataCharge
			>(clientResponse);
			const response = constructor.getCharge().build();
			return response;
		} catch (err) {
			const constructor = cardResponseConstructor<
				ResponseDataCharge,
				ResponseDataCharge
			>(err);
			const response = constructor.getError().build();
			return response;
		}
	}

	/**
	 * @description direct payment non 3DS without using OTP verification
	 * @param {RequestChargeDirect} request
	 * @returns {Promise<PGResponse<ResponseDataChargeDirect>>}
	 */
	async chargeDirect(
		request: RequestChargeDirect
	): Promise<PGResponse<ResponseDataChargeDirect>> {
		this.pgClient.setOptionPath(PATH.CHARGE_DIRECT_V1);

		const paymentDetails = mapPaymentDetails(
			request?.amount,
			request?.transactionDescription
		);

		let cardDetails = {} as BodyTokenDetails | BodyCardDetails;
		if (request?.cardDetails) {
			cardDetails = mapCardDetails(request.cardDetails);
		}

		let customerDetails = {} as BodyCustomerDetails;
		if (request?.customerDetails) {
			customerDetails = mapCustomerDetails(request.customerDetails);
		}

		const body: BodyChargeDirect = {
			external_id: request?.externalId,
			order_id: request?.orderId,
			currency: request?.currency ?? CURRENCY.IDR,
			payment_method: PAYMENT_METHOD.CARD,
			payment_channel: request?.paymentChannel,
			payment_mode: request?.paymentMode ?? PAYMENT_MODE.CLOSE,
			callback_url: request?.callbackUrl,
			return_url: request?.returnUrl,
			card_details: cardDetails,
			payment_details: paymentDetails,
			customer_details: customerDetails,
		};

		if (request?.itemDetails && request.itemDetails.length > 0) {
			const requestItem = mapItemDetails(request.itemDetails);
			body.item_details = requestItem;
		}

		if (request?.billingAddress) {
			const billingAddress = mapAddressDetails(request.billingAddress);
			body.billing_address = billingAddress;
		}

		if (request?.shippingAddress) {
			const shippingAddress = mapAddressDetails(request.shippingAddress);
			body.shipping_address = shippingAddress;
		}

		if (request?.paymentOptions) {
			body.payment_options = mapPaymentOptions(request.paymentOptions);
		}

		if (request?.additionalData) {
			body.additional_data = request.additionalData;
		}

		if (typeof request?.storeToken == "undefined") {
			body.store_token = true;
		} else {
			body.store_token = request.storeToken;
		}

		this.pgClient.setOptionBody(body);

		const requestHeader: RequestHeaderCard = {
			externalId: request?.externalId,
			orderId: request?.orderId,
		};

		if (this.pgClient.pgConfig.subMerchantId) {
			requestHeader.subMerchantId = this.pgClient.pgConfig.subMerchantId;
		}

		this.getRequestHeaders(requestHeader);

		try {
			const clientResponse =
				await this.pgClient.post<ResponseDataChargeDirectJSON>();
			if (clientResponse.error || !clientResponse.data) {
				throw clientResponse;
			}
			const constructor = cardResponseConstructor<
				ResponseDataChargeDirectJSON,
				ResponseDataChargeDirect
			>(clientResponse);
			const response = constructor.getChargeDirect().build();
			return response;
		} catch (err) {
			const constructor = cardResponseConstructor<
				ResponseDataChargeDirectJSON,
				ResponseDataChargeDirect
			>(err);
			const response = constructor.getError().build();
			return response;
		}
	}

	/**
	 * @description direct payment V2 non 3DS without using OTP verification, card CVV/CVN is optional
	 * @param {RequestChargeDirectV2} request
	 * @returns {Promise<PGResponse<ResponseDataChargeDirect>>}
	 */
	async chargeDirectV2(
		request: RequestChargeDirectV2
	): Promise<PGResponse<ResponseDataChargeDirect>> {
		this.pgClient.setOptionPath(PATH.CHARGE_DIRECT_V2);

		const paymentDetails = mapPaymentDetails(
			request?.amount,
			request?.transactionDescription
		);

		let cardDetails = {} as BodyTokenDetailsV2 | BodyCardDetailsV2;
		if (request?.cardDetails) {
			cardDetails = mapCardDetailsV2(request.cardDetails);
		}

		let customerDetails = {} as BodyCustomerDetails;
		if (request?.customerDetails) {
			customerDetails = mapCustomerDetails(request.customerDetails);
		}

		const body: BodyChargeDirectV2 = {
			external_id: request?.externalId,
			order_id: request?.orderId,
			currency: request?.currency ?? CURRENCY.IDR,
			payment_method: PAYMENT_METHOD.CARD,
			payment_channel: request?.paymentChannel,
			payment_mode: request?.paymentMode ?? PAYMENT_MODE.CLOSE,
			callback_url: request?.callbackUrl,
			return_url: request?.returnUrl,
			card_details: cardDetails,
			payment_details: paymentDetails,
			customer_details: customerDetails,
		};

		if (request?.itemDetails && request.itemDetails.length > 0) {
			const requestItem = mapItemDetails(request.itemDetails);
			body.item_details = requestItem;
		}

		if (request?.billingAddress) {
			const billingAddress = mapAddressDetails(request.billingAddress);
			body.billing_address = billingAddress;
		}

		if (request?.shippingAddress) {
			const shippingAddress = mapAddressDetails(request.shippingAddress);
			body.shipping_address = shippingAddress;
		}

		if (request?.paymentOptions) {
			body.payment_options = mapPaymentOptions(request.paymentOptions);
		}

		if (request?.additionalData) {
			body.additional_data = request.additionalData;
		}

		if (typeof request?.storeToken == "undefined") {
			body.store_token = true;
		} else {
			body.store_token = request.storeToken;
		}

		this.pgClient.setOptionBody(body);

		const requestHeader: RequestHeaderCard = {
			externalId: request?.externalId,
			orderId: request?.orderId,
		};

		if (this.pgClient.pgConfig.subMerchantId) {
			requestHeader.subMerchantId = this.pgClient.pgConfig.subMerchantId;
		}

		this.getRequestHeaders(requestHeader);

		try {
			const clientResponse =
				await this.pgClient.post<ResponseDataChargeDirectJSON>();
			if (clientResponse.error || !clientResponse.data) {
				throw clientResponse;
			}
			const constructor = cardResponseConstructor<
				ResponseDataChargeDirectJSON,
				ResponseDataChargeDirect
			>(clientResponse);
			const response = constructor.getChargeDirect().build();
			return response;
		} catch (err) {
			const constructor = cardResponseConstructor<
				ResponseDataChargeDirectJSON,
				ResponseDataChargeDirect
			>(err);
			const response = constructor.getError().build();
			return response;
		}
	}

	// todo: add other method here
}
