# Payment Gateway (PG)

## Usage

To start using this product, you need to initiate the PG class from imported iFortepay library, where you will be required to input **YOUR_MERCHANT_ID**, **YOUR_SECRET_UNBOUND_ID**, and **YOUR_HASH_KEY**.

Here is the example how to use it

```typescript
const {iFortepay} = require("ifp-node");

// extract iFortepay's features
const {PG} = iFortepay;

const {
	// list of payment methods...
	Card,
} = new PG({
	isProduction: false, // default: false
	merchantId: YOUR_MERCHANT_ID,
	secretUnboundId: YOUR_SECRET_UNBOUND_ID,
	hashKey: YOUR_HASH_KEY,
	timeout: 30000, // in milisecond, default: 10000
});

// example payment mehtod usage
Card.charge({
	// charge request body...
})
	.then((data) => {
		// your codes to hanldle returned data...
	})
	.catch((err) => {
		// your codes to handle returned error...
	});
```

### Request Parameter

| Field               |    Type     | Required | Default | details              |
| ------------------- | :---------: | :------: | :-----: | -------------------- |
| **isProduction**    | **boolean** |          |  false  |                      |
| **merchantId**      | **string**  |    ☑️    |         |                      |
| **secretUnboundId** | **string**  |    ☑️    |         |                      |
| **hashKey**         | **string**  |    ☑️    |         |                      |
| **timeout**         | **number**  |          |  10000  | format in milisecond |
| **subMerchantId**   | **string**  |          |         |                      |

## Payment Methods

Find the detail and example of each payment method API that supported by PG product by clicking the link below,

- [Card](./card/CARD.md)

[BACK TO README](../../README.md)
