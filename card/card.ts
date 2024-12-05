import { ApiClient } from "../api/apiClient";
import {
  CONTENT_TYPE_JSON,
  CURRENCY,
  MIS_VERSION_3,
  PAYMENT_METHOD,
} from "../util/constant";
import { generateAuth, generateSignature } from "../util/helper";
import { ApiResponse } from "../util/type";
import {
  mapAddressDetails,
  mapCardDetails,
  mapCustomerDetails,
  mapItemDetails,
  mapPaymentDetails,
} from "./utils/helper";
import { BodyCharge, RequestCharge, ResponseDataCharge } from "./utils/type";

export class Card {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  private getRequestHeaders(externalId: string, orderId: string) {
    const apiConfig = this.apiClient.apiConfig;

    const auth = generateAuth(apiConfig.merchantId, apiConfig.secretUnboundId);
    const signature = generateSignature(externalId, orderId, apiConfig.hashKey);
    const header = {
      "Content-Type": CONTENT_TYPE_JSON,
      Authorization: auth,
      "x-req-signature": signature,
      "x-version": MIS_VERSION_3,
    };

    this.apiClient.setOptionHeaders(header);
  }

  charge(request: RequestCharge): Promise<ApiResponse<ResponseDataCharge>> {
    this.apiClient.setOptionPath("/card-v2/v1/charge");

    const cardDetails = mapCardDetails(request.cardDetails);
    const paymentDetails = mapPaymentDetails(request);
    const customerDetails = mapCustomerDetails(request.customerDetails);

    const body: BodyCharge = {
      external_id: request.externalId,
      order_id: request.orderId,
      currency: request.currency ?? CURRENCY.IDR,
      payment_method: PAYMENT_METHOD.CARD,
      payment_channel: request.paymentChannel,
      payment_mode: request.paymentMode,
      callback_url: request.callbackUrl,
      return_url: request.returnUrl,
      card_details: cardDetails,
      payment_details: paymentDetails,
      customer_details: customerDetails,
    };

    if (request.itemDetails && request.itemDetails.length > 0) {
      const requestItem = mapItemDetails(request.itemDetails);
      body.item_details = requestItem;
    }

    if (request.billingAddress) {
      const billingAddress = mapAddressDetails(request.billingAddress);
      body.billing_address = billingAddress;
    }

    if (request.shippingAddress) {
      const shippingAddress = mapAddressDetails(request.shippingAddress);
      body.shipping_address = shippingAddress;
    }

    this.apiClient.setOptionBody(body);
    this.getRequestHeaders(request.externalId, request.orderId);

    return new Promise((resolve, reject) => {
      this.apiClient
        .post<ResponseDataCharge>()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // todo: add other method here
}
