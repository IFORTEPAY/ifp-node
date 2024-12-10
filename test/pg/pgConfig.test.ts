import {PGConfig} from "../../pg/config/pgConfig";
import {DEFAULT_CLIENT_TIMEOUT} from "../../pg/util/constant";
import {MERCHANT_TEST_1} from "./contant";

describe("PGConfig Test", () => {
	it("Should use the input value", () => {
		const config = new PGConfig({
			isProduction: true,
			isDebugLog: true,
			merchantId: MERCHANT_TEST_1.ID,
			secretUnboundId: MERCHANT_TEST_1.UNBOUND,
			hashKey: MERCHANT_TEST_1.HASHKEY,
			timeout: 30000,
		});

		expect(config.isProduction).toBeTruthy();
		expect(config.isDebugLog).toBeTruthy();
		expect(config.merchantId).toBe(MERCHANT_TEST_1.ID);
		expect(config.secretUnboundId).toBe(MERCHANT_TEST_1.UNBOUND);
		expect(config.hashKey).toBe(MERCHANT_TEST_1.HASHKEY);
		expect(config.timeout).toEqual(30000);
	});

	it("Should use default value", () => {
		const config = new PGConfig({
			merchantId: MERCHANT_TEST_1.ID,
			secretUnboundId: MERCHANT_TEST_1.UNBOUND,
			hashKey: MERCHANT_TEST_1.HASHKEY,
		});

		expect(config.isProduction).toBeFalsy();
		expect(config.isDebugLog).toBeFalsy();
		expect(config.timeout).toEqual(DEFAULT_CLIENT_TIMEOUT);
	});
});
