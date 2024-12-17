import {PGClient} from "../config/pgClient";
import {
	CONTENT_TYPE_JSON,
	CURRENCY,
	MIS_VERSION_3,
	PAYMENT_METHOD,
} from "../util/constant";
import {generateAuth, generateSignature} from "../util/helper";
import {PGResponse} from "../util/type";
import {PATH, PAYMENT_MODE} from "./utils/constant";
import {
	mapAddressDetails,
	mapCardDetails,
	mapCustomerDetails,
	mapItemDetails,
	mapPaymentDetails,
	mapPaymentOptions,
} from "./utils/helper";
import {cardResponseConstructor} from "./utils/response";
import {
	BodyCardDetails,
	BodyCharge,
	BodyCustomerDetails,
	BodyTokenDetails,
	HeaderCard,
	RequestCharge,
	RequestHeaderCard,
	ResponseDataCharge,
} from "./utils/type";

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

		const paymentDetails = mapPaymentDetails(request);

		let cardDetails: BodyCardDetails | BodyTokenDetails = {
			token: "",
			card_cvn: "",
		};
		if (request.cardDetails) {
			cardDetails = mapCardDetails(request.cardDetails);
		}

		let customerDetails: BodyCustomerDetails = {
			full_name: "",
			phone: "",
			email: "",
			ip_address: "",
		};
		if (request.customerDetails) {
			customerDetails = mapCustomerDetails(request.customerDetails);
		}

		const body: BodyCharge = {
			external_id: request.externalId,
			order_id: request.orderId,
			currency: request.currency ?? CURRENCY.IDR,
			payment_method: PAYMENT_METHOD.CARD,
			payment_channel: request.paymentChannel,
			payment_mode: request.paymentMode ?? PAYMENT_MODE.CLOSE,
			callback_url: request.callbackUrl,
			return_url: request.returnUrl,
			card_details: cardDetails,
			payment_details: paymentDetails,
			customer_details: customerDetails,
		};

		if (request.itemDetails && request.itemDetails.length > 0) {
			const requestItem = mapItemDetails(request.itemDetails);
			body.item_details = requestItem;
		}

		if (request.billingAddress) {
			const billingAddress = mapAddressDetails(request.billingAddress);
			body.billing_address = billingAddress;
		}

		if (request.shippingAddress) {
			const shippingAddress = mapAddressDetails(request.shippingAddress);
			body.shipping_address = shippingAddress;
		}

		if (request.paymentOptions) {
			body.payment_options = mapPaymentOptions(request.paymentOptions);
		}

		if (request.additionalData) {
			body.additional_data = request.additionalData;
		}

		if (typeof request.storeToken == "undefined") {
			body.store_token = true;
		} else {
			body.store_token = request.storeToken;
		}

		this.pgClient.setOptionBody(body);

		const requestHeader: RequestHeaderCard = {
			externalId: request.externalId,
			orderId: request.orderId,
		};

		if (request.responseType) {
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
			const constructor =
				cardResponseConstructor<ResponseDataCharge>(clientResponse);
			const response = constructor.getCharge().build();
			return response;
		} catch (err) {
			const constructor = cardResponseConstructor<ResponseDataCharge>(err);
			const response = constructor.getError().build();
			return response;
		}
	}

	// todo: add other method here
}
