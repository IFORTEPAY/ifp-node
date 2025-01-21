import {Card} from "../../pg/card";
import {PATH} from "../../pg/card/utils/constant";
import {
	ResponseDataCharge,
	BodyCharge,
	HeaderCard,
	RequestCharge,
	ResponseDataChargeDirectJSON,
	RequestChargeDirect,
	BodyChargeDirect,
	BodyChargeDirectV2,
	RequestChargeDirectV2,
	ResponseDataInquiryJSON,
	BodyInquiry,
	RequestInquiry,
} from "../../pg/card/models";
import {PGClient} from "../../pg/config/pgClient";
import {PGConfig} from "../../pg/config/pgConfig";
import {PGClientResponse} from "../../pg/utils/type";
import {
	MERCHANT_TEST_1,
	REQUEST_CARD_CHARGE,
	REQUEST_CARD_CHARGE_DIRECT_V1,
	REQUEST_CARD_CHARGE_DIRECT_V2,
	REQUEST_CARD_INQUIRY_INVALID,
	REQUEST_CARD_INQUIRY_VALID,
	RESPONSE_CARD_CHARGE,
	RESPONSE_CARD_CHARGE_DIRECT_V1,
	RESPONSE_CARD_CHARGE_DIRECT_V2,
	RESPONSE_CARD_INQUIRY_INVALID,
	RESPONSE_CARD_INQUIRY_VALID,
} from "./constants";

const pgConfig = new PGConfig({
	merchantId: MERCHANT_TEST_1.ID,
	secretUnboundId: MERCHANT_TEST_1.UNBOUND,
	hashKey: MERCHANT_TEST_1.HASHKEY,
});

const pgClient = new PGClient(pgConfig);

/** mock post() for charge request  */
const mockChargePost = jest
	.fn()
	.mockImplementation((): Promise<PGClientResponse<ResponseDataCharge>> => {
		return new Promise((resolve) => {
			const data: ResponseDataCharge = {
				html: "",
				link: "",
			};

			const header = pgClient.pgClientOptions.headers as HeaderCard;
			if (header["response-type"] && header["response-type"] === "url") {
				data.link = RESPONSE_CARD_CHARGE.LINK;
			} else {
				data.html = RESPONSE_CARD_CHARGE.HTML;
			}

			const result: PGClientResponse<ResponseDataCharge> = {
				response_code: "00",
				response_message: "Success",
				data: data,
			};
			return resolve(result);
		});
	});

/** mock post() for charge direct request  */
const mockChargeDirectPost = jest
	.fn()
	.mockImplementation(
		(): Promise<PGClientResponse<ResponseDataChargeDirectJSON>> => {
			return new Promise((resolve) => {
				let data = {} as ResponseDataChargeDirectJSON;

				const path = pgClient.pgClientOptions.path;
				if (path === PATH.CHARGE_DIRECT_V1) {
					data = RESPONSE_CARD_CHARGE_DIRECT_V1;
				}

				if (path === PATH.CHARGE_DIRECT_V2) {
					data = RESPONSE_CARD_CHARGE_DIRECT_V2;
				}

				const result: PGClientResponse<ResponseDataChargeDirectJSON> = {
					response_code: "00",
					response_message: "Success",
					data: data,
				};
				return resolve(result);
			});
		}
	);

/** mock post() for inquiry request  */
const mockInquiryPost = jest
	.fn()
	.mockImplementation(
		(): Promise<PGClientResponse<ResponseDataInquiryJSON>> => {
			return new Promise((resolve) => {
				const body = pgClient.pgClientOptions.body as BodyInquiry;
				if (
					body.transaction_id === REQUEST_CARD_INQUIRY_INVALID.transactionId
				) {
					const result = RESPONSE_CARD_INQUIRY_INVALID;
					return resolve(result);
				}

				const data = RESPONSE_CARD_INQUIRY_VALID;
				const result: PGClientResponse<ResponseDataInquiryJSON> = {
					response_code: "00",
					response_message: "Success",
					data: data,
				};
				return resolve(result);
			});
		}
	);

describe("Card test", () => {
	/** METHOD CHARGE */
	it("Should successfully charge with return value html", async () => {
		pgClient.post = mockChargePost;
		const card = new Card(pgClient);
		const resp = await card.charge(REQUEST_CARD_CHARGE);

		expect(pgClient.pgClientOptions.path).toBe(PATH.CHARGE);

		const requestHeaderClient = pgClient.pgClientOptions.headers as HeaderCard;
		expect(pgClient.pgClientOptions.headers).toBeDefined();
		expect(requestHeaderClient["response-type"]).toBeUndefined();

		const requestBodyClient = pgClient.pgClientOptions.body as BodyCharge;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();

		expect(pgClient.post).toHaveBeenCalledTimes(1);
		expect(resp.data).toBeDefined();
		expect(resp.data?.html).toBe(RESPONSE_CARD_CHARGE.HTML);
	});

	it("Should successfully charge with return value link", async () => {
		const card = new Card(pgClient);
		const request: RequestCharge = {
			...REQUEST_CARD_CHARGE,
			responseType: "url",
		};

		const resp = await card.charge(request);

		expect(pgClient.pgClientOptions.path).toBe(PATH.CHARGE);

		const requestHeaderClient = pgClient.pgClientOptions.headers as HeaderCard;
		expect(pgClient.pgClientOptions.headers).toBeDefined();
		expect(requestHeaderClient["response-type"]).toBe("url");

		const requestBodyClient = pgClient.pgClientOptions.body as BodyCharge;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();

		expect(pgClient.post).toHaveBeenCalledTimes(2);
		expect(resp.data).toBeDefined();
		expect(resp.data?.link).toBe(RESPONSE_CARD_CHARGE.LINK);
	});

	/** METHOD CHARGE DIRECT */
	it("Should successfully charge direct /v1", async () => {
		pgClient.post = mockChargeDirectPost;
		const card = new Card(pgClient);
		const request: RequestChargeDirect = REQUEST_CARD_CHARGE_DIRECT_V1;
		const resp = await card.chargeDirect(request);

		expect(pgClient.pgClientOptions.path).toBe(PATH.CHARGE_DIRECT_V1);

		const requestBodyClient = pgClient.pgClientOptions.body as BodyChargeDirect;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();
		expect(requestBodyClient.payment_channel).toBe(
			REQUEST_CARD_CHARGE_DIRECT_V1.paymentChannel
		);
		expect(request.cardDetails.cardCvn).toBeDefined();

		expect(pgClient.post).toHaveBeenCalledTimes(1);
		expect(resp.data).toBeDefined();
		expect(resp.data?.transactionDescription).toBe(
			RESPONSE_CARD_CHARGE_DIRECT_V1.transaction_description
		);
	});

	it("Should successfully charge direct /v2", async () => {
		const card = new Card(pgClient);
		const request: RequestChargeDirectV2 = REQUEST_CARD_CHARGE_DIRECT_V2;
		const resp = await card.chargeDirectV2(request);

		expect(pgClient.pgClientOptions.path).toBe(PATH.CHARGE_DIRECT_V2);

		const requestBodyClient = pgClient.pgClientOptions
			.body as BodyChargeDirectV2;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();
		expect(requestBodyClient.payment_channel).toBe(
			REQUEST_CARD_CHARGE_DIRECT_V2.paymentChannel
		);
		expect(request.cardDetails.cardCvn).toBeUndefined();

		expect(pgClient.post).toHaveBeenCalledTimes(2);
		expect(resp.data).toBeDefined();
		expect(resp.data?.transactionDescription).toBe(
			RESPONSE_CARD_CHARGE_DIRECT_V2.transaction_description
		);
	});

	/** METHOD INQUIRY */
	it("Should successfully inquiry payment", async () => {
		pgClient.post = mockInquiryPost;
		const card = new Card(pgClient);
		const request: RequestInquiry = REQUEST_CARD_INQUIRY_VALID;
		const resp = await card.inquiry(request);

		expect(pgClient.pgClientOptions.path).toBe(PATH.INQURY);

		const requestBodyClient = pgClient.pgClientOptions.body as BodyInquiry;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();
		expect(requestBodyClient.external_id).toBe(
			REQUEST_CARD_INQUIRY_VALID.externalId
		);
		expect(requestBodyClient.order_id).toBe(REQUEST_CARD_INQUIRY_VALID.orderId);
		expect(requestBodyClient.transaction_id).toBe(
			REQUEST_CARD_INQUIRY_VALID.transactionId
		);

		const responseDataClient = resp.data;
		expect(pgClient.post).toHaveBeenCalledTimes(1);
		expect(responseDataClient).toBeDefined();
		expect(responseDataClient?.externalId).toBe(
			RESPONSE_CARD_INQUIRY_VALID.external_id
		);
		expect(responseDataClient?.orderId).toBe(
			RESPONSE_CARD_INQUIRY_VALID.order_id
		);
		expect(responseDataClient?.transactionId).toBe(
			RESPONSE_CARD_INQUIRY_VALID.transaction_id
		);
		expect(responseDataClient?.paymentChannel).toBe(
			RESPONSE_CARD_INQUIRY_VALID.payment_channel
		);
		expect(responseDataClient?.paymentDetails).toBeDefined();
		expect(responseDataClient?.itemDetails).toBeDefined();
		expect(responseDataClient?.itemDetails?.length).toEqual(
			RESPONSE_CARD_INQUIRY_VALID.item_details?.length
		);
		expect(responseDataClient?.customerDetails).toBeDefined();
		expect(responseDataClient?.cardDetails).toBeDefined();
		expect(responseDataClient?.cardDetails.cardBrand).toBe(
			RESPONSE_CARD_INQUIRY_VALID.card_details.card_brand
		);
		expect(responseDataClient?.paymentOptions).toBeDefined();
	});

	it("Should failed inquiry payment", async () => {
		pgClient.post = mockInquiryPost;
		const card = new Card(pgClient);
		const request: RequestInquiry = REQUEST_CARD_INQUIRY_INVALID;
		const resp = await card.inquiry(request);

		expect(pgClient.pgClientOptions.path).toBe(PATH.INQURY);

		const requestBodyClient = pgClient.pgClientOptions.body as BodyInquiry;
		expect(pgClient.pgClientOptions.body).toBeDefined();
		expect(requestBodyClient).toBeDefined();
		expect(requestBodyClient.external_id).toBe(
			REQUEST_CARD_INQUIRY_INVALID.externalId
		);
		expect(requestBodyClient.order_id).toBe(
			REQUEST_CARD_INQUIRY_INVALID.orderId
		);
		expect(requestBodyClient.transaction_id).toBe(
			REQUEST_CARD_INQUIRY_INVALID.transactionId
		);

		expect(pgClient.post).toHaveBeenCalledTimes(2);
		expect(resp.data).toBeUndefined();
		expect(resp.responseCode).toBe(RESPONSE_CARD_INQUIRY_INVALID.response_code);
		expect(resp.responseMessage).toBe(
			RESPONSE_CARD_INQUIRY_INVALID.response_message
		);
	});

	// todo: add other methods here
});
