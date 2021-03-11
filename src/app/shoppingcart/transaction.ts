export class Transaction {
  id: string;
  orderId: string;
  state: string;
  traceabilityCode: string;
  authorizationCode: string;
  responseCode: string;
  responseMessage: string;
  paymentNetworkResponseCode: number;
  paymentNetworkResponseErrorMessage: string;
}
