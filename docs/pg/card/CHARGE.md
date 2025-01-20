## CARD CHARGE

### Request Parameter

| Field                      |        Type         | Required | Default | details                               |
| -------------------------- | :-----------------: | :------: | :-----: | ------------------------------------- |
| **externalId**             |     **string**      |    ☑️    |         | must be unique                        |
| **orderId**                |     **string**      |    ☑️    |         |                                       |
| **currency**               |     **string**      |          |   IDR   |                                       |
| **paymentMode**            |     **string**      |          |  CLOSE  |                                       |
| **paymentChannel**         |     **string**      |    ☑️    |         |                                       |
| **amount**                 |     **number**      |    ☑️    |         |                                       |
| **transactionDescription** |     **string**      |    ☑️    |         |                                       |
| **cardDetails**            |     **object**      |    ☑️    |         |                                       |
| - cardHolderName           |     **string**      |    ☑️    |         | required if card number exist         |
| - cardNumber               |     **string**      |    ☑️    |         |                                       |
| - cardExpiredMonth         |     **string**      |    ☑️    |         | required if card number exist         |
| - cardExpiredYear          |     **string**      |    ☑️    |         | required if card number exist         |
| - cardCvn                  |     **string**      |    ☑️    |         |                                       |
| - token                    |     **string**      |    ☑️    |         | required if card number doesn't exist |
| **itemDetails**            | **array of object** |          |         |                                       |
| - itemId                   |     **string**      |    ☑️    |         |                                       |
| - name                     |     **string**      |    ☑️    |         |                                       |
| - amount                   |     **number**      |    ☑️    |         |                                       |
| - qty                      |     **number**      |    ☑️    |         |                                       |
| - description              |     **string**      |          |         |                                       |
| **customerDetails**        |     **object**      |    ☑️    |         |                                       |
| - fullName                 |     **string**      |    ☑️    |         |                                       |
| - phone                    |     **string**      |    ☑️    |         |                                       |
| - email                    |     **string**      |    ☑️    |         |                                       |
| - ipAddress                |     **string**      |    ☑️    |         |                                       |
| **billingAddress**         |     **object**      |          |         |                                       |
| - fullName                 |     **string**      |          |         |                                       |
| - phone                    |     **string**      |          |         |                                       |
| - address                  |     **string**      |    ☑️    |         |                                       |
| - city                     |     **string**      |    ☑️    |         |                                       |
| - postalCode               |     **string**      |    ☑️    |         |                                       |
| - country                  |     **string**      |    ☑️    |         |                                       |
| **shippingAddress**        |     **object**      |          |         |                                       |
| - fullName                 |     **string**      |          |         |                                       |
| - phone                    |     **string**      |          |         |                                       |
| - address                  |     **string**      |    ☑️    |         |                                       |
| - city                     |     **string**      |    ☑️    |         |                                       |
| - postalCode               |     **string**      |    ☑️    |         |                                       |
| - country                  |     **string**      |    ☑️    |         |                                       |
| **paymentOptions**         |     **object**      |          |         |                                       |
| - useRewards               |     **boolean**     |          |         |                                       |
| - campaignCode             |     **string**      |          |         |                                       |
| - tenor                    |     **number**      |          |         |                                       |
| - ruleCode                 |     **string**      |          |         |                                       |
| **callbackUrl**            |     **string**      |    ☑️    |         |                                       |
| **returnUrl**              |     **string**      |    ☑️    |         |                                       |
| **responseType**           | **enum(html, url)** |          |  html   |                                       |
| **additionalData**         |     **string**      |          |         |                                       |
| **storeToken**             |     **boolean**     |          |  true   |                                       |

### Response Parameter

| Field               |    Type    | always defined | details                                                                  |
| ------------------- | :--------: | :------------: | ------------------------------------------------------------------------ |
| **responseCode**    | **string** |       ☑️       | [Response code detail](../RESPONSE.md)                                   |
| **responseMessage** | **string** |       ☑️       | [Response message detail](../RESPONSE.md)                                |
| **data**            | **object** |                |                                                                          |
| - html              | **string** |                | return this value if **responseType** on request is **undefined / html** |
| - link              | **string** |                | return this value if **responseType** on request is **url**              |
| **error**           | **string** |                | return the error message if exist                                        |

### Response Example

```typescript
// success example - html response
{
  responseCode: "00",
  responseMessage: "Success",
  data: {
    html: "<html lang=en> <head> <script language=javascript> function onLoadSubmit(){document.bcapg_form.submit();}</script> </head> <body onload=onLoadSubmit()> <form id=bcapg_form name=bcapg_form method=post action=https://gdl.umundus.net/PGW/PaymentAPI/apidirectpay.aspx> <textarea name=message style=display:none;>MIAGCSqGSIb3DQEHA6CAMIACAQAxggFAMIIBPAIBADAkMBYxFDASBgNVBAMTC1NpbmFwdElRIENBAgoY8UvtAAAAAACOMA0GCSqGSIb3DQEBAQUABIIBAHluV0TXuPwDxCJWza38YlXNepP4TfGV7p1A6+MNL9NXJ9kp962YNqcwSSSP2wgS5F3hgrMm6GBDH/WqhBUFKQtI0ve3X0gHPXVjy3SyzM+dY9i78WHvRwN6n26x0C0I/t89iABVAiTc1Wv3IqSiK9+mYbSNWDbUiOviRm8mdTWM5LKZefTIt2G5G+xTInX3fOVa1V/Ok7TUltX6NeNYZlacmnMLd9FAaCoxwveoe5rFsYDKLbxF1EjKB+RKjYr0Y3E6Z0pFjda+fzR05YC18qpO6/CydZwE+Si2tOes3fK/pn0Cjc2wFMq/+68lnOr0ADthnV1gvWmuOU+dd3pgY3gwgAYJKoZIhvcNAQcBMB0GCWCGSAFlAwQBAgQQJevxrpJl3E9Ya+7RnpX3GaCABIIDYCLuWX6DyoiE+MkyCpAGC/s9vGDXPATOuPEQoSgTn7ylwvUa4Y/cRkK/SgocQ0nFT8/szFc6S/1GA/bCCAEHKflZa9j+UZGE1dgc/4z0oQhqiTTQlfY1jwPwmIXy86C9zoyS2wRA2q808BI+javtCObt+jPjTfhWW+wFbfVinIg+a9H/ZdKZx7RNww2jvgQDpGxK6meseJJuq8QVkT31kQpbCOjys8JmZFS90ho5Ket0z9i55qZ8kW4gf8kcqJO0Qjt/oQKY99xhOcidPOg32RK3OdaO4hEM1fKN30s7Sk3E90AcpJSDYAVpD7y6UMddsptDU+4hdH3NJ5fWlW7gaxX7VdOP+wmnAE+RwKmCHimzsuvtQ4HPhzIg8BMegR5ubrLeYxaQMvbB2WtCbEV5GMwCndV1uywjsZVkVa+4+Hg9CipESPbuItiHQkpHe3hSLkD0GUCoLMwxirXbVPAdZZj1nZ6J0/6O2gVz3Zk1OxBCb8XNLzN8wNCXNmpkAldYAk7SX1ar1ZMZx+rx6lKYlhrweeS/YTpnMVW/HGyUYP8tIwxjpDNkOL3xMiXFRpNStDvIIKwaJ6A9cgpkYrA3JCg4ID8MHQRUzfElNPp9OY8964lKN1pcDyi6JyW4QARW10/pjFroxhtKZTt5E2x0Wq/t5zECQcA0ObZ07DBAviSS6YXX9aY1GFi7sfuXPdc7THnaj6gfNmi4vjSWx5bYzZQ4Q9+fLtUDQC9OTSw29zD+n3DmCBVYJiznF5gzAbG3io/fk5cRwhkEgH30C6BV1UvSxj6rBigxdLmclKyhzat4rN1qEp9cqg5MBcQ1enHGIgUOuiH2642S4YDY/qfcGoXuum6VeByuxClk5anxDREkuaSHBofKpS+bTOVO/fs9MmAKkjSJaqT5za6B7C7OlM9UaOYYnZPJ9PPvRxV4LJaam3Tibb0faq2hlA60mPXXCiqO9oXP+3SvvlKdw9T9N1W7bhjgwRPHpPybk9QdA6CxjVtn539Y7bGSFy6FO/n/7fNYNfKGljGio9hloYaUHN2XPcm4edSuatdBTNRsoy4cPl0xrVKOwyapooReMmV3o2h4EpAHJcxjIOy3LbQ5a48L6i1mjGPr0qFR7CsqKT04hO1/zyuGaetYfYzftnIDqQAAAAAAAAAAAAA=</textarea> <button type=submit style=display:none; >Submit</button> </form> </html>"
  }
}

// success example - link response
{
  responseCode: "00",
  responseMessage: "Success",
  data: {
    link: "https://bcapg-stg.mcpayment.id/payment/process/?refno=e169d9971714991005"
  }
}

// failed example
{
  responseCode: "01",
  responseMessage: "Payment authentication failed from host"
}

// error example
{
  responseCode: "98",
  responseMessage: "SystemError",
  error: "timeout of 1000ms exceeded"
}
```

[BACK TO CARD](CARD.md)
