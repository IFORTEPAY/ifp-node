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
			cardHolderName: "JOHN",
			cardNumber: "1889800000001234",
			cardExpiredMonth: "01",
			cardExpiredYear: "2077",
			cardCvn: "100",
		},
		customerDetails: {
			fullName: "john",
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

## Charge Direct

Feature for API Direct Payment. Direct Payment is a Non 3D Secured transaction without using OTP verification.

### Request and Response

Go to this [page](CHARGE.DIRECT.md) to read the full detail about request and response for Charge Direct feature.

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

// use Card Charge Direct method
card
	.chargeDirect({
		externalId: "uniqueExternalId000001",
		orderId: "orderId000000001",
		paymentMode: "CLOSE",
		paymentChannel: "BCAPG",
		amount: 15000,
		cardDetails: {
			cardHolderName: "JOHN",
			cardNumber: "1889800000001234",
			cardExpiredMonth: "01",
			cardExpiredYear: "2077",
			cardCvn: "100",
		},
		customerDetails: {
			fullName: "john",
			phone: "081234567890",
			email: "john@example.com",
			ipAddress: "10.100.10.10",
		},
		callbackUrl: "https://google.com",
		returnUrl: "https://google.com",
		description: "payment test sdk local",
	})
	.then((response) => {
		// your codes to hanldle returned data...
		// in this example response.data will return html value
	})
	.catch((err) => {
		// your codes to hanldle returned data...
	});
```

## Charge Direct V2

Feature for API Direct Payment V2. Direct Payment V2 is a Non 3D Secured transaction without using OTP verification. Card CVV/CVN on Direct Payment V2 is not required, it could be a string or undefined.

### Request and Response

Go to this [page](CHARGE.DIRECT.V2.md) to read the full detail about request and response for Charge Direct V2 feature.

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

// use Card Charge Direct method
card
	.chargeDirectV2({
		externalId: "uniqueExternalId000001",
		orderId: "orderId000000001",
		paymentMode: "CLOSE",
		paymentChannel: "BCAPG",
		amount: 15000,
		cardDetails: {
			cardHolderName: "JOHN",
			cardNumber: "1889800000001234",
			cardExpiredMonth: "01",
			cardExpiredYear: "2077",
		},
		customerDetails: {
			fullName: "john",
			phone: "081234567890",
			email: "john@example.com",
			ipAddress: "10.100.10.10",
		},
		callbackUrl: "https://google.com",
		returnUrl: "https://google.com",
		description: "payment test sdk local",
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
