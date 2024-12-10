import PG from "../../pg";
import {PGClient} from "../../pg/config/pgClient";
import {PGClientResponse} from "../../pg/util/type";
import {MERCHANT_TEST_1, REQUEST_CARD_CHARGE} from "./contant";

jest.spyOn(PGClient.prototype, "post").mockImplementation(<
	T,
>(): Promise<PGClientResponse<T>> => {
	return new Promise((resolve) => {
		const result: PGClientResponse<T> = {
			response_code: "00",
			response_message: "Success",
		};
		return resolve(result);
	});
});

describe("PG test", () => {
	it("Should init PG class and Successfully execute PGClient function from releted Payment method", async () => {
		const pg = new PG({
			merchantId: MERCHANT_TEST_1.ID,
			secretUnboundId: MERCHANT_TEST_1.UNBOUND,
			hashKey: MERCHANT_TEST_1.HASHKEY,
		});

		/** PAYMENT CARD */
		await pg.card.charge(REQUEST_CARD_CHARGE);
		expect(pg.card).toBeDefined();
		expect(PGClient.prototype.post).toHaveBeenCalledTimes(1);

		// todo: add another payment here, just call one of the method to make sure the client can be called
	});
});
