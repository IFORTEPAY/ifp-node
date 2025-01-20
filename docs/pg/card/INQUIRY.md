## CARD INQUIRY

### Request Parameter

| Field             |    Type    | Required | Default | Details |
| ----------------- | :--------: | :------: | :-----: | ------- |
| **externalId**    | **string** |    ☑️    |         |         |
| **orderId**       | **string** |    ☑️    |         |         |
| **transactionID** | **string** |    ☑️    |         |         |

### Response Parameter

| Field                    |        Type         | Always defined | Details                                                         |
| ------------------------ | :-----------------: | :------------: | --------------------------------------------------------------- |
| **approvalCode**         |     **string**      |                |                                                                 |
| **merchantId**           |     **string**      |       ☑️       |                                                                 |
| **misVersion**           |     **string**      |       ☑️       |                                                                 |
| **transactionId**        |     **string**      |       ☑️       |                                                                 |
| **source**               |     **string**      |                |                                                                 |
| **externalId**           |     **string**      |       ☑️       |                                                                 |
| **orderId**              |     **string**      |       ☑️       |                                                                 |
| **receiptNo**            |     **string**      |       ☑️       |                                                                 |
| **responseCode**         |     **string**      |       ☑️       |                                                                 |
| **currency**             |     **string**      |       ☑️       |                                                                 |
| **paymentMethod**        |     **string**      |       ☑️       |                                                                 |
| **paymentChannel**       |     **string**      |       ☑️       |                                                                 |
| **transactionStatus**    |     **string**      |       ☑️       |                                                                 |
| **hostResponseCode**     |     **string**      |       ☑️       |                                                                 |
| **message**              |     **string**      |       ☑️       |                                                                 |
| **callbackUrl**          |     **string**      |       ☑️       |                                                                 |
| **returnUrl**            |     **string**      |       ☑️       |                                                                 |
| **installmentTenor**     |     **number**      |       ☑️       |                                                                 |
| **paymentMode**          |     **string**      |       ☑️       |                                                                 |
| **paymentDetails**       |     **object**      |       ☑️       |                                                                 |
| - amount                 |     **number**      |       ☑️       |                                                                 |
| - expiredTime            |     **number**      |       ☑️       | format in milisecond                                            |
| - feeAmount              |     **number**      |                |                                                                 |
| - isCustomerPayingFee    |     **boolean**     |       ☑️       | always false                                                    |
| - paidTime               |     **number**      |                | format in milisecond, value is defined when transaction is paid |
| - totalAmount            |     **number**      |       ☑️       |                                                                 |
| - totalPaidAmount        |     **number**      |                | value is defined when transaction is paid                       |
| - transactionDescription |     **string**      |       ☑️       |                                                                 |
| **itemDetails**          | **array of object** |                |                                                                 |
| - itemId                 |     **string**      |       ☑️       |                                                                 |
| - name                   |     **string**      |       ☑️       |                                                                 |
| - amount                 |     **number**      |       ☑️       |                                                                 |
| - qty                    |     **number**      |       ☑️       |                                                                 |
| - description            |     **string**      |       ☑️       |                                                                 |
| **customerDetails**      |     **object**      |       ☑️       |                                                                 |
| - fullName               |     **string**      |       ☑️       |                                                                 |
| - email                  |     **string**      |       ☑️       |                                                                 |
| - phone                  |     **string**      |       ☑️       |                                                                 |
| - ipAddress              |     **string**      |       ☑️       |                                                                 |
| **billingAddress**       |     **object**      |                |                                                                 |
| - fullName               |     **string**      |                |                                                                 |
| - phone                  |     **string**      |                |                                                                 |
| - address                |     **string**      |                |                                                                 |
| - city                   |     **string**      |                |                                                                 |
| - postalCode             |     **string**      |                |                                                                 |
| - country                |     **string**      |                |                                                                 |
| **billingAddress**       |     **object**      |                |                                                                 |
| - fullName               |     **string**      |                |                                                                 |
| - phone                  |     **string**      |                |                                                                 |
| - address                |     **string**      |                |                                                                 |
| - city                   |     **string**      |                |                                                                 |
| - postalCode             |     **string**      |                |                                                                 |
| - country                |     **string**      |                |                                                                 |
| **cardDetails**          |     **object**      |       ☑️       |                                                                 |
| - cardHolderName         |     **string**      |       ☑️       |                                                                 |
| - cardNumber             |     **string**      |       ☑️       |                                                                 |
| - cardExpiredMonth       |     **string**      |       ☑️       |                                                                 |
| - cardExpiredYear        |     **string**      |       ☑️       |                                                                 |
| - token                  |     **string**      |       ☑️       |                                                                 |
| - cardBrand              |     **string**      |       ☑️       |                                                                 |
| **paymentOptions**       |     **object**      |       ☑️       |                                                                 |
| - campaignCode           |     **string**      |                |                                                                 |
| - ruleCode               |     **string**      |                |                                                                 |
| - tenor                  |     **number**      |       ☑️       |                                                                 |
| - useRewards             |     **boolean**     |       ☑️       |                                                                 |
| - acquirerIssuerRelation |     **string**      |       ☑️       |                                                                 |

### Response Example

```typescript
// success example
{
  responseCode: "00",
  responseMessage: "Success",
  data: {
    approvalCode: "089283",
    merchantId: "MCP2025010100",
    misVersion: "v3",
    transactionId: "271821ce-a665-46b5-8780-9a83aad7d6bd",
    source: undefined,
    externalId: "externalId0000031",
    orderId: "orderId000000031",
    receiptNo: "3c6473ac1735528977",
    responseCode: "00",
    currency: "IDR",
    paymentMethod: "CARD",
    paymentChannel: "CIMBPG",
    transactionStatus: "PAID",
    hostResponseCode: "00",
    message: "The transaction has been paid.",
    callbackUrl: "https://google.com",
    returnUrl: "https://google.com",
    installmentTenor: 0,
    paymentMode: "CLOSE",
    paymentDetails: {
      amount: 15000,
      expiredTime: 1735530237222,
      feeAmount: 0,
      isCustomerPayingFee: false,
      paidTime: 1735530236100,
      totalAmount: 15000,
      totalPaidAmount: 15000,
      transactionDescription: "payment test sdk local"
    },
    customerDetails: {
      fullName: "john",
      email: "john@example.com",
      phone: "081234567890",
      ipAddress: "10.100.10.10"
    },
    cardDetails: {
      cardHolderName: "JOHN",
      cardNumber: "188980******1234",
      cardExpiredMonth: "01",
      cardExpiredYear: "2077",
      token: "9b1bb24e-8f98-4e7d-9a80-834e161bc083",
      cardBrand: "VISA"
    },
    paymentOptions: {
      campaignCode: "000",
      tenor: 0,
      useRewards: false,
      acquirerIssuerRelation: "off_us",
    }
  }
}

// failed example
{
  responseCode: "01",
  responseMessage: "transaction_id not found"
}

// error example
{
  responseCode: "98",
  responseMessage: "SystemError",
  error: "timeout of 1000ms exceeded"
}
```
