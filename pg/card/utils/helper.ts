import { DEFAULT_IP } from "../../util/constant";
import {
  BodyAddressDetails,
  BodyCardDetails,
  BodyCustomerDetails,
  BodyItemDetails,
  BodyPaymentDetails,
  BodyTokenDetails,
  RequestAddressDetails,
  RequestCardDetails,
  RequestCharge,
  RequestCustomerDetails,
  RequestItemDetails,
  RequestTokenDetails,
} from "./type";

export const mapCardDetails = (
  request: RequestCardDetails | RequestTokenDetails,
): BodyCardDetails | BodyTokenDetails => {
  if ("token" in request) {
    const result: BodyTokenDetails = {
      token: request.token,
      card_cvn: request.cvv,
    };
    return result;
  }

  const result: BodyCardDetails = {
    card_holder_name: request.name,
    card_number: request.number,
    card_expired_month: request.expMonth,
    card_expired_year: request.expYear,
    card_cvn: request.cvv,
  };
  return result;
};

export const mapPaymentDetails = (
  request: RequestCharge,
): BodyPaymentDetails => {
  const result: BodyPaymentDetails = {
    amount: request.amount,
    is_customer_paying_fee: request.isCustomerPayingFee ?? false,
    transaction_description: request.description,
  };
  if (request.expired) {
    result.expired_time = request.expired;
  }
  return result;
};

export const mapCustomerDetails = (
  request: RequestCustomerDetails,
): BodyCustomerDetails => {
  const result: BodyCustomerDetails = {
    full_name: request.name,
    phone: request.phone,
    email: request.email,
    ip_address: request.ipAddress ?? DEFAULT_IP,
  };
  return result;
};

export const mapItemDetails = (
  request: RequestItemDetails[],
): BodyItemDetails[] => {
  const result = request.map((item): BodyItemDetails => {
    return {
      item_id: item.id,
      name: item.name,
      amount: item.amount,
      qty: item.qty,
      description: item.description ?? "",
    };
  });
  return result;
};

export const mapAddressDetails = (
  request: RequestAddressDetails,
): BodyAddressDetails => {
  const result: BodyAddressDetails = {
    full_name: request.name,
    phone: request.phone,
    address: request.address,
    city: request.city,
    postal_code: request.postalCode,
    country: request.country,
  };
  return result;
};
