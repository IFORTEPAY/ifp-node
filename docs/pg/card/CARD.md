# Card

Here is the list and details of all API features that supported in payment method Card.

## Charge

Feature for API non Direct Payment. Non Direct Payment is a 3D Secured transaction using OTP verification.

### Request and Response

Go to this [page](CHARGE.md) to read the full detail about request and response for Charge feature.

### Usage Example

```typescript
// import package
const iFortepay = require("ifp-node");
const {PG} = iFortepay;

// initiate PG
const {
	// list of payment methods...
	Card,
} = new PG({
	merchantId: YOUR_MERCHANT_ID,
	secretUnboundId: YOUR_SECRET_UNBOUND_ID,
	hashKey: YOUR_HASH_KEY,
});

// use Card Charge method
card
	.charge({
		externalId: "uniqueExternalId000001",
		orderId: "orderId000000001",
		paymentMode: "CLOSE",
		paymentChannel: "BCAPG",
		amount: 15000,
		cardDetails: {
			name: "JOHN",
			number: "1889800000001234",
			expMonth: "01",
			expYear: "2077",
			cvv: "100",
		},
		customerDetails: {
			name: "john",
			phone: "081234567890",
			email: "john@example.com",
			ipAddress: "10.100.10.10",
		},
		callbackUrl: "https://google.com",
		returnUrl: "https://google.com",
		description: "payment test sdk local",
		responseType: "html", // optional, default: html
	})
	.then((response) => {
		// your codes to hanldle returned data...
		// in this example response.data will return html value
	})
	.catch((err) => {
		// your codes to hanldle returned data...
	});
```

[BACK TO PG](../PG.md)
