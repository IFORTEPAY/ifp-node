import {PGResponseConstructor} from "../../utils/response";
import {PGClientResponse} from "../../utils/type";
import {
	ResponseAddressDetails,
	ResponseCardDetails,
	ResponseCustomerDetails,
	ResponseDataCharge,
	ResponseDataChargeDirect,
	ResponseDataChargeDirectJSON,
	ResponseDataInquiry,
	ResponseDataInquiryJSON,
	ResponseItemDetails,
	ResponsePaymentDetails,
	ResponsePaymentOptions,
	TransactionDataChargeDirect,
} from "../models";

export class CardResponse<T, U> extends PGResponseConstructor<T, U> {
	constructor(resClient: PGClientResponse<T>) {
		super(resClient);
	}

	getCharge() {
		if (!this.responseClient.data) {
			return this;
		}

		const data = {} as ResponseDataCharge;

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataCharge;
		if (clientData?.html) {
			data.html = clientData.html;
		}

		if (clientData?.link) {
			data.link = clientData.link;
		}

		const dataParsed = data as unknown;
		this.response.data = dataParsed as U;
		return this;
	}

	getChargeDirect() {
		if (!this.responseClient.data) {
			return this;
		}

		const data = {} as ResponseDataChargeDirect;

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataChargeDirectJSON;
		if (clientData?.token) {
			data.token = clientData.token;
		}

		if (clientData?.status) {
			data.status = clientData.status;
		}

		if (clientData?.transaction_code) {
			data.transactionCode = clientData.transaction_code;
		}

		if (clientData?.transaction_description) {
			data.transactionDescription = clientData.transaction_description;
		}

		const transactionData = {} as TransactionDataChargeDirect;

		if (clientData?.transaction_data?.external_id) {
			transactionData.externalId = clientData.transaction_data.external_id;
		}

		if (clientData?.transaction_data?.receipt_no) {
			transactionData.receiptNo = clientData.transaction_data.receipt_no;
		}

		if (clientData?.transaction_data?.order_id) {
			transactionData.orderId = clientData.transaction_data.order_id;
		}

		if (clientData?.transaction_data?.transaction_id) {
			transactionData.transactionId =
				clientData.transaction_data.transaction_id;
		}

		if (clientData?.transaction_data?.approval_code) {
			transactionData.approvalCode = clientData.transaction_data.approval_code;
		}

		if (transactionData) {
			data.transactionData = transactionData;
		}

		const dataParsed = data as unknown;
		this.response.data = dataParsed as U;
		return this;
	}

	getInquiry() {
		if (!this.responseClient.data) {
			return this;
		}

		const clientDataParsed = this.responseClient.data as unknown;
		const clientData = clientDataParsed as ResponseDataInquiryJSON;

		const data = {
			approvalCode: clientData?.approval_code,
			merchantId: clientData?.merchant_id,
			misVersion: clientData?.mis_version,
			transactionId: clientData?.transaction_id,
			source: clientData?.source,
			externalId: clientData?.external_id,
			orderId: clientData?.order_id,
			receiptNo: clientData?.receipt_no,
			responseCode: clientData?.response_code,
			currency: clientData?.currency,
			paymentMethod: clientData?.payment_method,
			paymentChannel: clientData?.payment_channel,
			transactionStatus: clientData?.transaction_status,
			hostResponseCode: clientData?.host_response_code,
			message: clientData?.message,
			callbackUrl: clientData?.callback_url,
			returnUrl: clientData?.return_url,
			installmentTenor: clientData?.installment_tenor,
			paymentMode: clientData?.payment_mode,
		} as ResponseDataInquiry;

		if (clientData?.payment_details) {
			const paymentDetails = {} as ResponsePaymentDetails;
			paymentDetails.amount = clientData.payment_details?.amount;
			paymentDetails.expiredTime = clientData.payment_details?.expired_time;
			paymentDetails.feeAmount = clientData.payment_details?.fee_amount;
			paymentDetails.isCustomerPayingFee =
				clientData.payment_details?.is_customer_paying_fee;
			paymentDetails.paidTime = clientData.payment_details?.paid_time;
			paymentDetails.totalAmount = clientData.payment_details?.total_amount;
			paymentDetails.totalPaidAmount =
				clientData.payment_details?.total_paid_amount;
			paymentDetails.transactionDescription =
				clientData.payment_details?.transaction_description;
			data.paymentDetails = paymentDetails;
		}

		if (clientData?.item_details?.length > 0) {
			const itemDetails = [] as ResponseItemDetails[];
			clientData.item_details.forEach((item) => {
				const result: ResponseItemDetails = {
					itemId: item?.item_id,
					name: item?.name,
					amount: item?.amount,
					qty: item?.qty,
					description: item?.description,
				};
				itemDetails.push(result);
			});
			data.itemDetails = itemDetails;
		}

		if (clientData?.customer_details) {
			const customerDetails = {} as ResponseCustomerDetails;
			customerDetails.fullName = clientData.customer_details?.full_name;
			customerDetails.email = clientData.customer_details?.email;
			customerDetails.phone = clientData.customer_details?.phone;
			customerDetails.ipAddress = clientData.customer_details?.ip_address;
			data.customerDetails = customerDetails;
		}

		if (clientData?.billing_address) {
			const billingAddress = {} as ResponseAddressDetails;
			billingAddress.fullName = clientData.billing_address?.full_name;
			billingAddress.address = clientData.billing_address?.address;
			billingAddress.country = clientData.billing_address?.country;
			billingAddress.city = clientData.billing_address?.city;
			billingAddress.phone = clientData.billing_address?.phone;
			billingAddress.postalCode = clientData.billing_address?.postal_code;
			data.billingAddress = billingAddress;
		}

		if (clientData?.shipping_address) {
			const shippingAddress = {} as ResponseAddressDetails;
			shippingAddress.fullName = clientData.billing_address?.full_name;
			shippingAddress.address = clientData.billing_address?.address;
			shippingAddress.country = clientData.billing_address?.country;
			shippingAddress.city = clientData.billing_address?.city;
			shippingAddress.phone = clientData.billing_address?.phone;
			shippingAddress.postalCode = clientData.billing_address?.postal_code;
			data.shippingAddress = shippingAddress;
		}

		if (clientData?.card_details) {
			const cardDetails = {} as ResponseCardDetails;
			cardDetails.cardHolderName = clientData.card_details?.card_holder_name;
			cardDetails.cardNumber = clientData.card_details?.card_number;
			cardDetails.cardExpiredMonth =
				clientData.card_details?.card_expired_month;
			cardDetails.cardExpiredYear = clientData.card_details?.card_expired_year;
			cardDetails.token = clientData.card_details?.token;
			cardDetails.cardBrand = clientData.card_details?.card_brand;
			data.cardDetails = cardDetails;
		}

		if (clientData?.payment_options) {
			const paymentOptions = {} as ResponsePaymentOptions;
			paymentOptions.campaignCode = clientData.payment_options?.campaign_code;
			paymentOptions.ruleCode = clientData.payment_options?.rule_code;
			paymentOptions.tenor = clientData.payment_options?.tenor;
			paymentOptions.useRewards = clientData.payment_options?.use_rewards;
			paymentOptions.acquirerIssuerRelation =
				clientData.payment_options?.acquirer_issuer_relation;
			data.paymentOptions = paymentOptions;
		}

		const dataParsed = data as unknown;
		this.response.data = dataParsed as U;
		return this;
	}
}

export function cardResponseConstructor<T, U>(
	res: PGClientResponse<T>
): CardResponse<T, U> {
	return new CardResponse<T, U>(res);
}
