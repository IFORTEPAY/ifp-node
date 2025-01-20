## CARD CHARGE DIRECT

### Request Parameter

| Field               |        Type         | Required | Default | details                               |
| ------------------- | :-----------------: | :------: | :-----: | ------------------------------------- |
| **externalId**      |     **string**      |    ☑️    |         | must be unique                        |
| **orderId**         |     **string**      |    ☑️    |         |                                       |
| **currency**        |     **string**      |          |   IDR   |                                       |
| **paymentMode**     |     **string**      |          |  CLOSE  |                                       |
| **paymentChannel**  |     **string**      |    ☑️    |         |                                       |
| **amount**          |     **number**      |    ☑️    |         |                                       |
| **transactionDescription**     |     **string**      |    ☑️    |         |                                       |
| **cardDetails**     |     **object**      |    ☑️    |         |                                       |
| - cardHolderName              |     **string**      |    ☑️    |         | required if card number exist         |
| - cardNumber            |     **string**      |    ☑️    |         |                                       |
| - cardExpiredMonth          |     **string**      |    ☑️    |         | required if card number exist         |
| - cardExpiredYear           |     **string**      |    ☑️    |         | required if card number exist         |
| - cardCvn               |     **string**      |    ☑️    |         |                                       |
| - token             |     **string**      |    ☑️    |         | required if card number doesn't exist |
| **itemDetails**     | **array of object** |          |         |                                       |
| - itemId                |     **string**      |    ☑️    |         |                                       |
| - name              |     **string**      |    ☑️    |         |                                       |
| - amount            |     **number**      |    ☑️    |         |                                       |
| - qty               |     **number**      |    ☑️    |         |                                       |
| - description       |     **string**      |          |         |                                       |
| **customerDetails** |     **object**      |    ☑️    |         |                                       |
| - fullName              |     **string**      |    ☑️    |         |                                       |
| - phone             |     **string**      |    ☑️    |         |                                       |
| - email             |     **string**      |    ☑️    |         |                                       |
| - ipAddress         |     **string**      |    ☑️    |         |                                       |
| **billingAddress**  |     **object**      |          |         |                                       |
| - fullName              |     **string**      |          |         |                                       |
| - phone             |     **string**      |          |         |                                       |
| - address           |     **string**      |    ☑️    |         |                                       |
| - city              |     **string**      |    ☑️    |         |                                       |
| - postalCode        |     **string**      |    ☑️    |         |                                       |
| - country           |     **string**      |    ☑️    |         |                                       |
| **shippingAddress** |     **object**      |          |         |                                       |
| - fullName              |     **string**      |          |         |                                       |
| - phone             |     **string**      |          |         |                                       |
| - address           |     **string**      |    ☑️    |         |                                       |
| - city              |     **string**      |    ☑️    |         |                                       |
| - postalCode        |     **string**      |    ☑️    |         |                                       |
| - country           |     **string**      |    ☑️    |         |                                       |
| **paymentOptions**  |     **object**      |          |         |                                       |
| - useRewards        |     **boolean**     |          |         |                                       |
| - campaignCode      |     **string**      |          |         |                                       |
| - tenor             |     **number**      |          |         |                                       |
| - ruleCode          |     **string**      |          |         |                                       |
| **callbackUrl**     |     **string**      |    ☑️    |         |                                       |
| **returnUrl**       |     **string**      |    ☑️    |         |                                       |
| **additionalData**  |     **string**      |          |         |                                       |
| **storeToken**      |     **boolean**     |          |  true   |                                       |

### Response Parameter

| Field                     |    Type    | always defined | details                                   |
| ------------------------- | :--------: | :------------: | ----------------------------------------- |
| **responseCode**          | **string** |       ☑️       | [Response code detail](../RESPONSE.md)    |
| **responseMessage**       | **string** |       ☑️       | [Response message detail](../RESPONSE.md) |
| **data**                  | **object** |                |                                           |
| - token                   | **string** |                |                                           |
| - status                  | **string** |                |                                           |
| - transaction_code        | **string** |                |                                           |
| - transaction_description | **string** |                |                                           |
| - transaction_description | **string** |                |                                           |
| - **transaction_data**    | **string** |                |                                           |
| -- external_id            | **string** |                |                                           |
| -- receipt_no             | **string** |                |                                           |
| -- order_id               | **string** |                |                                           |
| -- transaction_id         | **string** |                |                                           |
| -- approval_code          | **string** |                |                                           |
| **error**                 | **string** |                | return the error message if exist         |

### Response Example

```typescript
// success example
{
  responseCode: "00",
  responseMessage: "Success",
  data: {
    token: "b0e3db06-1bde-49f8-bba6-471bc7cd9d18",
    status: "SUCCESS",
    transactionCode: "00",
    transactionDescription: "Approved:The transaction was successful.",
    transactionData: {
      externalId: "1hsVKmfcXI",
      receiptNo: "412710059461",
      orderId: "OFwlvpfsMC",
      transactionId: "4eab1441-8308-4fa0-91b8-969973e0b0fd",
      approvalCode: "059461"
    }
  }
}

// failed example
{
  responseCode: "00",
  responseMessage: "Success",
  data: {
    token: "9b1bb24e-8f98-4e7d-9a80-834e161bc083",
    status: "FAILED",
    transactionCode: "1026",
    transactionDescription: "Invalid Card Type. The card number does not match with the, card type.",
    transactionData: {
      externalId: "externalId0000031",
      receiptNo: "3c6473ac1735528977",
      orderId: "orderId000000031",
      transactionId: "3c6473ac-2806-4386-86ea-4012da139cbd"
    }
  }
}

// error example
{
  responseCode: "98",
  responseMessage: "SystemError",
  error: "timeout of 1000ms exceeded"
}
```

[BACK TO CARD](CARD.md)
