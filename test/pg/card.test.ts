import {Card} from "../../pg/card";
import {PATH} from "../../pg/card/utils/constant";
import {
	ResponseDataCharge,
	BodyCharge,
	HeaderCard,
	RequestCharge,
} from "../../pg/card/utils/type";
import {PGClient} from "../../pg/config/pgClient";
import {PGConfig} from "../../pg/config/pgConfig";
import {PGClientResponse} from "../../pg/util/type";
import {
	MERCHANT_TEST_1,
	REQUEST_CARD_CHARGE,
	RESPONSE_CARD_CHARGE,
} from "./contant";

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

	// todo: add other methods here
});