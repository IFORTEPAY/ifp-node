## CARD CHARGE

### Request Parameter

| Field               |        Type         | Required | Default | details                               |
| ------------------- | :-----------------: | :------: | :-----: | ------------------------------------- |
| **externalId**      |     **string**      |    ☑️    |         | must be unique                        |
| **orderId**         |     **string**      |    ☑️    |         |                                       |
| **currency**        |     **string**      |          |   IDR   |                                       |
| **paymentMode**     |     **string**      |          |  CLOSE  |                                       |
| **paymentChannel**  |     **string**      |    ☑️    |         |                                       |
| **amount**          |     **number**      |    ☑️    |         |                                       |
| **description**     |     **string**      |    ☑️    |         |                                       |
| **cardDetails**     |     **object**      |    ☑️    |         |                                       |
| - name              |     **string**      |    ☑️    |         | required if card number exist         |
| - number            |     **string**      |    ☑️    |         |                                       |
| - expMonth          |     **string**      |    ☑️    |         | required if card number exist         |
| - expYear           |     **string**      |    ☑️    |         | required if card number exist         |
| - cvv               |     **string**      |    ☑️    |         |                                       |
| - token             |     **string**      |    ☑️    |         | required if card number doesn't exist |
| **itemDetails**     | **array of object** |          |         |                                       |
| - id                |     **string**      |    ☑️    |         |                                       |
| - name              |     **string**      |    ☑️    |         |                                       |
| - amount            |     **number**      |    ☑️    |         |                                       |
| - qty               |     **number**      |    ☑️    |         |                                       |
| - description       |     **string**      |          |         |                                       |
| **customerDetails** |     **object**      |    ☑️    |         |                                       |
| - name              |     **string**      |    ☑️    |         |                                       |
| - phone             |     **string**      |    ☑️    |         |                                       |
| - email             |     **string**      |    ☑️    |         |                                       |
| - ipAddress         |     **string**      |    ☑️    |         |                                       |
| **billingAddress**  |     **object**      |          |         |                                       |
| - name              |     **string**      |          |         |                                       |
| - phone             |     **string**      |          |         |                                       |
| - address           |     **string**      |    ☑️    |         |                                       |
| - city              |     **string**      |    ☑️    |         |                                       |
| - postalCode        |     **string**      |    ☑️    |         |                                       |
| - country           |     **string**      |    ☑️    |         |                                       |
| **shippingAddress** |     **object**      |          |         |                                       |
| - name              |     **string**      |          |         |                                       |
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
| **responseType**    | **enum(html, url)** |          |  html   |                                       |
| **additionalData**  |     **string**      |          |         |                                       |
| **storeToken**      |     **boolean**     |          |  true   |                                       |

### Request Parameter

| Field               |    Type    | always defined | details                                                                  |
| ------------------- | :--------: | :------------: | ------------------------------------------------------------------------ |
| **responseCode**    | **string** |       ☑️       | [Response code detail](../RESPONSE.md)                                   |
| **responseMessage** | **string** |       ☑️       | [Response message detail](../RESPONSE.md)                                |
| **data**            | **object** |                |                                                                          |
| - html              | **string** |                | return this value if **responseType** on request is **undefined / html** |
| - link              | **string** |                | return this value if **responseType** on request is **url**              |
| **error**           | **string** |                | return the error message if exist                                        |

[BACK TO CARD](CARD.md)
