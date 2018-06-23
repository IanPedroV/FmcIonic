import {Product} from "./product";

export interface Purchase {
  productId: number,
  userId: number,
  userNick: string,
  paymentMethod: string,
  product: Product,
  status: string;
  token: string,
  signature: string,
  purchaseTimeMillis: string,
  purchaseState: number,
  consumptionState: number,
  orderId: string,
  purchaseType: number
}
